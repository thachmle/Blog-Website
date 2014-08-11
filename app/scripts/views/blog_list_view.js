//Blog list view
var BlogListView = Backbone.View.extend ({

//targing .blog_lists
   // el: '.blog_list',
  //el properties isn't required
  // className: '.blog_list',
//events for clicing on toggle and edit, creating function as results
  events: {
    'click .toggle' : 'togglePost',
    'click .edit' : 'editPost',
    'click .fa fa-camera-retro' : 'home',
    'click .box-header' : 'viewPost'
  },

  initialize: function () {
    this.render();
    this.collection.on('change', this.render, this);
    this.collection.on('add',this.render, this);

  },

//render the function inside the tempate with handlebars
  render: function () {
    this.collection.sort();
    //compiling the data into #blog_items  then will append
    var template = Handlebars.compile($('#blog_items').html());
    var rendered = template({ posts : this.collection.toJSON() });
    // this.$el.next().html('');
    this.$el.html(rendered);
  },

// toggle post read or not
  togglePost: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var item_clicked = $(event.currentTarget);
    //you can chain this without making a new variable
    var post_id = item_clicked.attr('id');
    //the collection is the instance of the model
    var post = this.collection.get(post_id);
    var read = post.get('read');
    console.log('post toggled!');

//if read then set properties
    if (read) {
      post.set({ read : false }).save();
    } else {
      post.set({ read : true }).save();
    }
  },

//hide info and list after edit is clicked on
  editPost: function (event) {

    event.preventDefault();
    event.stopPropagation();
    //currentTarget will find the other elements, before you had target, so it target the id but the font icon wasn't being targeted
    //the icon had an id so when you click on it, it becomes blank, so page will break, so if you click on the box you're good to go
    var post_id = $(event.currentTarget).attr('id');

    window.blog_router.navigate('#edit/'+ post_id, {trigger: true});
    //don't use hide here, use it in the actual route, doing it here will cause the backspace to not remember the history
    //don't believe me? use it for yourself thach and you will see :P
     // $('.blogInfo').hide();

  },     

  home: function(event) {
  event.preventDefault();
  event.stopPropagation();
  window.blog_router.navigate("", { trigger: true }); 
  },


  viewPost: function(event) {
    event.preventDefault();
    event.stopPropagation();
    var item_clicked = $(event.currentTarget);
    //you can chain this without making a new variable
    // var post_id = item_clicked.attr('id');
    //the collection is the instance of the model
    var post_id = $(event.target).attr('id');
    window.blog_router.navigate('#post/'+post_id, {trigger: true});

  }


});
