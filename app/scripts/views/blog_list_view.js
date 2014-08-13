var BlogListView = Backbone.View.extend ({

  events: {
    'click .toggle' : 'togglePost',
    'click .edit' : 'editPost',
    'click .fa fa-camera-retro' : 'home',
    'click .box-header' : 'viewPost'
  },

  initialize: function () {
    var self = this;
    App.blog_list = new BlogCollection();
    App.blog_list.query = new Parse.Query(Blog);
    App.blog_list.comparator = function(object){
      return object.get("read");
    };
    App.blog_list.query.equalTo('user', App.currentUser);
    App.blog_list.on('change', this.render, this); // This watches my collection for when I update a whiskey
    App.blog_list.on('add', this.render, this); // This watches my collection for when I add a whiskey
    App.blog_list.fetch().done( function () {
      self.render();
  });
},

  render: function () {
    App.blog_list.sort();
    var template = Handlebars.compile($('#blog_items').html());
    var rendered = template({ posts : App.blog_list.toJSON() });
    this.$el.html(rendered);
  },

// toggle post read or not
  togglePost: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var item_clicked = $(event.currentTarget);
    var post_id = item_clicked.attr('id');
    var post = App.blog_list.get(post_id);
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
    App.router.navigate('#edit/'+ post_id, {trigger: true});

  },     

  home: function(event) {
  event.preventDefault();
  event.stopPropagation();
  App.router.navigate("", { trigger: true }); 
  },

  viewPost: function(event) {
    event.preventDefault();
    event.stopPropagation();
    var item_clicked = $(event.currentTarget);
    var post_id = $(event.target).attr('id');
    App.router.navigate('#post/'+post_id, {trigger: true});

  }

});
