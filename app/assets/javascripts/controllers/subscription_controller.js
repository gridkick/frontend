
App.SubscriptionsIndexController = Ember.ObjectController.extend({
  needs: ["subscriptionsNew", "instances"],
  paymentLogo: function(){
    var card = this.get("cardType") ? this.get("cardType").underscore() : "credit";
    return "/assets/payments/" + card + ".png";
  }.property("cardType"),
  promoAppliedMsg: function() {
    return "The prices shown below are the normal prices. You will receive <b>" + App.Auth.get("user.promoDescription") + "</b> promo and it will be applied to your invoice automatically.";
  }.property("promoValid"),
  plan1: Ember.computed.equal("plan", 1),
  plan3: Ember.computed.equal("plan", 3),
  plan6: Ember.computed.equal("plan", 6),
  actions: {
    newSubscription: function(plan) {

      if (this.get("controllers.instances.activeInstances") <= plan) {
        if (this.get("model.isNew")) {
          this.get("controllers.subscriptionsNew").set("plan", plan);
          this.get("controllers.subscriptionsNew").set("promoCode", App.Auth.get("user.promoCode"));
          this.transitionToRoute('subscriptions.new');
        } else {
          var model = this.get("model");
          model.set("plan", plan);
          model.save().then(this.updatedPlan.bind(this), this.updatedPlanDidError.bind(this));
        }
      } else {
        var dbDiff = this.get("controllers.instances.activeInstances") - plan;
        var servers = (dbDiff == 1) ? "server" : "servers";
        this.set('errors', "You must destroy " + dbDiff + " database " + servers + " before you can downgrade to this plan");
      }
    },
    cancel: function() {
      var _this = this;
      Bootstrap.ModalPane.popup({
        heading: "Are you sure?",
        message: "We hate to see you go, but we understand if you need to. <b>If you end your subscription, your database servers will be <u>destroyed immediately</u> and you will have access to their daily backups for 30 days. </b><p> If there is anything that we can do to improve our service, please let us know by sending an email to founders@gridkick.com </p>",
        primary: "End Subscription",
        secondary: "Cancel",
        showBackdrop: true,
        animateBackdropIn: {method: "fadeIn"},
        animateBackdropOut: {method: "fadeOut"},
        callback: function(opts, event) {
          if (opts.primary) {
            _this.get("model").on('didDeleteRecord', function() {
              _this.get("model").reload();
              App.Auth.get("user").reload();
              _this.get("controllers.instances").clear();
            });

            _this.get("model").deleteRecord();

          } else if (opts.secondary) {
            // secondary(cancel) button clicked
          } else {
            //close clicked
          }
        }
      });
    }
  },
  updatedPlan: function() {
    App.Auth.get("user").reload();
    this.removeErrors();
  },
    removeErrors: function() {
    this.set("errors", null);
  },
  updatedPlanDidError: function(error) {
    this.set('errors', $.parseJSON(error.responseText).error);
    throw error;
  }
});


App.SubscriptionsNewController = Ember.ObjectController.extend({
  key: App.stripeKey,
  processingPurchase: true,
  number: null,
  cvc: null,
  expiration: null,
  expMonth: "",
  expYear: "",
  name: null,
  price: 10,
  errors: "",
  plan: null,
  promoCode: null,
  actions: {
    purchase: function() {
      this.set('processingPurchase', true);
      Stripe.setPublishableKey(this.get('key'));

      return Stripe.card.createToken({
        number: this.get('number'),
        cvc: this.get('cvc'),
        exp_month: this.get('expMonth'),
        exp_year: this.get('expYear'),
        name: this.get("name")
      }, this.didCreateToken.bind(this));
    },
    validateForm: function() {
      if (this.get("isValidCardNumber") &&
          this.get("isValidCardExpiry") &&
          this.get("isValidCardCVC") &&
          this.get("isValidName" ))
      {
       this.set('processingPurchase', false);
      } else {
        this.set('processingPurchase', true);
      }
    }
  },
  isValidCardNumber: function() {
    return $.payment.validateCardNumber(this.get("number"));
  }.property("number"),
  isValidCardExpiry: function() {
    if (Ember.isNone(this.get('expiration'))) return false;
    var expiry = $.payment.cardExpiryVal(this.get('expiration'));
    this.set("expMonth", expiry.month);
    this.set("expYear", expiry.year);
    return $.payment.validateCardExpiry(expiry.month, expiry.year);
  }.property("expiration"),
  isValidCardCVC: function() {
    return $.payment.validateCardCVC(this.get("cvc"), this.get("cardType"));
  }.property("cvc"),
  cardType: function() {
    return $.payment.cardType(this.get("number"));
  }.property("number"),
  isValidName: function(){
    return !Ember.isEmpty(this.get("name"));
  }.property("name"),
  didCreateToken: function(status, response) {
    if (response.error) {
      this.set('processingPurchase', false);
      return this.set('errors', response.error.message);
    } else {
      return this.postCharge(response.id);
    }
  },
  postCharge: function(token) {
    var model = this.get("model");
    model.set("stripeToken", token);
    model.set("plan", this.get("plan"));
    model.set("coupon", this.get("promoCode"));
    model.save().then(this.didPurchase.bind(this), this.purchaseDidError.bind(this));
  },
  didPurchase: function() {
    this.transitionToRoute('subscriptions');
    App.Auth.get("user").reload();
  },
  purchaseDidError: function(error) {
    this.set('errors', $.parseJSON(error.responseText).error);
    this.set('processingPurchase', false);
    throw error;
  }
});

App.SubscriptionsNewView = Ember.View.extend({
  processingPurchase: Ember.computed.alias('controller.processingPurchase'),
  didInsertElement: function(){
    this.$('#number').payment('formatCardNumber');
    this.$('#cvc').payment('formatCardCVC');
    this.$('#expiration').payment('formatCardExpiry');
    this.$(".control-group").removeClass("error");
  },
  keyUp: function() {
    this.get("controller").send("validateForm");
  }
});
