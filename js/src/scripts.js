var TRACKER = function(tickCallback){
	this.tickCallback = tickCallback;
};

TRACKER.prototype.start = function() {
  var that = this;

  this.tracker = new HT.Tracker();

  this.cbxHull = document.getElementById("cbxHull");
  this.cbxDefects = document.getElementById("cbxDefects");
  this.cbxSkin = document.getElementById("cbxSkin");

  this.video = document.getElementById("video");
  this.canvas = document.getElementById("canvas");
  this.context = this.canvas.getContext("2d");

  this.canvas.width = parseInt(this.canvas.style.width);
  this.canvas.height = parseInt(this.canvas.style.height);
  
  this.image = this.context.createImageData(
	this.canvas.width * 0.2, this.canvas.height * 0.2);
  
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  if (navigator.getUserMedia){
	navigator.getUserMedia({video: true},
	  function(stream){ return that.videoReady(stream); },
	  function(error){ return that.videoError(error); } );
  }
};

TRACKER.prototype.videoReady = function(stream){
  if (window.webkitURL) {
	this.video.src = window.webkitURL.createObjectURL(stream);
  } else if (video.mozSrcObject !== undefined) {
	this.video.mozSrcObject = stream;
  } else {
	this.video.src = stream;
  }
  this.context.translate(this.canvas.width, 0);
  this.context.scale(-1, 1);
  this.tick();
};
  
TRACKER.prototype.videoError = function(error){
};

TRACKER.prototype.tick = function(){
	requestAnimationFrame(this.tick.bind(this));	
  
  if (this.video.readyState === this.video.HAVE_ENOUGH_DATA){
	var image = this.snapshot();
	
	var candidate = this.tracker.detect(image);
	if (candidate) {
		var box = this.getBox(candidate);
  		this.tickCallback(box);
  		// this.drawHull(box, "blue");
	}
	this.draw(candidate);
  }
};

TRACKER.prototype.getBox = function(candidate){
	var hull = candidate.hull;
	var xmin = 99999999; // this should be big enough
	var ymin = xmin;
	var xmax = -1;
	var ymax = xmax;
	hull.forEach(function(cor){
		xmin = cor.x < xmin ? cor.x : xmin;
		xmax = cor.x > xmax ? cor.x : xmax;
		ymin = cor.y < ymin ? cor.y : ymin;
		ymax = cor.y > ymax ? cor.y : ymax;
	});
	return [{x: xmin, y: ymin},{x: xmax, y: ymax}];
};

TRACKER.prototype.snapshot = function(){
  this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
  return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
};

TRACKER.prototype.draw = function(candidate){
  if (candidate){

  	this.drawHull(candidate.contour, "yellow");

	// if (this.cbxHull.checked){
	  this.drawHull(candidate.hull, "red");
	// }
	
	// if (this.cbxDefects.checked){
	//   this.drawDefects(candidate.defects, "blue");
	// }
  }
  
  // if (this.cbxSkin.checked){
	this.context.putImageData(
	  this.createImage(this.tracker.mask, this.image), 
	  this.canvas.width - this.image.width,
	  this.canvas.height - this.image.height);
  // }
};

TRACKER.prototype.drawHull = function(hull, color){
  var len = hull.length, i = 1;

  if (len > 0){
	this.context.beginPath();
	this.context.lineWidth = 3;
	this.context.strokeStyle = color;

	this.context.moveTo(this.canvas.width - hull[0].x, hull[0].y);
	for (; i < len; ++ i){
	  this.context.lineTo(this.canvas.width - hull[i].x, hull[i].y);
	}

	this.context.stroke();
	this.context.closePath();
  }
};

TRACKER.prototype.drawDefects = function(defects, color){
  var len = defects.length, i = 0, point;

  if (len > 0){
	this.context.beginPath();
	this.context.lineWidth = 3;
	this.context.strokeStyle = color;

	for (; i < len; ++ i){
	  point = defects[i].depthPoint;
	  this.context.strokeRect(this.canvas.width - point.x - 4, point.y - 4, 8, 8);
	}

	this.context.stroke();
	this.context.closePath();
  }
};

