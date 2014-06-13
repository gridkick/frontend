
App.AuthSignInView = Ember.View.extend({
  templateName: 'auth/sign-in',
  layoutName: 'auth/layout',
  email: null,
  password: null,
  remember: false,
  submit: function(event, view) {
    event.preventDefault();
    event.stopPropagation();
    return App.Auth.signIn({
      data: {
        user_login: {
          email: this.get('context.email'),
          password: this.get('context.password'),
          remember_me: true
        }
      }
    });
  },
  didInsertElement: function(){
    this.$('input:first').focus();
  }
});