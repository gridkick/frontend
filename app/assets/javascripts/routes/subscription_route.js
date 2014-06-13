App.SubscriptionsIndexRoute = Ember.Route.extend(App.Auth.AuthRedirectable, {
  model: function() {
    if (App.Auth.get('signedIn')) {
      return App.Subscription.find('singleton');
    }
    
  }
});

App.SubscriptionsNewRoute = Ember.Route.extend(App.Auth.AuthRedirectable, {
  model: function() {
    if (App.Auth.get('signedIn')) {
      return App.Subscription.create();
    }
    
  }
});