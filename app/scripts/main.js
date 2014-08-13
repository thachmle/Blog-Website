Parse.initialize("1nRW6DzenPajIq2jNoHeUpYENLL85XbSaMTIgFVR", "BvAbPn4BZngqLZAyQK03bGNW5qnJEh1LCelAGQeh");

// Initialize App & Checking Users
var App = {};
App.currentUser = Parse.User.current();

  if(App.currentUser){
    new LoggedInView(App.currentUser); 

}

App.View = function (){

  this.showView = function(view) {
    if (this.currentView){
      this.currentView.remove();
    }

    this.currentView = view;
    this.currentView.render();
    $(".blog_list").html(this.currentView.el);
  }
}

var showUser = function (user) {
  var name = user.get('username');
  $('.username').text(name);
};

App.router = new BlogRouter();
Backbone.history.start();

// Submit Form
$('#newBlog').on('submit', function (event) {

  event.preventDefault();
  var temp_blog = new Blog();

  var validate = temp_blog.set({
    name: $('.blog_title').val(),
    description: $('.blog_desc').val(),
    author: $('.blog_Author').val(),
    tags: $('.blog_tags').val(),
    user: App.currentUser
  }, {validate:true});
  
  if(validate !== false){
    temp_blog.setACL(new Parse.ACL(Parse.User.current()));
    temp_blog.save(null, {
    success: function(temp_blog){
      App.blog_list.add(temp_blog);
      console.log("success");
      $(this).trigger('reset');  
    }
  });
 }else{
  // alert('Fill This out!')
 }   
});

/////login stuff//////
$('#user_signup').on('submit', function(event){
 event.preventDefault();
 var user_name = $(this).find('.username').val(),
        user_pass = $(this).find('.password').val(),
        user_pass2 = $(this).find('input[name="password2"]').val(),
        user_email = $(this).find('.email').val(); 

    var user = new Parse.User();
        user.set("username", user_name);
        user.set("password", user_pass);
        user.set("email", user_email);

  user.signUp(null, {
    success: function(user) {
       alert('Welcome ' + user.get('username') + '!');
       App.currentUser = Parse.User.current();
       // App.router.navigate('', {trigger: true});
        if(App.currentUser){
       new LoggedInView(App.currentUser);  
      }
    },

    error: function(user, error){
       alert("Error: " + error.code + " " + error.message);
    }
});
    $(this).trigger('reset');
}),

$('#user_login').on('submit', function(event) {
event.preventDefault();

  var user_name = $(this).find('.username').val(),
      user_pass = $(this).find('.password').val();

  Parse.User.logIn(user_name, user_pass, {
    success: function(user) {
       alert('Welcome Back ' + user.get('username') + '!');
       App.currentUser = Parse.User.current();
       // App.router.navigate('', {trigger: true});
               if(App.currentUser){
       new LoggedInView(App.currentUser);  
      }
    },

    error: function(user, error) {
         alert("Error: " + error.message);
    }
  });
      $(this).trigger('reset');
}),

$("input").each(
  function(){
    $(this).data('holder',$(this).attr('placeholder'));
    $(this).focusin(function(){
      $(this).attr('placeholder','');
    });
    $(this).focusout(function(){
      $(this).attr('placeholder',$(this).data('holder'));
    }); 
});

function checkPass(){
  var pass1 = $('.password').val();
  var pass2 = $('.password2').val();
  if(pass1 == pass2 || pass2 ==''){
      $(".password2").css("backgroundColor", "white");
      $('.confirm').hide();   
  }else{
      $(".password2").css("backgroundColor", "#ff6666");
      $('.confirm').show();
      $('.confirm').html('Does Not Match!');
  }
}


