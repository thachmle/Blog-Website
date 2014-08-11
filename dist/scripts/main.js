var LoggedInView = Backbone.View.extend ({

	el: '.user_info',
	events: {
			'click button' : 'logout'
	},

	initialize: function(user) {
		this.user = user;
		this.render();
	},

	render: function() {
		// this.$el.html(this.user.get('username') + ' , this cool guy is logged in! <h1>hellow terry, the  man</h1> <button class="b2">AnotherLog</button><button>Logout</button>')
		// this.$el.html(this.user.get('username')
			this.$el.html('<button class="b1 pulse"></button>');
			$('.form_container').hide();
			$('.infoContainer').show();
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


var BlogListView = Backbone.View.extend ({

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

  render: function () {
    this.collection.sort();
    var template = Handlebars.compile($('#blog_items').html());
    var rendered = template({ posts : this.collection.toJSON() });
    this.$el.html(rendered);
  },

  togglePost: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var item_clicked = $(event.currentTarget);
    var post_id = item_clicked.attr('id');
    var post = this.collection.get(post_id);
    var read = post.get('read');

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
    window.blog_router.navigate('#edit/'+ post_id, {trigger: true});
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
    var post_id = $(event.target).attr('id');
    window.blog_router.navigate('#post/'+post_id, {trigger: true});

  }
});

var BlogPostView = Backbone.View.extend({
  events: {
    'click .edit' : 'editPost',
  },

  initialize: function (attrs) {
    this.blog = this.collection.get(attrs.postid);
    this.render();
  },

  render: function () {
    var template = Handlebars.compile($('#blog_single_post').html());
    var rendered = template(this.blog.toJSON());
    this.$el.html(rendered);
    return this;
  },

    editPost: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var post_id = $(event.currentTarget).attr('id');
    window.blog_router.navigate('#edit2/'+ post_id, {trigger: true});
  }  

});
var BlogEditView = Backbone.View.extend({

  events: {
    'submit #updateData' : 'updateBlog',
    'click .delete' : 'deleteBlog'
  },

  initialize: function (attrs) {
    this.blog = this.collection.get(attrs.postid);
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
    var editable = this.collection.get($('.blog_id').val());
    editable.set({
      name: $('.edit_blog_name').val(),
      description: $('.edit_blog_desc').val(),
      author: $('.edit_blog_author').val(),
      tags: $('.edit_blog_tags').val()
    }); 
    editable.save();  
    window.blog_router.navigate("", { trigger: true }); 
    console.log('updateBlog function success');
  },

  deleteBlog: function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure about this?!")) {
      console.log('you click the deleted button');
      editable.destroy({success: function () {
        window.blog_router.navigate("", { trigger: true }); 
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
    this.blog = this.collection.get(attrs.postid);
    this.collection.on('change', this.render, this);
    this.collection.on('add',this.render, this);

    this.render();
  },

  render: function () {
    var template = Handlebars.compile($('#blog_single').html());
    var rendered = template(this.blog.toJSON());
    this.$el.html(rendered);

  },

  updateBlog: function (event) {
    event.preventDefault();
    event.stopPropagation();   
    var editable = this.collection.get($('.blog_id').val());
    editable.set({    
      name: $('.edit_blog_name').val(),
      description: $('.edit_blog_desc').val(),
      author: $('.edit_blog_author').val(),
      tags: $('.edit_blog_tags').val()
    }); 
    editable.save();
    var post_id = $(event.currentTarget).find('.blog_id').val();
    window.blog_router.navigate('#post/'+post_id, {trigger: true});
  },

  deleteBlog: function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure about this?!")) {
      var editable = this.collection.get($('.blog_id').val());
      editable.destroy({success: function () {
        window.blog_router.navigate("", { trigger: true }); 
      }});
    }
  }     
});
var BlogRouter = Backbone.Router.extend({

  routes: {
    '' : 'main',
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

var blog_list = new BlogCollection();

blog_list.comparator = function(object){
  return object.get("read");
};
blog_list.fetch().done( function (){
  window.blog_router = new BlogRouter();
  Backbone.history.start();
});

//view for new view and removing old view, look in router
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
    }
  });
  $(this).trigger('reset');  
});



