App.BackupsRoute = Ember.Route.extend(App.Auth.AuthRedirectable, {
  model: function() {
    if (App.Auth.get('signedIn')) {
      return App.Credential.find();
    }
    
  }
});