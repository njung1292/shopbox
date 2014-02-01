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
		this.tomatoURL = "http://www.ishs.org/sites/default/files/news-images/tomato.jpg";
		this.carrotURL = "http://plus.maths.org/content/sites/plus.maths.org/files/articles/2011/paraconsistency/carrot.jpg";
		this.broccoliURL = "http://publishingperspectives.com/wp-content/uploads/2012/03/broccoli.jpg";
		this.burritoURL = "http://www.tacobell.com/tb_files/cbm/images/burrito-burrito.png";

		// this.tomatoURL = "images/sample.png";
		// this.carrotURL = "images/sample.png";
		// this.broccoliURL = "images/sample.png";
		// this.burritoURL = "images/sample.png";

		this.tomatoIconURL = "images/tomato.svg";
		this.carrotIconURL = "images/carrot.svg";
		this.broccoliIconURL = "images/broccoli.svg";
		this.burritoIconURL = "images/burrito.svg";

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

	onGrab: function() {
		$('.limb').attr('src', this.grabbedLimb);

		var grabbed = false;
		if (this.handPos.x >= 0 && this.handPos.x <= 5) {
			// Tomato or carrot
			if (this.handPos.y >= 0 && this.handPos.y <= 5) {
				// Tomato
				this.setCurrentItem('tomato', this.tomatoURL, this.tomatoIconURL, this.handPos);
				grabbed = true;
			} else if (this.handPos.y >= 0 && this.handPos.y > 5) {
				// Carrot!
				this.setCurrentItem('carrot', this.carrotURL, this.carrotIconURL, this.handPos);
				grabbed = true;
			}
		} else if (this.handPos.x >=0 && this.handPos.x > 5) {
			// Broccoli or burrito
			if (this.handPos.y >= 0 && this.handPos.y <= 5) {
				// Broccoli
				this.setCurrentItem('broccoli', this.broccoliURL, this.broccoliIconURL, this.handPos);
				grabbed = true;
			} else if (this.handPos.y >= 0 && this.handPos.y > 5) {
				// burrito!
				this.setCurrentItem('burrito', this.burritoURL, this.burritoIconURL, this.handPos);
				grabbed = true;
			}
		}
		
	},

	onUngrab: function() {
		$('.limb').attr('src', this.ungrabbedLimb);
		// Release
		if (this.currentItem) {
			// if (this.handPos.x >= 0 && this.handPos.x <= 5) {
			// 	if (this.handPos.y >= 0 && this.handPos.y <= 5) {
					console.log('droppin');
					this.cart.files.push({
						url: this.currentItem.url,
						filename: this.currentItem.filename  + this.itemCount
					});
					this.itemCount++;
					//this.$body.trigger('click');
					//this.saveToDropbox();
					//this.$shelf.html('');
			// 	}
			// }
		}
		this.currentItem = null;
	},

	saveToDropbox: function() {
		if (this.cart.files.length > 0) {
			Dropbox.save(this.cart);
		}
	}
}

SHOP.init();