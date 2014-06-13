
App.AuthSignUpView = Ember.View.extend({
  templateName: 'auth/sign-up',
  layoutName: 'auth/layout',
  didInsertElement: function(){
    this.$('input:first').focus();
  }
});