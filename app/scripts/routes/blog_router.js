var BlogRouter = Backbone.Router.extend({

  routes: {
    '' : 'main',
    //the ":"" helps backbone to let it know it's a placeholder to look for "id", 
    //dynamic because it is active, the edit down there is active
    'edit/:id' : 'edit',
    'edit2/:id' : 'edit2',
    'post/:id' : 'post',
  },

  initialize: function() {
    this.appView = new AppView();
  },

  main: function () {
      
        $('.user_info').show();
        $('.blogInfo').show();
        $('.bgPic').show();
        $('.bgPic2').hide();

    var listView = new BlogListView({ collection: blog_list });
        this.appView.showView(listView);
  },

  edit: function (id) {
    $('.blogInfo').hide();
    $('.bgPic').show();
    $('.bgPic2').hide();
    $('.user_info').hide();
    var editView = new BlogEditView({  postid: id, collection: blog_list});
        this.appView.showView(editView);
  },

    edit2: function (id) {
    $('.blogInfo').hide();
    $('.bgPic').show();
    $('.bgPic2').hide();
    $('.user_info').hide();
    var editView2 = new BlogEditView2({  postid: id, collection: blog_list});
        this.appView.showView(editView2);
  },

  post: function(id) {
    $('.bgPic2').show();
    $('.blogInfo').hide();
    $('.bgPic').hide();
    $('.user_info').hide();
    var postView = new BlogPostView({  postid: id,  collection: blog_list});
      this.appView.showView(postView);
  }


});

