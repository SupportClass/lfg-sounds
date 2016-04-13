'use strict';

const app = require('express')();
const path = require('path');

module.exports = function (nodecg) {
	if (!nodecg.bundleConfig) {
		throw new Error('[lfg-sounds] No config found in cfg/lfg-sounds.json, aborting!');
	}

	if (!nodecg.bundleConfig.soundNames) {
		throw new Error('[lfg-sounds] No soundNames property present in cfg/lfg-sounds.json, aborting!');
	}

	try {
		require('./sounds')(nodecg);
	} catch (e) {
		nodecg.log.error('Failed to load "sounds" lib:', e.stack);
		process.exit(1);
	}

	app.get('/lfg-sounds/player', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client/lfg-soundplayer.html'));
	});

	app.get('/lfg-sounds/lfg-soundplayer.js', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client/lfg-soundplayer.js'));
	});

	app.get('/lfg-sounds/soundjs.min.js', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client/soundjs.min.js'));
	});

	nodecg.mount(app);
};
