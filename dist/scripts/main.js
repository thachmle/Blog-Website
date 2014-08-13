var Blog = Parse.Object.extend({

className: "Blog",

  validate: function (attrs) {
    if (!attrs.name) {
      return 'Please enter a Whiskey name!';
    }
    if(!attrs.description){
      return 'Please enter a Whiskey description!';
    }
  },

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

var BlogListView = Backbone.View.extend ({

  events: {
    'click .toggle' : 'togglePost',
    'click .edit' : 'editPost',
    'click .fa fa-camera-retro' : 'home',
    'click .box-header' : 'viewPost'
  },

  initialize: function () {
    var self = this;
    App.blog_list = new BlogCollection();
    App.blog_list.query = new Parse.Query(Blog);
    App.blog_list.comparator = function(object){
      return object.get("read");
    };
    App.blog_list.query.equalTo('user', App.currentUser);
    App.blog_list.on('change', this.render, this); // This watches my collection for when I update a whiskey
    App.blog_list.on('add', this.render, this); // This watches my collection for when I add a whiskey
    App.blog_list.fetch().done( function () {
      self.render();
  });
},

  render: function () {
    App.blog_list.sort();
    var template = Handlebars.compile($('#blog_items').html());
    var rendered = template({ posts : App.blog_list.toJSON() });
    this.$el.html(rendered);
  },

// toggle post read or not
  togglePost: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var item_clicked = $(event.currentTarget);
    var post_id = item_clicked.attr('id');
    var post = App.blog_list.get(post_id);
    var read = post.get('read');
    console.log('post toggled!');

//if read then set properties
    if (read) {
      post.set({ read : false }).save();
    } else {
      post.set({ read : true }).save();
    }
  },

  editPost: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var post_id = $(event.currentTarget).attr('id');
    App.router.navigate('#edit/'+ post_id, {trigger: true});
  },     

  home: function(event) {
  event.preventDefault();
  event.stopPropagation();
  App.router.navigate("", { trigger: true }); 
  },

  viewPost: function(event) {
    event.preventDefault();
    event.stopPropagation();
    var item_clicked = $(event.currentTarget);
    var post_id = $(event.target).attr('id');
    App.router.navigate('#post/'+post_id, {trigger: true});
  }

});

