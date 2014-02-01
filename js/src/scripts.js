var SITE = {
	init: function() {
		this.$document = $(window.document);
		this.$body = $('body');
		//this.$el = $('.el');

		this.bindEvents();
	},

	bindEvents: function() {
		this.$el.on('click', this.functionName.bind(this));
	},

	functionName: function(e) {
		var $blah = $(e.currentTarget);
		e.preventDefault();
	}
}

SITE.init();