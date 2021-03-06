var BlogListView = Backbone.View.extend ({

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

  render: function () {
    this.collection.sort();
    var template = Handlebars.compile($('#blog_items').html());
    var rendered = template({ posts : this.collection.toJSON() });
    this.$el.html(rendered);
  },

// toggle post read or not
  togglePost: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var item_clicked = $(event.currentTarget);
    var post_id = item_clicked.attr('id');
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

  editPost: function (event) {

    event.preventDefault();
    event.stopPropagation();
    var post_id = $(event.currentTarget).attr('id');
    window.blog_router.navigate('#edit/'+ post_id, {trigger: true});

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
    var post_id = $(event.target).attr('id');
    window.blog_router.navigate('#post/'+post_id, {trigger: true});

  }


});
