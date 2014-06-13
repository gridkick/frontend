var attr = Ember.attr, hasMany = Ember.hasMany, belongsTo = Ember.belongsTo;

App.Credential = Ember.Model.extend({
  id: attr(),
  accessKeyId: attr(),
  kind: attr(),
  secretAccessKey: attr(),
  bucketName: attr()
});

App.Credential.url = App.baseUrl + "/credentials";
App.Credential.rootKey = 'credential';
App.Credential.collectionKey = 'credentials';
App.Credential.camelizeKeys = true;
App.Credential.adapter = Ember.RESTAdapter.create();