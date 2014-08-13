var Blog = Parse.Object.extend({

className: "Blog",

  validate: function (attrs) {
    if (!attrs.name) {
      return 'Please enter a Whiskey name!';
    }
    if(!attrs.description){
      return 'Please enter a Whiskey description!';
    }
  },

  idAttribute: 'objectId',

  defaults: {
    name: '',
    description: '',
    author: '',
    tags: [],
    read: false 
  }

});

var BlogCollection = Parse.Collection.extend ({
  model: Blog,
  // url: 'http://tiy-atl-fe-server.herokuapp.com/collections/thachmle',
});
