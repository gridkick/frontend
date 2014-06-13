App.ResetPasswordRoute = Ember.Route.extend({
  model: function(params) {
    return App.User.create({'reset_token': params.token_id});
  },
  setupController: function(controller, model) {
    controller.set("model", model);
  }
});