
App.InstancesController = Ember.ArrayController.extend({
  needs: ['instancesNew'],
  itemController: 'instance',
  errors: "",
  polls: {},

  maxInstances: function (){
    return App.Auth.get("user.maxInstances");
  }.property("App.Auth.user.maxInstances"),

  userHasLoaded: function () {
    return App.Auth.get("user").isLoaded;
  }.property("App.Auth.user.isLoaded"),

  activeInstances: function () {
    return App.Auth.get("user.activeInstances");
  }.property("App.Auth.user.activeInstances"),

  actions: {
    removeInstance: function (instance) {
      this.get("content").removeObject(instance);
      this.decrementProperty('activeInstances');
    },
    pollRestart: function () {
      //Start poll for any instances in provisioning state
      var _this = this;
      this.content.forEach(function (obj) {
        if(obj.get("state") === "provisioning") {
          _this.send("startPoll", obj);
        }
      });
    },
    startPoll: function (instance) {
      var _this = this;
      var id = instance.get("id");

      //Don't poll if we are already polling for this id
      if(!this.polls[id]) {
        this.polls[id] = setInterval(function () {
          Ember.run.next(function () {
            instance.get("state") === 'provisioning' ? instance.reload() : _this.send("stopPoll", _this.polls[id]);
          });
        }, 5000);
      }
    },
    stopPoll: function (id) {
      clearInterval(id);
    }
  }

});

App.InstanceController = Ember.ObjectController.extend({
  isRunning: function () {
    return this.get("state") === "running";
  }.property("state"),
  isEditing: false,
  showDetails: false,
  typeDisplayName: function () {
    return this.get("serviceSlug") === "all" ? "redis + postgres" : this.get("serviceSlug");
  }.property("serviceSlug"),
  isAllType: Ember.computed.equal('serviceSlug', 'all'),
  actions: {
    editInstance: function () {
      this.set('isEditing', true);
    },
    acceptChanges: function () {
      this.set('isEditing', false);
      this.get('model').save();
    },
    destroyRecord: function (model) {
      var query = 'Are you sure you want to delete this ' + model.get( 'serviceSlug' ) + ' instance?';
      var _this = this;
      if( confirm( query ) ){
        model.deleteRecord().then(
          function () {
            _this.get("parentController").send("removeInstance", _this.get("model"));
          },
          function (error) {
            _this.get("parentController").send("set", "errors", $.parseJSON(error.responseText).error);
        });

      }
    },
    toggleDetails: function () {
      this.toggleProperty("showDetails");
    }
  }
});

App.InstancesNewController = Ember.ObjectController.extend({
  needs: ["instances"],
  providerNotSelected: Ember.computed.not("provider"),
  selectedCloudHost: null,
  selectedDataCenter: null,
  selectedAvailabilityZone: null,

  dataCenters: function () {
    if(!this.get("selectedCloudHost")){
      this.set("selectedCloudHost", this.get("controllers.instances.cloudHosts.firstObject"));
    }

    //anyBy is deprecated..need to update to isAny when ember is updated
    //only return dataCenters that have at least one available "AvailabilityZone"
    return this.get("selectedCloudHost.dataCenters").filter(function (dataCenter) {
      return dataCenter.get("availabilityZones").anyBy('available');
    });
  }.property("controllers.instances.cloudHosts.firstObject", "selectedCloudHost.dataCenters"),

  availabilityZones: function () {
    if(!this.get("selectedAvailabilityZone")) {
      this.set("selectedAvailabilityZone", this.get("selectedDataCenter.availabilityZones").filterBy('available')[0]);
    }
    return this.get("selectedDataCenter.availabilityZones").filterBy('available');
  }.property("selectedDataCenter.availabilityZones"),

  actions: {
    createInstance: function () {
      var instance = this.get("model");
      var instancesController = this.get("controllers.instances");

      instance.set("serviceSlug", this.get("provider.name"));
      instance.set("availabilityZone", this.get("selectedAvailabilityZone"));

      instance.save().then(
        function () {
          instancesController.get("content").addObject(instance);
          instancesController.send("startPoll", instance);
          instancesController.incrementProperty('activeInstances');
        },
        function (error) {
          instancesController.set("errors", $.parseJSON(error.responseText).error);
        }
      );
    },

    getProviders: function () {
      this.set('providers', App.Provider.find());
    },

    getCloudHosts: function () {
      this.set('cloudHosts', App.CloudHost.find());
    },

    providerClicked: function (provider) {
      this.set('provider', provider);
    }
  },

  backupsEnabledProviders: function () {
    return this.get('providers').rejectBy('name', 'all');
  }.property('providers.@each'),

  backupsDisabledProviders: function () {
    return this.get('providers').filterBy('name', 'all');
  }.property('providers.@each'),

  cloudHostUpdated: function () {
    //Make new york default if it exits
    var dataCenter = this.get("dataCenters").filterBy("slug", "new-york")[0] || this.get("dataCenters.firstObject");

    //reset data center when the cloud host is changed
    this.set("selectedDataCenter", dataCenter);
  }.observes('selectedCloudHost'),

  dataCenterUpdated: function () {
    //reset zone when the data center is changed
    this.set("selectedAvailabilityZone", this.get("selectedDataCenter.availabilityZones").filterBy('available')[0]);
  }.observes('selectedDataCenter')


});
