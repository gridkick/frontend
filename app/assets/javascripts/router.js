App.Router.map(function() {
  this.resource("backups");
  this.resource("instances", {path: 'databases'});
  this.resource("subscriptions", {path: 'billing'}, function(){
    this.route("new");
  });

  this.route("forgotPassword");
  this.route("homepage", {path: '/'});
  this.route("login");
  this.route("resetPassword", {path: "users/password/edit/:token_id"});
  this.route("signup", {queryParams: ['promoCode']});
});

App.Router.reopen({
  location: 'history'
});

App.HomepageRoute = Ember.Route.extend({
  redirect: function(){
    //leave the ember app
    window.location.href = '/';
  }
});
