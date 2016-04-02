/* global createjs */
(function () {
	'use strict';

	const soundsRep = NodeCG.Replicant('sounds', 'lfg-sounds');
	soundsRep.on('change', (oldVal, newVal) => {
		registerSounds(newVal);
	});

	window.lfgSound = {
		/**
		 * Create a new instance of a sound.
		 * @param {string} soundname - The name of the soundfile to play.
		 */
		play(soundname) {
			// Create an instance of the sound, which begins playing immediately.
			const instance = createjs.Sound.play(soundname);

			// Set the volume
			soundsRep.value.some(sound => {
				if (sound.name === soundname) {
					instance.volume = sound.volume / 100;
					instance.pan = 0.0001;
					return true;
				}

				return false;
			});

			return instance;
		},

		/**
		 * Stops all currently playing sounds.
		 */
		stop() {
			createjs.Sound.stop();
		}
	};

	// When any of the sound files change, remove and re-register all sounds.
	// This will stop any currently playing sounds.
	window.lfgSound.ready = false;
	NodeCG.Replicant('files', 'lfg-sounds')
		.on('change', () => {
			createjs.Sound.removeAllSounds();
			registerSounds(soundsRep.value);

			if (!window.lfgSound.ready) {
				window.lfgSound.ready = true;
				document.dispatchEvent(new CustomEvent('lfgSoundsReady'));
			}
		});

	function registerSounds(sounds) {
		const manifest = [];
		sounds.forEach(sound => {
			if (sound.file) {
				manifest.push({
					id: sound.name,
					src: sound.file,
					data: {channels: 100}
				});
			}
		});

		createjs.Sound.registerSounds({
			path: '/uploads/lfg-sounds/',
			manifest
		});
	}
})();
