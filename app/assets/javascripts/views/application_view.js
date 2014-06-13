App.ApplicationView = Ember.View.extend({
});

App.MainNavView = Ember.View.extend({
  layoutName: 'header',
  templateName: 'nav/container'
});

App.NavUserView = Ember.View.extend({
  templateName: 'nav/user',
  tagName: 'li',
  classNames: ['dropdown'],
  actions: {
    logout: function() {
      App.Auth.signOut();
    }
  }
});


