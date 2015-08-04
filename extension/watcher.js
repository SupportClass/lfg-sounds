'use strict';

var debounce = require('debounce');
var chokidar = require('chokidar');
var path = require('path');
var fs = require('fs');
var FILES_PATH = path.resolve(__dirname, '../sounds');
var BASE_URL = '/lfg-sounds/';
var ALLOWED_EXTS = [
    '.mp3',
    '.ogg'
];

module.exports = function(nodecg) {
    var files = nodecg.Replicant('files');

    var watcher = chokidar.watch([
        FILES_PATH + '/*.mp3',
        FILES_PATH + '/*.ogg'
    ],{
        ignored: /[\/\\]\./,
        persistent: true,
        ignoreInitial: true,
        usePolling: true // Non-polling is really buggy for us right now.
    });

    watcher.on('add', debounce(reloadFiles, 500));
    watcher.on('change', debounce(reloadFiles, 500));
    watcher.on('unlink', debounce(reloadFiles, 500));
    watcher.on('error', function(e) {
        nodecg.error(e.stack);
    });


    // Initialize
    reloadFiles();

    // On changed/added/deleted
    function reloadFiles(filename) {
        if (filename) {
            nodecg.log.info('Sound file "%s" changed, reloading all sound files...', filename);
        }

        // Array with URLs to all the files
        var fileUrls = [];

        // Scan the images dir
        var imagesDir = fs.readdirSync(FILES_PATH);
        imagesDir.forEach(function(file) {
            if (extAllowed(path.extname(file))) {
                // Add the route to this file
                fileUrls.push({
                    url: BASE_URL + file,
                    filename: file,
                    extension: path.extname(file)
                });
            }
        });

        // Overwrite the replicant
        files.value = fileUrls;
    }
};

function extAllowed(ext) {
    return ALLOWED_EXTS.indexOf(ext) >= 0;
}
