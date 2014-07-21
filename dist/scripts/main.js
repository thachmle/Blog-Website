var Blog = Backbone.Model.extend({

  idAttribute: '_id',

  defaults: {
    name: '',
    description: '',
    author: '',
    tags: '',
    read: false
  }

});

var BlogCollection = Backbone.Collection.extend ({
  model: Blog,
  url: 'http://tiy-atl-fe-server.herokuapp.com/collections/thachmle',
  comparator: 'read'
});
var BlogListView = Backbone.View.extend ({

  el: '.blog_list',

  events: {
    'click .toggle' : 'togglePost',
    'click .edit' : 'editPost'
  },

  initialize: function () {
    this.render();
    this.collection.on('change', this.render, this);
  },

  render: function () {
    this.collection.sort();
    var template = Handlebars.compile($('#blog_items').html());
    var rendered = template({ posts : this.collection.toJSON() });
    this.$el.next().html('');
    this.$el.html(rendered);
  },

  togglePost: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var item_clicked = $(event.currentTarget);
    var post_id = item_clicked.attr('id');
    var post = this.collection.get(post_id);
    var read = post.get('read');

    if (read) {
      post.set({ read : false }).save();
    } else {
      post.set({ read : true }).save();
    }
  },

  editPost: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var post_id = $(event.target).attr('id');
    window.blog_router.navigate('#edit/'+ post_id, {trigger: true});
  }

});


var BlogEditView = Backbone.View.extend({

  el: '.blog_edit',

  events: {
    'submit #updateForm' : 'updateBlog',
    'click .delete' : 'deleteBlog'
  },

  initialize: function (attrs) {
    this.options = attrs;
    this.render();
  },

  render: function (options) {
    var single = this.collection.get(this.options.postid);
    var template = Handlebars.compile($('#blog_single').html());
    var rendered = template(single.toJSON());
    this.$el.prev().html('');
    this.$el.html(rendered);
    $(".blogInfo").hide();
    // $('.blog_edit').empty().append(this.$el);
    // return this;
  },
//updateBlog function, declare from events
  updateBlog: function (event) {
//prevent any actions from default and only use actions define here    
    event.preventDefault();
    event.stopPropagation();
//creating var to edit a list of key properties, define in html as well    
    var editable = this.collection.get($('.blog_id').val());
    editable.set({
//properties that will be pass into the new variable to edit      
      name: $('.edit_blog_name').val(),
      description: $('.edit_blog_desc').val(),
      author: $('.edit_blog_author'),
      tags: $('.edit_blog_tags').val()
    });
//saving the items into the server    
    editable.save();
//navigating back to the default locations, home    
    window.blog_router.navigate("", { trigger: true });
  $(".blogInfo").show();
  },
//deleteBlog function declare from above
  deleteBlog: function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure about this?!")) {
      console.log('delete pressed');
      var editable = this.collection.get($('.blog_id').val());
      editable.destroy({success: function () {
        window.blog_router.navigate("", { trigger: true });
      $(".blogInfo").show();
      }});
    }
  }

});
var BlogRouter = Backbone.Router.extend({

  routes: {
    '' : 'home',
    'edit/:id' : 'edit'
  },

  home: function () {
    new BlogListView({ collection: blog_list });
  },

  edit: function (id) {
    new BlogEditView({ postid: id, collection: blog_list });
  }

});
// Create an instance of  Collection
var blog_list = new BlogCollection();

//get all data and creating a new view
blog_list.fetch().done( function (){
  // Define Global Router && Start History
  window.blog_router = new BlogRouter();
  Backbone.history.start();
});


// Submit Form
// create a new Blog and adding it to collection, title,desc,tags
$('#newBlog').on('submit', function (event) {

  event.preventDefault();

  var temp_blog = new Blog({
    name: $('.blog_title').val(),
    description: $('.blog_desc').val(),
    author: $('.blog_author').val(),
    tags: $('.blog_tags').val()
  });

  blog_list.add(temp_blog).save();

  $(this).trigger('reset');

});