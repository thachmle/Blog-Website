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