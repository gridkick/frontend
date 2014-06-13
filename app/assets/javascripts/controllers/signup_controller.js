App.SignupController = Ember.ObjectController.extend({
  notAcceptedTerms: Ember.computed.not("acceptedTerms"),
  promoValidMsg: function() {
    return "Promo code valid! You will receive " + this.get("promoDescription") + ". How sweet is that?";
  }.property("promoValid"),
  actions: {
    submit: function() {
      var _this = this;
      var model = this.get('model');

      //set promo info on user
      if(this.get("promoValid") && this.get("promoCode")) {
        model.set("promoCode", this.get("promoCode"));
        model.set("promoDescription", this.get("promoDescription"));
      }

      this.set("rememberMe", true);

      model.on('didCreateRecord', function() {
        var user = this._data;
        var auth = {auth_token: user.auth_token, user_id: user.id, remember_token: user.remember_token};
        App.Auth.createSession(auth);
        App.Auth.get("user").reload();
      });

      model.save().then(function(data){}, function(error){
        _this.set("errors", error.responseJSON.errors);
      });

    },
    showTerms: function() {
      var _this = this;
      Bootstrap.ModalPane.popup({
        heading: "Terms of Service",
        secondary: "Close",
        container:  this.get("container"),
        bodyViewClass: Ember.View.extend({
          controller: this,
          tagName: 'p',
          template: Ember.Handlebars.compile('{{partial "partials/terms"}}')
        }),
        showBackdrop: true,
        animateBackdropIn: {method: "fadeIn"},
        animateBackdropOut: {method: "fadeOut"},

      });
    },
    showPrivacy: function() {
      Bootstrap.ModalPane.popup({
        heading: "Privacy Policy",
        secondary: "Close",
        container:  this.get("container"),
        bodyViewClass: Ember.View.extend({
          tagName: 'p',
          template: Ember.Handlebars.compile('{{partial "partials/privacy"}}')
        }),
        showBackdrop: true,
        animateBackdropIn: {method: "fadeIn"},
        animateBackdropOut: {method: "fadeOut"},

      });
    }
  }
});
