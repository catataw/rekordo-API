/**
 * rekordo.io
 * (c) 2015-2016 luisan00
 * This application is under a (MIT) license.
 * See LICENSE file for more information.
 * 
 */
 var mongoose = require('mongoose');
 var uriDB = require('../../config/config.js').uri;
 var optionsDB = require('../../config/config.js').options;
 var hashModel = require('../model/hash.js').hashModel;

/**
 * 
 * @param uri
 * @param options
 * @param cb
 */ 
exports.connect = function(uri, options, cb){
	 var conn = mongoose.connect(uri, options, function(err){
		 if (err){
			 return cb(err);
			 }
		 else {
			 return cb(conn);
		 }
	 })
 };
 