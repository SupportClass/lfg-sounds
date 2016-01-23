'use strict';

module.exports = function(nodecg) {
    if (!nodecg.bundleConfig) {
        throw new Error('[lfg-sounds] No config found in cfg/lfg-sounds.json, aborting!');
    }

    if (!nodecg.bundleConfig.soundNames) {
        throw new Error('[lfg-sounds] No soundNames property present in cfg/lfg-sounds.json, aborting!');
    }

    try {
        require('./watcher')(nodecg);
    } catch (e) {
        nodecg.log.error('Failed to load "watcher" lib:', e.stack);
        process.exit(1);
    }

    try {
        require('./sounds')(nodecg);
    } catch (e) {
        nodecg.log.error('Failed to load "sounds" lib:', e.stack);
        process.exit(1);
    }

    try {
        require('./uploads')(nodecg);
    } catch (e) {
        nodecg.log.error('Failed to load "uploads" lib:', e.stack);
        process.exit(1);
    }
};
