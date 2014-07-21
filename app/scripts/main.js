// Create an instance of  Collection
var blog_list = new BlogCollection();

//get all data and creating a new view
blog_list.fetch().done( function (){
  // Define Global Router && Start History
  window.blog_router = new BlogRouter();
  Backbone.history.start();
});


// Submit Form
// create a new Blog and adding it to collection, title,desc,tags
$('#newBlog').on('submit', function (event) {

  event.preventDefault();

  var temp_blog = new Blog({
    name: $('.blog_title').val(),
    description: $('.blog_desc').val(),
    author: $('.blog_author').val(),
    tags: $('.blog_tags').val()
  });

  blog_list.add(temp_blog).save();

  $(this).trigger('reset');

});