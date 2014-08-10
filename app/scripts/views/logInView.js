var LoggedInView = Backbone.View.extend ({

	el: '.user_info',
	events: {
			'click button' : 'logout'
	},

	initialize: function(user) {
		this.user = user;
		this.render();
	},

	render: function() {
		// this.$el.html(this.user.get('username') + ' , this cool guy is logged in! <h1>hellow terry, the  man</h1> <button class="b2">AnotherLog</button><button>Logout</button>')
		// this.$el.html(this.user.get('username')
			this.$el.html('<button class="b1 pulse"></button>');
			$('.form_container').hide();
			$('.infoContainer').show();
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

		