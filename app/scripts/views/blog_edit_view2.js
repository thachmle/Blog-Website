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