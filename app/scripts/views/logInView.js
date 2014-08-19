var LoggedInView = Backbone.View.extend ({

	el: '.user_info',

events: {

		'click .b1' : 'logout'
},

initialize: function(user) {
	this.user = user;
	this.render();
},

render: function() {
		console.log(this.user);
		this.$el.html();
		$('.form_container').hide();
		$('.infoContainer').show();
		$('.b1').show();
},

logout: function (event) {
	event.preventDefault();
	Parse.User.logOut();
	$('.form_container').show();
	this.$el.empty();
	$('.input').show();
	  $('.infoContainer').hide();
}


	
});

		