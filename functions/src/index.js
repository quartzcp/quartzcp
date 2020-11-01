const admin = require('firebase-admin');
admin.initializeApp();

exports.user = require('./user');
exports.server = require('./server');
