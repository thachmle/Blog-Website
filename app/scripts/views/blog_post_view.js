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