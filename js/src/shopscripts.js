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
		requestAnimationFrame(this.tick.bind(this));
		this.handPos = SITE.getHandPos();
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

		this.grabbedLimb = "images/carrot.svg";
		this.ungrabbedLimb = "images/tomato.svg";
		this.$shelf.append('<img src="' + this.ungrabbedLimb + '" class="limb' +'" id="' + 'hand' + '">');

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

		this.$shelf.append('<img src="' + _iconURL + '" class="produce ' + _filename +'" id="' + _filename + this.itemCount + '">');
	},

	getProduce: function (pos) {
		var cx = 300; // center coords of shelves
		var cy = 300;
		var r = 300;
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
		this.setCurrentItem('carrot', this.photos[produce], this.icons[produce], this.handPos);
	},

	onUngrab: function() {
		$('.limb').attr('src', this.ungrabbedLimb);
		// Release
		if (this.currentItem && this.handInCart(this.handPos)) {
			console.log('droppin');
			this.cart.files.push({
				url: this.currentItem.url,
				filename: this.currentItem.filename  + this.itemCount
			});
			this.itemCount++;
		}
		this.currentItem = null;
	},

	handInCart: function(pos) {
		var x = 600; // top left coords of cart
		var y = 500;
		var l = 100; // length,width
		var w = 100;
		return pos.x > x && pos.x < x + w && pos.y > y && pos.y < y + w;
	},

	saveToDropbox: function() {
		if (this.cart.files.length > 0) {
			Dropbox.save(this.cart);
		}
	}
}

SHOP.init();