'use strict';

const DEFAULT_VOLUME = 30;

module.exports = function (nodecg) {
	// Create defaults array
	const soundDefaults = nodecg.bundleConfig.soundNames.map(soundName => {
		return {
			name: soundName,
			volume: DEFAULT_VOLUME,
			file: null
		};
	});

	// Instantiate replicant with defaults object, which will load if no persisted data is present.
	const sounds = nodecg.Replicant('sounds', {defaultValue: soundDefaults});

	// If any entries in the config aren't present in the replicant,
	// (which could happen when a persisted replicant value is loaded) add them.
	nodecg.bundleConfig.soundNames.forEach(soundName => {
		const exists = sounds.value.some(sound => {
			return sound.name === soundName;
		});

		if (!exists) {
			sounds.value.push({
				name: soundName,
				volume: DEFAULT_VOLUME,
				file: null
			});
		}
	});

	// Likewise, if there are any entries in the replicant that are no longer present in the config, remove them.
	/* eslint-disable no-loop-func */
	for (let i = sounds.value.length - 1; i >= 0; i--) {
		const exists = nodecg.bundleConfig.soundNames.some(soundName => soundName === sounds.value[i].name);
		if (!exists) {
			sounds.value.splice(i, 1);
		}
	}
	/* eslint-enable no-loop-func */
};
