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