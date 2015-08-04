'use strict';

var DEFAULT_VOLUME = 30;

module.exports = function(nodecg) {
    // Create defaults array
    var soundDefaults = nodecg.bundleConfig.soundNames.map(function(soundName) {
        return {
            name: soundName,
            volume: DEFAULT_VOLUME,
            file: null
        };
    });

    // Instantiate replicant with defaults object, which will load if no persisted data is present.
    var sounds = nodecg.Replicant('sounds', {defaultValue: soundDefaults});

    // If any entries in the config aren't present in the replicant,
    // (which could happen when a persisted replicant value is loaded) add them.
    nodecg.bundleConfig.soundNames.forEach(function(soundName, index){
        var exists = sounds.value.some(function(sound) {
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
};
