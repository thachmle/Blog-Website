var LoggedInView = Backbone.View.extend ({

	el: '.user_info',

events: {

		'click .b1' : 'logout'
},

initialize: function(user) {
	this.user = user;
	this.render();
},

render: function() {
		console.log(this.user);
	// $('.form_container').hide();
		// $('input').hide();
	//you can add class inside there mf
	// this.$el.html(this.user.get('username') + ' , this cool guy is logged in! <h1>hellow terry, the  man</h1> <button class="b2">AnotherLog</button><button>Logout</button>')
	// this.$el.html(this.user.get('username')
		this.$el.html();
		$('.form_container').hide();
		$('.infoContainer').show();
		$('.b1').show();
},

logout: function (event) {
	event.preventDefault();
	Parse.User.logOut();
	$('.form_container').show();
	this.$el.empty();
	$('.input').show();
	  $('.infoContainer').hide();
}


	
});

		
var Blog = Parse.Object.extend({

className: "BlogParse",

  idAttribute: 'objectId',

  defaults: {
    name: '',
    description: '',
    author: '',
    tags: [],
    read: false 
  }

});

var BlogCollection = Parse.Collection.extend ({
  model: Blog,
  // url: 'http://tiy-atl-fe-server.herokuapp.com/collections/thachmle',
});

//Blog list view
var BlogListView = Backbone.View.extend ({

//targing .blog_lists
   // el: '.blog_list',
  //el properties isn't required
  // className: '.blog_list',
//events for clicing on toggle and edit, creating function as results
  events: {
    'click .toggle' : 'togglePost',
    'click .edit' : 'editPost',
    'click .fa fa-camera-retro' : 'home',
    'click .box-header' : 'viewPost'
  },

  initialize: function () {
    this.render();
    this.collection.on('change', this.render, this);
    this.collection.on('add',this.render, this);

  },

//render the function inside the tempate with handlebars
  render: function () {
    this.collection.sort();
    //compiling the data into #blog_items  then will append
    var template = Handlebars.compile($('#blog_items').html());
    var rendered = template({ posts : this.collection.toJSON() });
    // this.$el.next().html('');
    this.$el.html(rendered);
  },

// toggle post read or not
  togglePost: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var item_clicked = $(event.currentTarget);
    //you can chain this without making a new variable
    var post_id = item_clicked.attr('id');
    //the collection is the instance of the model
    var post = this.collection.get(post_id);
    var read = post.get('read');
    console.log('post toggled!');

//if read then set properties
    if (read) {
      post.set({ read : false }).save();
    } else {
      post.set({ read : true }).save();
    }
  },

//hide info and list after edit is clicked on
  editPost: function (event) {

    event.preventDefault();
    event.stopPropagation();
    //currentTarget will find the other elements, before you had target, so it target the id but the font icon wasn't being targeted
    //the icon had an id so when you click on it, it becomes blank, so page will break, so if you click on the box you're good to go
    var post_id = $(event.currentTarget).attr('id');

    window.blog_router.navigate('#edit/'+ post_id, {trigger: true});
    //don't use hide here, use it in the actual route, doing it here will cause the backspace to not remember the history
    //don't believe me? use it for yourself thach and you will see :P
     // $('.blogInfo').hide();

  },     

  home: function(event) {
  event.preventDefault();
  event.stopPropagation();
  window.blog_router.navigate("", { trigger: true }); 
  },


  viewPost: function(event) {
    event.preventDefault();
    event.stopPropagation();
    var item_clicked = $(event.currentTarget);
    //you can chain this without making a new variable
    // var post_id = item_clicked.attr('id');
    //the collection is the instance of the model
    var post_id = $(event.target).attr('id');
    window.blog_router.navigate('#post/'+post_id, {trigger: true});

  }


});

