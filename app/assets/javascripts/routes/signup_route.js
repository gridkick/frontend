App.SignupRoute = Ember.Route.extend({
  model: function() {
    return App.User.create();
  },
  setupController: function(controller, context, queryParams) {
    controller.set('model', context);
    if(queryParams.promoCode) {
      controller.set('promoCode', queryParams.promoCode);

      //validate promo code
      var promo = App.Promo.fetch(queryParams.promoCode).then(
        function(data){
          controller.set("promoValid", true);
          controller.set("promoDescription", data.get("description"));
        },
        function(error){
          controller.set("promoValid", false);
          controller.set("promoDescription", error.responseJSON.error);
      });
    }

  }
});
