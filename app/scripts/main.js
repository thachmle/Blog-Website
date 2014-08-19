Parse.initialize("1nRW6DzenPajIq2jNoHeUpYENLL85XbSaMTIgFVR", "BvAbPn4BZngqLZAyQK03bGNW5qnJEh1LCelAGQeh");

// Initialize App & Checking Users
var App = {};
App.currentUser = Parse.User.current();

//Login
var currentUser = Parse.User.current();
if(currentUser){
  new LoggedInView(currentUser);  
}

$('#user_signup').on('submit', function (event){
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
      new LoggedInView(user);
    },

    error: function(user, error){
       alert("Error: " + error.code + " " + error.message);
    }
});
    $(this).trigger('reset');
});

$('#user_login').on('submit', function (event) {
  event.preventDefault();

  var user_name = $(this).find('.username').val(),
      user_pass = $(this).find('.password').val();

  Parse.User.logIn(user_name, user_pass, {
    success: function(user) {
      new LoggedInView(user);
    },

    error: function(user, error) {
         alert("Error: " + error.message);

    }
  });
      $(this).trigger('reset');
});

function checkPass()
{
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
//end login

//placeholder
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
// Create an instance of  Collection
var blog_list = new BlogCollection();

blog_list.comparator = function(object){
  return object.get("read");
};
  blog_list.fetch().done( function (){
  window.blog_router = new BlogRouter();
  Backbone.history.start();
});

var AppView = function (){

  this.showView = function(view) {
    if (this.currentView){
      this.currentView.remove();
    }

    this.currentView = view;
    this.currentView.render();
    $(".blog_list").html(this.currentView.el);
  }
}

// Submit Form
$('#newBlog').on('submit', function (event) {

  event.preventDefault();
  var temp_blog = new Blog({
    name: $('.blog_title').val(),
    description: $('.blog_desc').val(),
    author: $('.blog_Author').val(),
    tags: $('.blog_tags').val(),
  });
    
  temp_blog.save(null, {
    success: function(temp_blog){
      blog_list.add(temp_blog);
      console.log("success");
    }
  });
    $(this).trigger('reset');  
});



