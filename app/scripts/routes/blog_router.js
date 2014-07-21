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