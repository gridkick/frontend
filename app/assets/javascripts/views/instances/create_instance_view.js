App.CreateInstanceView = Ember.View.extend({
  templateName: 'instances/createInstance',
  controllerNew: function() {
    return this.get('controller.controllers.instancesNew');
  }.property(),
  actions: {
    showCreateForm: function() {
      var _this = this;
      this.get('controllerNew').set("content", App.Instance.create());
      this.get('controllerNew').send('getProviders');

      Bootstrap.ModalPane.popup({
        heading: "New Database Server",
        container:  this.get("container"),
        bodyViewClass: Ember.View.extend({
          controller: this.get('controllerNew'),
          templateName: "instances/new",
          classNames: ['instance-new']
        }),
        primary: "Create",
        secondary: "Cancel",
        showBackdrop: true,
        controller: this.get('controllerNew'),
        animateBackdropIn: {method: "fadeIn"},
        animateBackdropOut: {method: "fadeOut"},
        callback: function(opts, event) {
          if (opts.primary) {
            if(_this.get("controllerNew.providerNotSelected")) {
              this.$('.provider-btn').addClass("btn-danger");
              return false;
            }
            _this.get("controllerNew").send("createInstance");
          } else if (opts.secondary) {
            // secondary(cancel) button clicked
          } else {
            //close clicked
          }
        },
        didInsertElement: function () {
          this.$('.icon-info-sign').tooltip({placement: 'right'});
        }
      });
    }
  }
});

App.EditInstanceView = Ember.TextField.extend({
  classNames: ["input-block-level"],
  insertNewline: function () {
    this.sendAction();
  },
  focusOut: function () {
    this.sendAction();
  },
  didInsertElement: function () {
    this.$().focus();
  }
});
