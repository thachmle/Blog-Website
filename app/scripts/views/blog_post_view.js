var BlogPostView = Backbone.View.extend({
  events: {
    'click .edit' : 'editPost',

  },

  initialize: function (attrs) {
    this.blog = this.collection.get(attrs.postid);
    this.render();
    console.log('initialize blogpost');
  },

  render: function () {
    var template = Handlebars.compile($('#blog_single_post').html());
    var rendered = template(this.blog.toJSON());
    this.$el.html(rendered);
      console.log('the blog post page is rendered and compile with handlebars');
      $('script[class="box-header"]').hide();
      $('script[class="box-author"]').hide();
      $('script[class="box-tags"]').hide();
    return this;
  },

    editPost: function (event) {

    event.preventDefault();
    event.stopPropagation();
    var post_id = $(event.currentTarget).attr('id');
    window.blog_router.navigate('#edit2/'+ post_id, {trigger: true});
  }  

});