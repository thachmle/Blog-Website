var BlogListView = Backbone.View.extend ({

  el: '.blog_list',

  events: {
    'click .toggle' : 'togglePost',
    'click .edit' : 'editPost'
  },

  initialize: function () {
    this.render();
    this.collection.on('change', this.render, this);
  },

  render: function () {
    this.collection.sort();
    var template = Handlebars.compile($('#blog_items').html());
    var rendered = template({ posts : this.collection.toJSON() });
    this.$el.next().html('');
    this.$el.html(rendered);
  },

  togglePost: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var item_clicked = $(event.currentTarget);
    var post_id = item_clicked.attr('id');
    var post = this.collection.get(post_id);
    var read = post.get('read');

    if (read) {
      post.set({ read : false }).save();
    } else {
      post.set({ read : true }).save();
    }
  },

  editPost: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var post_id = $(event.target).attr('id');
    window.blog_router.navigate('#edit/'+ post_id, {trigger: true});
  }

});

