App.SubscriptionsView = Ember.View.extend({
  layoutName: 'dashboard',
  templateName: 'subscriptions'
});

//probably better ways to do this, but its temp anyways till we get metered billing
App.SubscriptionsIndexView = Ember.View.extend({
  plan1BtnText: function() {
    return this.get("controller.plan1") ? "Current Plan" : "Subscribe";
  }.property("controller.plan1"),
  plan3BtnText: function() {
    return this.get("controller.plan3") ? "Current Plan" : "Subscribe";
  }.property("controller.plan3"),
  plan6BtnText: function() {
    return this.get("controller.plan6")  ? "Current Plan" : "Subscribe";
  }.property("controller.plan6"),
});
