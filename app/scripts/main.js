Parse.initialize("1nRW6DzenPajIq2jNoHeUpYENLL85XbSaMTIgFVR", "BvAbPn4BZngqLZAyQK03bGNW5qnJEh1LCelAGQeh");




//Login
var currentUser = Parse.User.current();
if(currentUser){
  //do stuff if the user is current
  //jquery to hide the entire form if the user is current
  //bring up thew new view that we made
  // window.blog_router.navigate('parse', { trigger: true });
  new LoggedInView(currentUser);
   
}

$('#user_signup').on('submit', function (event){
  event.preventDefault();

//var only use once becuase we are extending th properties with the "," if it was a ";" then you would need to have var each time
    var user_name = $(this).find('.username').val(),
        user_pass = $(this).find('.password').val(),
        user_pass2 = $(this).find('input[name="password2"]').val(),
        user_email = $(this).find('.email').val();  

// if (user_pass !== user_pass2) return alert('Passwords do not match!');
//this is from parse doc
  var user = new Parse.User();
 
 //user_name value and the rest is declared from the above variable
 //the user in the user.set is declared to find the element with username and then run the variable user_name, which in this case is jquery to find the value of .username declared in the html
  user.set("username", user_name);
  user.set("password", user_pass);
  user.set("email", user_email);


  user.signUp(null, {
    success: function(user) {
      //when success, do something, but in this case we gave it a function of user and we called on the user function to run a new instance of LoggedInView...if we didn't it'll stay on the same screen and never changes.
      new LoggedInView(user);
    },

    error: function(user, error){
       alert("Error: " + error.code + " " + error.message);
    }

});
  //this reset the form without keeping the value
    $(this).trigger('reset');

//end user signUp submit process
});

$('#user_login').on('submit', function (event) {
  event.preventDefault();

  var user_name = $(this).find('.username').val(),
      user_pass = $(this).find('.password').val();

  Parse.User.logIn(user_name, user_pass, {
    success: function(user) {
      //when success what to do...hide stuff, add stuff..but in this case, take us to the user new LoggedInView. The user is decalred on line 55 as the fucnction, it could have been pickles or pizzah.
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

//hide placeholder on hover
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
//get all data and creating a new view
blog_list.fetch().done( function (){
  // Define Global Router && Start History
  window.blog_router = new BlogRouter();
  //monitor change and triggers appropriate routes
  Backbone.history.start();
});

//view for new view and removing old view, look in router
var AppView = function (){

  this.showView = function(view) {
    //this remove will remove all the other views, unbinding and run the new function or new view
    if (this.currentView){
      this.currentView.remove();
    }

    this.currentView = view;
    this.currentView.render();
// this is dumping the info into .blog lis from the view you're on,
    $(".blog_list").html(this.currentView.el);
  }

}
// Submit Form
// create a new Blog and adding it to collection, title,desc,tags
$('#newBlog').on('submit', function (event) {

  event.preventDefault();
//add on new blog properties and not pushing the entire database
  var temp_blog = new Blog({
    name: $('.blog_title').val(),
    description: $('.blog_desc').val(),
    author: $('.blog_Author').val(),
    tags: $('.blog_tags').val(),
  });
  
// regular backbone blog_list.add(temp_blog).save(); but this is with parse old backbone properties
  //in parse you save before  you add, regular you add then yous ave

  
  temp_blog.save(null, {
    success: function(temp_blog){
      blog_list.add(temp_blog);
      console.log("success");
    }
  });
 

  $(this).trigger('reset');  

});



