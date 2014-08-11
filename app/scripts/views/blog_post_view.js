var BlogPostView = Backbone.View.extend({
//making click event for edit on the single targeted post view
  events: {
    'click .edit' : 'editPost',

  },

  initialize: function (attrs) {
    //this.blog is not define, the this targer these elements but blog is a placeholder to let you know what you're trying to do, in the render, you have to use the same name or it will not work
    this.blog = this.collection.get(attrs.postid);
    this.render();
    console.log('initialize blogpost');
  },

//render the function inside the tempate with handlebars
  render: function () {
    var template = Handlebars.compile($('#blog_single_post').html());
    var rendered = template(this.blog.toJSON());
    // this.$el.next().html('');
    this.$el.html(rendered);
      console.log('the blog post page is rendered and compile with handlebars');
    // $('.blog_list').empty().append(this.$el);
//hiding the content on the main page to create a new view
    // $('.box-copy').hide();
    return this;
  },

    editPost: function (event) {

    event.preventDefault();
    event.stopPropagation();
    //currentTarget will find the other elements, before you had target, so it target the id but the font icon wasn't being targeted
    //the icon had an id so when you click on it, it becomes blank, so page will break, so if you click on the box you're good to go
    var post_id = $(event.currentTarget).attr('id');
    //navigating to the edit2 page, BlogEditView2, look in router
    window.blog_router.navigate('#edit2/'+ post_id, {trigger: true});
    //don't use hide here, use it in the actual route, doing it here will cause the backspace to not remember the history
    //don't believe me? use it for yourself thach and you will see :P
     // $('.blogInfo').hide();

  }  

});