App.ForgotPasswordController = Ember.ObjectController.extend({
  email: null,
  errors: null,
  alert: null,
  actions: {
    submit: function() {
      var _this = this;
      var sendResetEmail = $.post(App.baseUrl + '/users/password', {user: { email: this.get("email") }});

      sendResetEmail.fail(function(error){
        _this.set("errors", $.parseJSON(error.responseText).errors);
      });

      sendResetEmail.done(function(){
        var alert = {msg: "An email has been sent to " + _this.get("email"), type: "alert-success"};
        _this.set("alert", alert);
        _this.set("errors", {});
        _this.set("email", null);
      });

    }
  }
});

App.ResetPasswordController = Ember.Controller.extend({
  errors: null,
  alert: null,
  submit: function() {
    var _this = this;
    var resetPassword = $.ajax({
      url: App.baseUrl + '/users/password',
      contentType: "application/json; charset=utf-8",
      type: "PUT",
      data: JSON.stringify({
        user: { password: this.get("password") || "",
                password_confirmation: this.get("password_confirmation") || "",
                reset_password_token: this.get("model.reset_token")
               }
      })
    });

    resetPassword.fail(function(error){
      var errors = $.parseJSON(error.responseText).errors;
      if(errors.reset_password_token){
        var msg = "Your password reset token is no longer valid. Please resubmit your email in the forgot password form.";
        var alert = {msg: msg, type: "alert-error"};
        _this.set("alert", alert);
      }
      _this.set("errors", $.parseJSON(error.responseText).errors);
    });

    resetPassword.done(function(data){
      _this.set("errors", {});
      _this.transitionToRoute("login");
    })
  }
});

