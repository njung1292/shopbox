var SHOP = {
	init: function() {
		this.$document = $(window.document);
		this.$body = $('body');
		this.$shelf = $('#shelf')

		this.initVars();

		this.handPos = SITE.getHandPos();
		this.currentItem;

		this.handListener();

	},

	initVars: function() {
		tomatoURL = "http://www.ishs.org/sites/default/files/news-images/tomato.jpg";
		carrotURL = "http://plus.maths.org/content/sites/plus.maths.org/files/articles/2011/paraconsistency/carrot.jpg";
		broccoliURL = "http://publishingperspectives.com/wp-content/uploads/2012/03/broccoli.jpg";
		burritoURL = "http://www.tacobell.com/tb_files/cbm/images/burrito-burrito.png";
	},

	setCurrentItem: function(_filename, _url, _pos) {
		this.currentItem = {
			filename: _filename,
			url: _url,
			pos: _pos
		}
		this.$shelf.appendChild('<img src="' + _url + '" class="produce" id="' + _filename + '">');
	},

	handListener: function() {
		while (SITE.isGrabbed()) {
			if (this.currentItem) {
				// Move
				this.currentItem.pos = this.handPos;
				$('#' + this.currentItem.filename).css({ 'left': this.handPos.x + 'px', 'top': this.handPos.y + 'px' });
			} else {
				// Pick up
				if (this.handPos.x >= 0 && this.handPos.x <= 5) {
					// Tomato or carrot
					if (this.handPos.y >= 0 && this.handPos.y <= 5) {
						// Tomato
						this.setCurrentItem('Tomato', tomatoURL, this.handPos);
					} else if (this.handPos.y >= 0 && this.handPos.y > 5) {
						// Carrot!
						this.setCurrentItem('Carrot', carrotURL, this.handPos);
					}
				} else if (this.handPos.x >=0 && this.handPos.x > 5) {
					// Broccoli or burrito
					if (this.handPos.y >= 0 && this.handPos.y <= 5) {
						// Broccoli
						this.setCurrentItem('Broccoli', broccoliURL, this.handPos);
					} else if (this.handPos.y >= 0 && this.handPos.y > 5) {
						// burrito!
						this.setCurrentItem('burrito', burritoURL, this.handPos);
					}
				}
			}
		}

		// Release
		if (this.currentItem) {
			Dropbox.save(this.currentItem.url, this.currentItem.filename);
			this.currentItem = null;
			this.$shelf.html('');
		}
		this.handListener();
	}
}

SHOP.init();