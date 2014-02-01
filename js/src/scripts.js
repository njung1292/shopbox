var SITE = {
	init: function() {
		this.$document = $(window.document);
		this.$body = $('body');
		//this.$el = $('.el');

		this.bindEvents();
		this.objectDetectStuff();
	},

	bindEvents: function() {
		//this.$el.on('click', this.functionName.bind(this));
	},

	functionName: function(e) {
		var $blah = $(e.currentTarget);
		e.preventDefault();
	},

	objectDetectStuff: function() {
		var smoother = new Smoother(0.85, [0, 0, 0, 0, 0]);
		var video = $("#video").get(0);
		try {
			compatibility.getUserMedia({video: true}, function(stream) {
				try {
					video.src = compatibility.URL.createObjectURL(stream);
				} catch (error) {
					video.src = stream;
				}
				video.play();
				compatibility.requestAnimationFrame(tick);
			}, function (error) {
				alert("WebRTC not available");
			});
		} catch (error) {
			alert(error);
		}

		function tick() {
			compatibility.requestAnimationFrame(tick);

			if (video.readyState === video.HAVE_ENOUGH_DATA) {
				$(video).objectdetect("all", {scaleMin: 3, scaleFactor: 1.1, classifier: objectdetect.frontalface}, function(coords) {
					if (coords[0]) {
						coords = smoother.smooth(coords[0]);
						$("#glasses").css({
							"left":    ~~(coords[0] + coords[2] * 1.0/8 + $(video).offset().left) + "px",
							"top":     ~~(coords[1] + coords[3] * 0.8/8 + $(video).offset().top) + "px",
							"width":   ~~(coords[2] * 6/8) + "px",
							"height":  ~~(coords[3] * 6/8) + "px",
							"display": "block"
						});
					} else {
						$("#glasses").css("display", "none");
					}
				});
			}
		}

		$("#list img").click(function () {
			alert('hi');
			$("#glasses").attr("src", $(this).attr("src"));
		});
	}	
}

SITE.init();