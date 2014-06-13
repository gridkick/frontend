var attr = Ember.attr;

App.Promo = Ember.Model.extend({
  id: attr(),
  name: attr(),
  description: attr()
});

App.Promo.url = App.baseUrl + "/promos";
App.Promo.rootKey = 'promo';
App.Promo.camelizeKeys = true;
App.Promo.adapter = Ember.RESTAdapter.create();