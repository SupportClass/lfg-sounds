(function () {
	'use strict';

	// Find first ancestor of el with tagName, or undefined if not found
	function upTo(el, tagName) {
		tagName = tagName.toLowerCase();

		while (el && el.parentNode) {
			el = el.parentNode;
			if (el.tagName && el.tagName.toLowerCase() === tagName) {
				return el;
			}
		}

		return null;
	}

	Polymer({
		is: 'lfg-soundpanel',
		properties: {
			bundle: {
				type: String,
				observer: 'bundleChanged'
			}
		},

		/*
		 * Lifecycle
		 */

		ready() {
			const self = this;
			const soundsRep = NodeCG.Replicant('sounds', 'lfg-sounds');
			soundsRep.on('change', (oldVal, newVal) => {
				// If there is an existing <lfg-soundpanel-sound> element for this sound, edit that.
				// Otherwise, make a new one and add it to the DOM.
				newVal.forEach(sound => {
					const existingEl = self.$$(`lfg-soundpanel-sound[name="${sound.name}"]`);
					if (existingEl) {
						existingEl.volume = sound.volume;
						existingEl.file = sound.file;
					} else {
						const newEl = document.createElement('lfg-soundpanel-sound');
						newEl.name = sound.name;
						newEl.volume = sound.volume;
						newEl.file = sound.file;
						Polymer.dom(self.root).appendChild(newEl);
					}
				});

				// If there is an element for a sound that no longer exists, remove it.
				Polymer.dom(self.root).querySelectorAll('lfg-soundpanel-sound').forEach(el => {
					const foundCorrespondingSound = newVal.some(sound => {
						return sound.name === el.name;
					});

					if (!foundCorrespondingSound) {
						Polymer.dom(self.root).removeChild(el);
					}
				});
			});

			this.addEventListener('change', e => {
				const soundEl = upTo(e.target, 'lfg-soundpanel-sound');

				// Update the replicant with the new volume and file
				soundsRep.value.some((sound, idx) => {
					if (sound.name === soundEl.name) {
						soundsRep.value[idx].volume = soundEl.volume;
						soundsRep.value[idx].file = soundEl.file;
						return true;
					}

					return false;
				});
			});
		}
	});
})();