var BlogPostView = Backbone.View.extend({
  events: {
    'click .edit' : 'editPost',

  },

  initialize: function (attrs) {
    this.blog = App.blog_list.get(attrs.postid);
    this.render();
    console.log('initialize blogpost');
  },

  render: function () {
    var template = Handlebars.compile($('#blog_single_post').html());
    var rendered = template(this.blog.toJSON());
    this.$el.html(rendered);
      console.log('the blog post page is rendered and compile with handlebars');
  },

    editPost: function (event) {

    event.preventDefault();
    event.stopPropagation();
    var post_id = $(event.currentTarget).attr('id');
    App.router.navigate('#edit2/' + post_id, {trigger: true});
  }  

});
var BlogEditView = Backbone.View.extend({

  events: {
    'submit #updateData' : 'updateBlog',
    'click .delete' : 'deleteBlog'
  },

  initialize: function (attrs) {
    this.blog = App.blog_list.get(attrs.postid);
    this.render();
  },

  render: function () {
    var template = Handlebars.compile($('#blog_single').html());
    var rendered = template(this.blog.toJSON());
    this.$el.html(rendered);
    console.log('compile and render with handlebars');
  },

  updateBlog: function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.blog.set({
      name: $('.edit_blog_name').val(),
      description: $('.edit_blog_desc').val(),
      author: $('.edit_blog_author').val(),
      tags: $('.edit_blog_tags').val()
    });   
    this.blog.save();
    App.router.navigate("", { trigger: true }); 
    console.log('updateBlog function success');
  },

//deleteBlog function declare from above, also show blog info and list
  deleteBlog: function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure about this?!")) {
      console.log('you click the deleted button');
      this.blog.destroy({success: function () {
        App.router.navigate("", { trigger: true }); 
        console.log('delete function success');
      }});
    }
  }
         
});
var BlogEditView2 = Backbone.View.extend({

  events: {
    'submit #updateData' : 'updateBlog',
    'click .delete' : 'deleteBlog'
  },

  initialize: function (attrs) {
    this.blog = App.blog_list.get(attrs.postid);
    this.render();
  },

  render: function () {
    var template = Handlebars.compile($('#blog_single').html());
    var rendered = template(this.blog.toJSON());
    this.$el.html(rendered);
    console.log('compile and render with handlebars');
  },

  updateBlog: function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.blog.set({
//properties that will be pass into the new variable to edit      
      name: $('.edit_blog_name').val(),
      description: $('.edit_blog_desc').val(),
      author: $('.edit_blog_author').val(),
      tags: $('.edit_blog_tags').val()
    });
//saving the items into the server    
    this.blog.save();
    var post_id = $(event.currentTarget).find('.blog_id').val();
    App.router.navigate('#post/'+post_id, {trigger: true});
    console.log('updateBlog function success');
  },

//deleteBlog function declare from above, also show blog info and list
  deleteBlog: function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure about this?!")) {
      console.log('you click the deleted button');
      var editable = this.collection.get($('.blog_id').val());
      editable.destroy({success: function () {
        App.router.navigate("", { trigger: true }); 
        console.log('delete function success');
      }});
    }
  }
         
});
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
			$('.form_container').hide();
			$('.infoContainer').show();
			$('.b1').show();
			$('.user_info').show();
			console.log(this.user);
			this.$el.html();
	},

	logout: function(event) {
		event.preventDefault();
		Parse.User.logOut();
		$('.form_container').show();
		this.$el.empty();
		$('.input').show();
		$('.infoContainer').hide();
		App.router.navigate("", { trigger: true }); 
	}

});

		
var BlogRouter = Backbone.Router.extend({

  routes: {
    '' : 'main',
    //the ":"" helps backbone to let it know it's a placeholder to look for "id", 
    //dynamic because it is active, the edit down there is active
    'edit/:id' : 'edit',
    'edit2/:id' : 'edit2',
    'post/:id' : 'post'
   },

  initialize: function() {
    this.appView = new App.View();
  },

  main: function () {
    $('.blogInfo').show();
    $('.bgPic').show();
    $('.bgPic2').hide();
    //block for button to log out
    $('.user_info').show();
    if(!App.currentUser) return App.router.navigate('', {trigger: true});
    showUser(App.currentUser);    
    var listView = new BlogListView({ collection: App.blog_list });
        this.appView.showView(listView);
  },

  edit: function (id) {
    $('.blogInfo').hide();
    $('.bgPic').show();
    $('.bgPic2').hide();
    //block for button to logout
    $('.user_info').hide();
    if(!App.currentUser) return App.router.navigate('', {trigger: true});
    showUser(App.currentUser);
    var editView = new BlogEditView({ postid: id,collection: App.blog_list});
        this.appView.showView(editView);
  },

    edit2: function (id) {
    $('.blogInfo').hide();
    $('.bgPic').show();
    $('.bgPic2').hide();
    $('.user_info').hide();
    if(!App.currentUser) return App.router.navigate('', {trigger: true});
    showUser(App.currentUser);
    var editView2 = new BlogEditView2({  postid: id, collection: App.blog_list});
        this.appView.showView(editView2);
  },

  post: function(id) {
    $('.bgPic2').show();
    $('.blogInfo').hide();
    $('.bgPic').hide();
    $('.user_info').hide();
    if(!App.currentUser) return App.router.navigate('', {trigger: true});
    showUser(App.currentUser);
    var postView = new BlogPostView({  postid: id, collection: App.blog_list});
      this.appView.showView(postView);
  }
});


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