var BlogPostView = Backbone.View.extend({
//making click event for edit on the single targeted post view
  events: {
    'click .edit' : 'editPost',

  },

  initialize: function (attrs) {
    //this.blog is not define, the this targer these elements but blog is a placeholder to let you know what you're trying to do, in the render, you have to use the same name or it will not work
    this.blog = this.collection.get(attrs.postid);
    this.render();
    console.log('initialize blogpost');
  },

//render the function inside the tempate with handlebars
  render: function () {
    var template = Handlebars.compile($('#blog_single_post').html());
    var rendered = template(this.blog.toJSON());
    // this.$el.next().html('');
    this.$el.html(rendered);
      console.log('the blog post page is rendered and compile with handlebars');
    // $('.blog_list').empty().append(this.$el);
//hiding the content on the main page to create a new view
    // $('.box-copy').hide();
    return this;
  },

    editPost: function (event) {

    event.preventDefault();
    event.stopPropagation();
    //currentTarget will find the other elements, before you had target, so it target the id but the font icon wasn't being targeted
    //the icon had an id so when you click on it, it becomes blank, so page will break, so if you click on the box you're good to go
    var post_id = $(event.currentTarget).attr('id');
    //navigating to the edit2 page, BlogEditView2, look in router
    window.blog_router.navigate('#edit2/'+ post_id, {trigger: true});
    //don't use hide here, use it in the actual route, doing it here will cause the backspace to not remember the history
    //don't believe me? use it for yourself thach and you will see :P
     // $('.blogInfo').hide();

  }  

});
var BlogEditView = Backbone.View.extend({

  // el:'.blog_edit',
  //className: 'blog_edit', this will create a div inside the page
  events: {
    // taking the id updateData in html to update to initiate the submit function and then create a function updateBlog
    'submit #updateData' : 'updateBlog',
    // click function of events to the the class .delete in html then create function deleteBlog
    'click .delete' : 'deleteBlog'

  },

  initialize: function (attrs) {
    this.blog = this.collection.get(attrs.postid);
    this.render();

  },

  render: function () {

    // var single = this.collection.get(this.options.postid);
        //compile with handlebars and injecting into the id blog_single into the html
        //#blog_single is in html as a template, the blog single view
    var template = Handlebars.compile($('#blog_single').html());
    var rendered = template(this.blog.toJSON());
    //render into the html
    this.$el.html(rendered);
    console.log('compile and render with handlebars');
    //empty out after render and append, prevent multiple render after each actions


  },
//updateBlog function, declare from events
  updateBlog: function (event) {
//prevent any actions from default and only use actions define here    
    event.preventDefault();
    event.stopPropagation();
//creating var to edit a list of key properties, define in html as well 
//jQuery is targeting the class .blog_id and the that blog id uses handlebar to grab the value of {{ objectId }} to grab the id of that SPECIFIC object
//also that Id is hidden becuase it is define in the index line 145, basically you can target it invisibly :) 
   
    var editable = this.collection.get($('.blog_id').val());
    editable.set({
//properties that will be pass into the new variable to edit      
      name: $('.edit_blog_name').val(),
      description: $('.edit_blog_desc').val(),
      author: $('.edit_blog_author').val(),
      tags: $('.edit_blog_tags').val()
    });
//saving the items into the server    
    editable.save();
//navigating back to the default locations, home    
    window.blog_router.navigate("", { trigger: true }); 
    console.log('updateBlog function success');

  },

//deleteBlog function declare from above, also show blog info and list
  deleteBlog: function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure about this?!")) {
      //console log to make sure it works, in production take all console log out
      console.log('you click the deleted button');
      var editable = this.collection.get($('.blog_id').val());
      //if success then run the function below
      editable.destroy({success: function () {
    // $('.blogInfo').show();
    // $('.blog_list').show();
        window.blog_router.navigate("", { trigger: true }); 
        console.log('delete function success');
      }});
    }
  }
         
});
var BlogEditView2 = Backbone.View.extend({

  // el:'.blog_edit',
  //className: 'blog_edit', this will create a div inside the page
  events: {
    // taking the id updateData in html to update to initiate the submit function and then create a function updateBlog
    'submit #updateData' : 'updateBlog',
    // click function of events to the the class .delete in html then create function deleteBlog
    'click .delete' : 'deleteBlog'

  },

  initialize: function (attrs) {
    this.blog = this.collection.get(attrs.postid);
    this.collection.on('change', this.render, this);
    this.collection.on('add',this.render, this);

    this.render();
  },

  render: function () {

    // var single = this.collection.get(this.options.postid);
        //compile with handlebars and injecting into the id blog_single into the html
        //#blog_single is in html as a template, the blog single view
    var template = Handlebars.compile($('#blog_single').html());
    var rendered = template(this.blog.toJSON());
    //render into the html
    this.$el.html(rendered);
    console.log('compile and render with handlebars');
    //empty out after render and append, prevent multiple render after each actions


  },
//updateBlog function, declare from events
  updateBlog: function (event) {
//prevent any actions from default and only use actions define here    
    event.preventDefault();
    event.stopPropagation();
//creating var to edit a list of key properties, define in html as well 
//jQuery is targeting the class .blog_id and the that blog id uses handlebar to grab the value of {{ objectId }} to grab the id of that SPECIFIC object
//also that Id is hidden becuase it is define in the index line 145, basically you can target it invisibly :) 
   
    var editable = this.collection.get($('.blog_id').val());
    editable.set({
//properties that will be pass into the new variable to edit      
      name: $('.edit_blog_name').val(),
      description: $('.edit_blog_desc').val(),
      author: $('.edit_blog_author').val(),
      tags: $('.edit_blog_tags').val()
    });
//saving the items into the server    
    editable.save();
//Navigating back to the post after the user hit the update button
    //you can use just $('.blog_id').val()<---the value inside is the object id, so it will be target and pull into your new navigate window
    //for better practice, use the currentTarget or target for just a single item, currentTarget is incase you use a font icon and then you embed it inside...then you will tell js that where ever you click inside that element...icon or not, it will still run the function....the target is fine if you're using only 1 element.
    var post_id = $(event.currentTarget).find('.blog_id').val();
    window.blog_router.navigate('#post/'+post_id, {trigger: true});
    console.log('updateBlog function success');

  },

//deleteBlog function declare from above, also show blog info and list
  deleteBlog: function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure about this?!")) {
      //console log to make sure it works, in production take all console log out
      console.log('you click the deleted button');
      var editable = this.collection.get($('.blog_id').val());
      //if success then run the function below
      editable.destroy({success: function () {
    // $('.blogInfo').show();
    // $('.blog_list').show();
        window.blog_router.navigate("", { trigger: true }); 
        console.log('delete function success');
      }});
    }
  }
         
});
var BlogRouter = Backbone.Router.extend({

  routes: {
    '' : 'main',
    //the ":"" helps backbone to let it know it's a placeholder to look for "id", 
    //dynamic because it is active, the edit down there is active
    'edit/:id' : 'edit',
    'edit2/:id' : 'edit2',
    'post/:id' : 'post',
  },

  initialize: function() {
    this.appView = new AppView();
  },

  main: function () {
      
        $('.user_info').show();
        $('.blogInfo').show();
        $('.bgPic').show();
        $('.bgPic2').hide();

    var listView = new BlogListView({ collection: blog_list });
        this.appView.showView(listView);
  },

  edit: function (id) {
    $('.blogInfo').hide();
    $('.bgPic').show();
    $('.bgPic2').hide();
    $('.user_info').hide();
    var editView = new BlogEditView({  postid: id, collection: blog_list});
        this.appView.showView(editView);
  },

    edit2: function (id) {
    $('.blogInfo').hide();
    $('.bgPic').show();
    $('.bgPic2').hide();
    $('.user_info').hide();
    var editView2 = new BlogEditView2({  postid: id, collection: blog_list});
        this.appView.showView(editView2);
  },

  post: function(id) {
    $('.bgPic2').show();
    $('.blogInfo').hide();
    $('.bgPic').hide();
    $('.user_info').hide();
    var postView = new BlogPostView({  postid: id,  collection: blog_list});
      this.appView.showView(postView);
  }


});


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



