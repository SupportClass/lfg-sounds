(function () {
	'use strict';

	Polymer({
		is: 'lfg-soundpanel-sound',
		properties: {
			name: {
				type: String,
				reflectToAttribute: true
			},
			volume: {
				type: Number
			},
			file: {
				type: String,
				observer: '_fileChanged'
			}
		},

		_fileChanged(newVal) {
			this.$.select.value = newVal;
		},

		ready() {
			const self = this;
			const files = NodeCG.Replicant('uploads', 'lfg-sounds');
			files.on('change', (oldVal, newVal) => {
				// Remove all options from the select element
				while (self.$.select.item(1)) {
					self.$.select.remove(1);
				}

				// For each file, add an option
				newVal.forEach(file => {
					const option = document.createElement('option');
					option.name = file.base;
					option.value = file.base;
					option.innerText = file.base;
					if (file.base === self.file) {
						option.setAttribute('selected', true);
					}
					self.$.select.add(option);
				});
			});
		},

		toggle() {
			this.$.collapse.toggle();
		},

		_onSelectChange(e) {
			this.file = e.target.value;
		},

		_handlePlayStopTap() {
			if (this._playingSound) {
				this._soundInstance.stop();
				this._handleStop();
			} else {
				this._playingSound = true;
				this._soundInstance = window.lfgSound.play(this.name);
				this._soundInstance.on('complete', this._handleStop.bind(this));
				this.$.playStop.icon = 'av:stop';
				this.$.playStop.classList.add('playing');
			}
		},

		_handleStop() {
			this._playingSound = false;
			this.$.playStop.icon = 'av:play-arrow';
			this.$.playStop.classList.remove('playing');
		}
	});
})();
