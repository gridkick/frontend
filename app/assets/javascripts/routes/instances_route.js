App.InstancesRoute = Ember.Route.extend(App.Auth.AuthRedirectable, {
  model: function() {
    if (App.Auth.get('signedIn')) {
      return App.Instance.find();
    }
  },
  setupController: function(controller, model) {
    controller.set("cloudHosts", App.CloudHost.find());
    controller.set("model", model);
    controller.set("errors", "");

    model.on('didLoad', function() {
      controller.send("pollRestart");
    });
  }
});