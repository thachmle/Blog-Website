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
		$('.form_container').hide();
		$('.infoContainer').show();
		$('.b1').show();
		$('.user_info').show();
		console.log(this.user);
		this.$el.html();
},

logout: function(event) {
	event.preventDefault();
	Parse.User.logOut();
	$('.form_container').show();
	this.$el.empty();
	$('.input').show();
	$('.infoContainer').hide();
	App.router.navigate("", { trigger: true }); 
}
	
});

		