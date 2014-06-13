var attr = Ember.attr, hasMany = Ember.hasMany, belongsTo = Ember.belongsTo;

App.Subscription = Ember.Model.extend({
  id: attr(),
  cardType: attr(),
  expirationDate: attr(),
  isActive: attr(),
  lastDigits: attr(),
  status: attr(),
  stripeToken: attr(),
  name: attr(),
  plan: attr(Number),
  coupon: attr()

});

App.Subscription.url = App.baseUrl + "/subscriptions";
App.Subscription.rootKey = 'subscription';
App.Subscription.collectionKey = 'subscriptions';
App.Subscription.camelizeKeys = true;
App.Subscription.adapter = Ember.RESTAdapter.create();