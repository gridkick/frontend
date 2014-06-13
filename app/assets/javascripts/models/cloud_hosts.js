var attr = Ember.attr, hasMany = Ember.hasMany, belongsTo = Ember.belongsTo;

App.CloudHost = Ember.Model.extend({
  id: attr(),
  name: attr(),
  slug: attr(),
  dataCenters: hasMany('App.DataCenter', {key: 'data_centers', embedded: true})
});

App.DataCenter = Ember.Model.extend({
  id: attr(),
  name: attr(),
  slug: attr(),
  availabilityZones: hasMany('App.AvailabilityZone', {key: 'availability_zones', embedded: true}),
  cloudHost: Ember.belongsTo('App.CloudHost', {key: 'cloud_host_id'})
});

App.AvailabilityZone = Ember.Model.extend({
  id: attr(),
  name: attr(),
  slug: attr(),
  available: attr(),
  dataCenter: Ember.belongsTo('App.DataCenter', {key: 'data_center_id'})
});

App.CloudHost.url = App.baseUrl + "/cloud_hosts";
App.CloudHost.rootKey = 'cloud_host';
App.CloudHost.collectionKey = 'cloud_hosts';
App.CloudHost.camelizeKeys = true;
App.CloudHost.adapter = Ember.RESTAdapter.create();

App.DataCenter.url = App.baseUrl + "/data_centers";
App.DataCenter.rootKey = 'data_center';
App.DataCenter.collectionKey = 'data_centers';
App.DataCenter.camelizeKeys = true;
App.DataCenter.adapter = Ember.RESTAdapter.create();

App.AvailabilityZone.url = App.baseUrl + "/availability_zones";
App.AvailabilityZone.rootKey = 'availability_zone';
App.AvailabilityZone.collectionKey = 'availability_zones';
App.AvailabilityZone.camelizeKeys = true;
App.AvailabilityZone.adapter = Ember.RESTAdapter.create();

