var SHOP = {
	init: function() {
		this.$document = $(window.document);
		this.$body = $('body');
		this.$shelf = $('#shelf')

		this.initVars();

		this.handPos = SITE.getHandPos();
		this.currentItem = null;

		this.handListener();

	},

	initVars: function() {
		this.tomatoURL = "http://www.ishs.org/sites/default/files/news-images/tomato.jpg";
		this.carrotURL = "http://plus.maths.org/content/sites/plus.maths.org/files/articles/2011/paraconsistency/carrot.jpg";
		this.broccoliURL = "http://publishingperspectives.com/wp-content/uploads/2012/03/broccoli.jpg";
		this.burritoURL = "http://www.tacobell.com/tb_files/cbm/images/burrito-burrito.png";

		this.tomatoIconURL =
		this.carrotIconURL =
		this.broccoliIconURL =
		this.burritoIconURL =
	},

	setCurrentItem: function(_filename, _url, _iconURL, _pos) {
		this.currentItem = {
			filename: _filename,
			url: _url,
			iconURL: _iconURL,
			pos: _pos
		}
		this.$shelf.appendChild('<img src="' + _iconURL + '" class="produce" id="' + _filename + '">');
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
						this.setCurrentItem('Tomato', this.tomatoURL, this.tomatoIconURL, this.handPos);
					} else if (this.handPos.y >= 0 && this.handPos.y > 5) {
						// Carrot!
						this.setCurrentItem('Carrot', this.carrotURL, this.carrotIconURL, this.handPos);
					}
				} else if (this.handPos.x >=0 && this.handPos.x > 5) {
					// Broccoli or burrito
					if (this.handPos.y >= 0 && this.handPos.y <= 5) {
						// Broccoli
						this.setCurrentItem('Broccoli', this.broccoliURL, this.broccoliIconURL, this.handPos);
					} else if (this.handPos.y >= 0 && this.handPos.y > 5) {
						// burrito!
						this.setCurrentItem('Burrito', this.burritoURL, this.burritoIconURL, this.handPos);
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