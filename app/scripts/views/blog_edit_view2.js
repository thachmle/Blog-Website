var BlogEditView2 = Backbone.View.extend({

  // el:'.blog_edit',
  //className: 'blog_edit', this will create a div inside the page
  events: {
    // taking the id updateData in html to update to initiate the submit function and then create a function updateBlog
    'submit #updateData' : 'updateBlog',
    // click function of events to the the class .delete in html then create function deleteBlog
    'click .delete' : 'deleteBlog'

  },

  initialize: function (attrs) {
    this.blog = this.collection.get(attrs.postid);
    this.collection.on('change', this.render, this);
    this.collection.on('add',this.render, this);

    this.render();
  },

  render: function () {

    // var single = this.collection.get(this.options.postid);
        //compile with handlebars and injecting into the id blog_single into the html
        //#blog_single is in html as a template, the blog single view
    var template = Handlebars.compile($('#blog_single').html());
    var rendered = template(this.blog.toJSON());
    //render into the html
    this.$el.html(rendered);
    console.log('compile and render with handlebars');
    //empty out after render and append, prevent multiple render after each actions


  },
//updateBlog function, declare from events
  updateBlog: function (event) {
//prevent any actions from default and only use actions define here    
    event.preventDefault();
    event.stopPropagation();
//creating var to edit a list of key properties, define in html as well 
//jQuery is targeting the class .blog_id and the that blog id uses handlebar to grab the value of {{ objectId }} to grab the id of that SPECIFIC object
//also that Id is hidden becuase it is define in the index line 145, basically you can target it invisibly :) 
   
    var editable = this.collection.get($('.blog_id').val());
    editable.set({
//properties that will be pass into the new variable to edit      
      name: $('.edit_blog_name').val(),
      description: $('.edit_blog_desc').val(),
      author: $('.edit_blog_author').val(),
      tags: $('.edit_blog_tags').val()
    });
//saving the items into the server    
    editable.save();
//Navigating back to the post after the user hit the update button
    //you can use just $('.blog_id').val()<---the value inside is the object id, so it will be target and pull into your new navigate window
    //for better practice, use the currentTarget or target for just a single item, currentTarget is incase you use a font icon and then you embed it inside...then you will tell js that where ever you click inside that element...icon or not, it will still run the function....the target is fine if you're using only 1 element.
    var post_id = $(event.currentTarget).find('.blog_id').val();
    window.blog_router.navigate('#post/'+post_id, {trigger: true});
    console.log('updateBlog function success');

  },

//deleteBlog function declare from above, also show blog info and list
  deleteBlog: function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure about this?!")) {
      //console log to make sure it works, in production take all console log out
      console.log('you click the deleted button');
      var editable = this.collection.get($('.blog_id').val());
      //if success then run the function below
      editable.destroy({success: function () {
    // $('.blogInfo').show();
    // $('.blog_list').show();
        window.blog_router.navigate("", { trigger: true }); 
        console.log('delete function success');
      }});
    }
  }
         
});