TRACKER.prototype.createImage = function(imageSrc, imageDst){
  var src = imageSrc.data, dst = imageDst.data,
	  width = imageSrc.width, span = 4 * width,
	  len = src.length, i = 0, j = 0, k = 0;
  
  for(i = 0; i < len; i += span){
  
	for(j = 0; j < width; j += 5){
	
	  dst[k] = dst[k + 1] = dst[k + 2] = src[i];
	  dst[k + 3] = 255;
	  k += 4;
	  
	  i += 5;
	}
  }
  
  return imageDst;
};

// first order diffeq: y[n] = ax[n] + bx[n-1] + cy[n-1]
var DIFFEQ = function (a, b, c, init) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.y = init;
	this.xOld = init;
	this.yOld = init;
};

DIFFEQ.prototype.step = function(x) {
	this.yOld = this.y;
	this.y = this.a * x + this.b * this.xOld + this.c * this.yOld;
	this.xOld = x;
	// console.log("stepped to: " + this.y);
};

DIFFEQ.prototype.val = function() {
	return this.y;
}

var SITE = {
	// handPos_x: null,
	// handPos_y: null,
	// width_LP: null, // low-passed
	// width_DT: null, // derivative of low-pass
	// width_AVG: null, // lower-pass of low-pass
	// grab: false,

	// onGrab: function(){},
	// onUngrab: function(){},

	init: function() {
		this.$document = $(window.document);
		this.$body = $('body');

		this.bindEvents();

		var LP_coeff = 0.6;
		var POS_coeff = 0.1;
		var AVG_coeff = 0.1;
		var LP_init = 300; // arbitrary
		this.handPos_x =  new DIFFEQ(POS_coeff, 0, 1 - POS_coeff, LP_init);
		this.handPos_y =  new DIFFEQ(POS_coeff, 0, 1 - POS_coeff, LP_init);
		this.width_LP = new DIFFEQ(LP_coeff, 0, 1 - LP_coeff, LP_init);
		this.width_DT = new DIFFEQ(1, -1, 0, 0);
		this.width_AVG = new DIFFEQ(AVG_coeff, 0, 1 - AVG_coeff, LP_init);

		var that = this;
		window.onload = function(){
			that.tracker = new TRACKER(that.updateBox.bind(that));
			that.tracker.start();
		};
	},

	updateBox: function (box) {
		this.handPos_x.step((box[0].x + box[1].x)/2);
		this.handPos_y.step((box[0].y + box[1].y)/2);
		// console.log((box[0].x + box[1].x)/2);
		var width = box[1].x - box[0].x;
		// console.log("width: " + width);
		this.width_LP.step(width);
		this.width_DT.step(this.width_LP.val());
		this.width_AVG.step(this.width_LP.val());
		this.updateGrab(this.width_DT.val(), this.width_AVG.val());

		// this.tracker.drawDefects([{x: this.handPos_x.val(),
		// 	y: this.handPos_y.val()}], "blue");
	},

	updateGrab: function(dt, avg) {
		var grabThresh = 0.15;
		var ungrabThresh = 0.15;
		if (dt > ungrabThresh * avg && this.grab) {
			if (this.onUngrab) {
				this.onUngrab();
			}
			console.log("UNGRAB");
			this.grab = false;
		}
		if (dt < -1 * ungrabThresh * avg && !this.grab) {
			if (this.onGrab) {
				this.onGrab();
			}
			console.log("GRAB");
			this.grab = true;
		}
	},

	setGrabCallbacks: function(onGrab, onUngrab) {
		this.onGrab = onGrab;
		this.onUngrab = onUngrab;
	},

	bindEvents: function() {
		// this.$body.on('click', (function(){console.log(this.getHandPos());}).bind(this));
	},

	// x is from 0 to w, y is from 0 to h
	getHandPos: function(w, h) {
		if (!this.tracker) {
			return null;
		}
		return {x: w * this.handPos_x.val() / this.tracker.canvas.width,
			y: h * this.handPos_y.val() / this.tracker.canvas.height};
	},

	isGrabbed: function() {
		return this.grab;
	},

	functionName: function(e) {
		var $blah = $(e.currentTarget);
		e.preventDefault();
	}
}

//SITE.init();
