var BlogEditView = Backbone.View.extend({

  // el:'.blog_edit',
  //className: 'blog_edit', this will create a div inside the page
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
//saving the items into the server    
    editable.save();
//navigating back to the default  
    window.blog_router.navigate("", { trigger: true }); 
    console.log('updateBlog function success');
  },

//deleteBlog function declare from above, also show blog info and list
  deleteBlog: function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure about this?!")) {
      console.log('you click the deleted button');
      var editable = this.collection.get($('.blog_id').val());
      //if success 
      editable.destroy({success: function () {
        window.blog_router.navigate("", { trigger: true }); 
        console.log('delete function success');
      }});
    }
  }
         
});