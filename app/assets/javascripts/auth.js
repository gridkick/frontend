App.Auth = Ember.Auth.create({
  signInEndPoint: '/users/sign_in',
  signOutEndPoint: '/users/sign_out',
  tokenKey: 'auth_token',
  tokenIdKey: 'user_id',
  modules: ['emberModel', 'actionRedirectable', 'authRedirectable', 'rememberable'],
  baseUrl: App.baseUrl,
  userModel: 'App.User',
  actionRedirectable: {
    signInRoute: 'instances',
    signInSmart: true,
    signInBlacklist: ["signup", "login", "forgotPassword", "resetPassword"],
    signOutRoute: 'homepage'
  },
  authRedirectable: {
    route: 'login'
  },
  rememberable: {
    tokenKey: 'remember_token',
    period: 7,
    autoRecall: true
  }
});

App.Auth.on('signInError', function() {
  var alert = $('#inner .alert');
  var errMsg = "Error with your login or password";
  if(Ember.isEmpty(alert)){
    $('#inner form').before('<div class="alert alert-error">' + errMsg + '</div>');
  } else {
    alert.html(errMsg).addClass('animated fadeIn');
  }
  
});