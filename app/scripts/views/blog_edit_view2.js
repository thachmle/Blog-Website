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