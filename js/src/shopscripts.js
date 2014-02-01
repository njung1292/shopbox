var SHOP = {
	init: function() {
		SITE.init();
		this.$document = $(window.document);
		this.$body = $('body');
		this.$shelf = $('#shelf');
		this.$checkoutButton = $('#checkout');
		this.$wrapper = $('.wrapper');
		console.log(this.$shelf);

		this.initVars();
		this.currentItem = null;
		this.bindEvents();

		this.tick();

	},

	tick: function() {
		var width = window.innerWidth;//500; // range of motion
		var height = window.innerHeight;//400;
		requestAnimationFrame(this.tick.bind(this));
		this.handPos = SITE.getHandPos(width, height);
		if (!this.handPos) {
			return;
		}
		if (this.currentItem) {
			this.currentItem.pos = this.handPos;
			$('#' + this.currentItem.filename + this.itemCount).css({ 'left': this.handPos.x + 'px', 'top': this.handPos.y + 'px' });
		}
		$('.limb').css({ 'left': this.handPos.x + 'px', 'top': this.handPos.y + 'px' });
	},

	initVars: function() {
		this.photos = {
			tomato: "http://www.ishs.org/sites/default/files/news-images/tomato.jpg",
			carrot: "http://plus.maths.org/content/sites/plus.maths.org/files/articles/2011/paraconsistency/carrot.jpg",
			broccoli: "http://publishingperspectives.com/wp-content/uploads/2012/03/broccoli.jpg",
			burrito: "http://www.tacobell.com/tb_files/cbm/images/burrito-burrito.png"
		};

		this.icons = {
			tomato: "images/tomato.svg",
			carrot: "images/carrot.svg",
			broccoli: "images/broccoli.svg",
			burrito: "images/burrito.svg",
		};

		this.grabbedLimb = "images/openhand.svg";
		this.ungrabbedLimb = "images/openhand.svg";
		this.$body.append('<img src="' + this.ungrabbedLimb + '" class="limb' +'" id="' + 'hand' + '">');

		this.cart = {
			files: []
		};

		this.itemCount = 0;
	},

	bindEvents: function() {
		console.log(SITE);
		SITE.setGrabCallbacks(this.onGrab.bind(this), this.onUngrab.bind(this));
		this.$checkoutButton.on('click', this.saveToDropbox.bind(this));
	},

	setCurrentItem: function(_filename, _url, _iconURL, _pos) {
		this.currentItem = {
			filename: _filename,
			url: _url,
			iconURL: _iconURL,
			pos: _pos
		};

		this.$body.append('<img src="' + _iconURL + '" class="produce ' + _filename +'" id="' + _filename + this.itemCount + '">');
	},

	getProduce: function (pos) {
		var s = $('#shelf');
		var cx = s.position().left + s.width()/2; //window.innerWidth - ($('#shelf').position.right() + $('#shelf').width()/2);//300; // center coords of shelves
		var cy = s.position().top + s.height()/2;//$('#shelf').css('top') + $('#shelf').css('height')/2;
		var r = s.width()/2;//$('#shelf').css('width')/2;///300; // radius of shelves

		// alert('innerWidth: ' + window.innerWidth);
		// alert('innerHeight: ' + window.innerHeight);
		console.log('cx: ', cx);
		console.log('cy: ', cy);
		console.log('r: ', r);
		//alert($('.shelf').css('top'));

		var x = pos.x - cx;
		var y = pos.y - cy;
		// in bounds
		if (-r < x && x < r && -r < y && y < r) {
			return (x > 0 && y > 0) ? 'burrito'
				: (x > 0 && y < 0) ? 'broccoli'
				: (x < 0 && y > 0) ? 'carrot'
				: (x < 0 && y < 0) ? 'tomato'
				: null;
		}
		return null;
	},

	onGrab: function() {
		$('.limb').attr('src', this.grabbedLimb);
		var produce = this.getProduce(this.handPos);
		if (produce) {
			this.setCurrentItem(produce, getVeggie(produce), this.icons[produce], this.handPos);
		}
	},

	onUngrab: function() {
		$('.limb').attr('src', this.ungrabbedLimb);
		// Release
		if (this.currentItem) {
			if (this.handInCart(this.handPos)) {
				console.log('droppin');
				this.cart.files.push({
					url: this.currentItem.url,
					filename: this.currentItem.filename  + this.itemCount
				});
				$('#' + this.currentItem.filename + this.itemCount).addClass('shrink');
				this.itemCount++;
			} 

			// else { // remove currently grabbing porduce
			// 	$('#' + this.currentItem.filename + this.itemCount).remove();
			// }
		}
		this.currentItem = null;
	},

	handInCart: function(pos) {
		var cart = $('#cart');
		var x = cart.position().left; // top left coords of cart
		var y = cart.position().top;
		var h = cart.height(); // length,width
		var w = cart.width();
		return pos.x > x && pos.x < x + w && pos.y > y && pos.y < y + h;
	},

	saveToDropbox: function() {
		if (this.cart.files.length > 0) {
			Dropbox.save(this.cart);
		}
	}
}

SHOP.init();