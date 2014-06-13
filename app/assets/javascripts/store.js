// App.Adapter = Ember.RESTAdapter.extend({
  // //url: "http://alpha.api.gridkick.com/",
  // url: App.baseUrl,
  // namespace: ""
// });
// 
// //Always make requests specifying the format
// //This currently works fine, but an Ember Uncaught Object
// //will show in the console because nothing handles the error response.
// App.Adapter.reopen({
  // buildURL: function(record, suffix){
   // return this._super(record, suffix) + ".json";
  // }
// });
// 
// 
// App.Adapter.map('App.Instance', {
  // foreignInstanceData: { embedded: 'always' }
// });
// 
// App.Store = DS.Store.extend({
  // adapter:  App.Adapter.create()
// });
// 
