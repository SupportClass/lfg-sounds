'use strict';

var express        = require('express');
var app            = express();
var multer         = require('multer');
var path           = require('path');
var upload         = multer({
    dest: 'sounds/',
    storage: multer.diskStorage({
        destination: path.join(__dirname, './sounds'),
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});

module.exports = function(nodecg) {
    // When a POST is made to /lfg-sounds/upload...
    app.put('/lfg-sounds/upload',

        // Check if the user is authorized
        nodecg.util.authCheck,

        // Then receive the files they are sending, up to a max of 16
        upload.array('file', 16),

        // Then send a response.
        function (req, res) {
            if (req.files) {
                res.status(200).send('Success');
            } else {
                res.status(400).send('Bad Request');
            }
        }
    );

    nodecg.mount(app);
};
