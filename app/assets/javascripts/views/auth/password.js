
App.ForgotPasswordView = Ember.View.extend({
  templateName: 'auth/forgot-password',
  layoutName: 'auth/layout',
  didInsertElement: function(){
    this.$('input:first').focus();
  }
});

App.ResetPasswordView = Ember.View.extend({
  templateName: 'auth/reset-password',
  layoutName: 'auth/layout'
});