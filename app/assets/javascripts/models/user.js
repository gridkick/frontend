var attr = Ember.attr, hasMany = Ember.hasMany, belongsTo = Ember.belongsTo;

App.User = Ember.Model.extend({
  id: attr(),
  email: attr(),
  password: attr(),
  passwordConfirmation: attr(),
  authToken: attr(),
  rememberMe: attr(),
  hasSubscription: attr(),
  hasActiveSubscription: attr(),
  maxInstances: attr(Number),
  acceptedTerms: attr(),
  activeInstances: attr(Number),
  promoCode: attr(),
  promoDescription: attr()
});

App.User.url = App.baseUrl + "/users";
App.User.rootKey = 'user';
App.User.camelizeKeys = true;
App.User.adapter = Ember.RESTAdapter.create();