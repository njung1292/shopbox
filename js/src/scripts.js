var SITE = {
	init: function() {
		this.$document = $(window.document);
		this.$body = $('body');
		//this.$el = $('.el');

		this.bindEvents();


		// var videoCamera = new tracking.VideoCamera().render();
		// videoCamera.track({
		//     type: 'color',
		//     color: 'magenta',
		//     onFound: function(track) {
		//       console.log(track.x, track.y, track.z);
		//     },
		//     onNotFound: function() {}
		// });

		var videoCamera = new tracking.VideoCamera().hide().render().renderVideoCanvas(),
		        ctx = videoCamera.canvas.context;

		    videoCamera.track({
		        type: 'human',
		        data: 'eye',
		        onFound: function(track) {
		            for (var i = 0, len = track.length; i < len; i++) {
		                var rect = track[i];
		                ctx.strokeStyle = "rgb(0,255,0)";
		                ctx.strokeRect(rect.x, rect.y, rect.size, rect.size);
		            }
		        }
		    });
	},

	bindEvents: function() {
		//this.$el.on('click', this.functionName.bind(this));
	},

	functionName: function(e) {
		var $blah = $(e.currentTarget);
		e.preventDefault();
	}
}

SITE.init();