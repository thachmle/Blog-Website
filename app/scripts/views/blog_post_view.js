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
    var rendered = template(this.bl
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