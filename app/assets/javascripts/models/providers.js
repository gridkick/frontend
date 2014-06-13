var attr = Ember.attr, hasMany = Ember.hasMany, belongsTo = Ember.belongsTo;

App.Provider = Ember.Model.extend({
  name: attr()
});

App.Provider.url = App.baseUrl + "/providers";
App.Provider.rootKey = 'provider';
App.Provider.collectionKey = 'providers';
App.Provider.camelizeKeys = true;
App.Provider.adapter = Ember.RESTAdapter.create();