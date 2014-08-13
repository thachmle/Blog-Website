var BlogRouter = Backbone.Router.extend({

  routes: {
    '' : 'main',
    //the ":"" helps backbone to let it know it's a placeholder to look for "id", 
    //dynamic because it is active, the edit down there is active
    'edit/:id' : 'edit',
    'edit2/:id' : 'edit2',
    'post/:id' : 'post'
   },

  initialize: function() {
    this.appView = new App.View();
  },

  main: function () {
    $('.blogInfo').show();
    $('.bgPic').show();
    $('.bgPic2').hide();
    //block for button to log out
    $('.user_info').show();
    if(!App.currentUser) return App.router.navigate('', {trigger: true});
    showUser(App.currentUser);    
    var listView = new BlogListView({ collection: App.blog_list });
        this.appView.showView(listView);
  },

  edit: function (id) {
    $('.blogInfo').hide();
    $('.bgPic').show();
    $('.bgPic2').hide();
    //block for button to logout
    $('.user_info').hide();
    if(!App.currentUser) return App.router.navigate('', {trigger: true});
    showUser(App.currentUser);
    var editView = new BlogEditView({ postid: id,collection: App.blog_list});
        this.appView.showView(editView);
  },

    edit2: function (id) {
    $('.blogInfo').hide();
    $('.bgPic').show();
    $('.bgPic2').hide();
    $('.user_info').hide();
    if(!App.currentUser) return App.router.navigate('', {trigger: true});
    showUser(App.currentUser);
    var editView2 = new BlogEditView2({  postid: id, collection: App.blog_list});
        this.appView.showView(editView2);
  },

  post: function(id) {
    $('.bgPic2').show();
    $('.blogInfo').hide();
    $('.bgPic').hide();
    $('.user_info').hide();
    if(!App.currentUser) return App.router.navigate('', {trigger: true});
    showUser(App.currentUser);
    var postView = new BlogPostView({  postid: id, collection: App.blog_list});
      this.appView.showView(postView);
  }
});

