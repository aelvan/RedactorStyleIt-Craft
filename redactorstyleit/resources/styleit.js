if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.styleit = function () {
	return {
		init: function () {
			try {
				this.opts.styleItJson = jQuery.parseJSON(this.opts.styleItJson);
			} catch (e) {
				
			}
			
			if(typeof this.opts.styleItJson === 'undefined' || !this.opts.styleItJson.length) return;
			
			var that = this;
			var dropdown = {};

			jQuery.each(this.opts.styleItJson, function (i, s) {
				dropdown[s.className] = {
					title: s.btnName, func: function () {
						that.styleit.setCustomFormat(s);
					}
				};
			});

			dropdown['remove-class'] = {
				title: 'Remove', func: function () {
					that.styleit.resetCustomFormat();
				}
			};
			
			var button = this.button.add('styleit', 'Style');
			this.button.addDropdown(button, dropdown);
		},
		
		setCustomFormat: function (s) {
			var that = this;
			
			var sel = this.selection;
			var $selectedElement = $(sel.parent());
			
			if (that.styleit.isAllowedIn($selectedElement.prop("tagName"), s)) {
				$selectedElement.addClass(s.className);
			}
			
			if (sel.blocks() && sel.blocks().length>1) {
				var $blockElement = jQuery(sel.blocks());
				$blockElement.each(function () {
					if (that.styleit.isAllowedIn($(this).prop("tagName"), s)) {
						$(this).addClass(s.className);
					}
				})
			}
		},
		
		resetCustomFormat: function () {
			var that = this;
			
			var sel = this.selection;
			var $selectedElement = $(sel.parent());
			
			jQuery.each(that.opts.styleItJson, function (i, s) {
				$selectedElement.removeClass(s.className);
			});
			
			if (sel.inlines()) {
				var $inlineElement = jQuery(sel.inlines());
				$inlineElement.each(function () {
					var $element = $(this);
					jQuery.each(that.opts.styleItJson, function (i, s) {
						$element.removeClass(s.className);
					});
				})
			}
			
			if (sel.blocks() && sel.blocks().length>1) {
				var $blockElement = jQuery(sel.blocks());
				$blockElement.each(function () {
					var $element = $(this);
					jQuery.each(that.opts.styleItJson, function (i, s) {
						$element.removeClass(s.className);
					});
				})
			}
		},
		
		isAllowedIn: function (elementName, s) {
			if (typeof s.allowedIn === 'undefined') {
				return true;
			}
			
			var el = elementName.toLowerCase();
			var allowed = s.allowedIn.split(',');
			var found = false;
			
			jQuery.each(allowed, function (i, v) {
				if (v.trim()===el) {
					found = true;
				}
			});
			
			return found;
		}
	};
};
