/**
 * 
 * rekordo.io
 * (c) 2015-2016 luisan00
 * This application is under a (MIT) license.
 * See LICENSE file for more information.
 * 
 * Hash Schema.
 */
var mongoose = require('mongoose');

var hashSchema = new mongoose.Schema({
	hash : { type : String },
	dateOrder : { type : Date },
	prvKey : { type : String },
	amount : { type : Number, default: 300000 },
	amountPaid : { type : Number, default: 0 },
	datePaid : { type : Date, default: null },
	status : { type : Number, default: 0 },
	block : { type : String, default: null },
	txid : { type : String, default: null },
	error: { type : String, default: null }
});

exports.hashModel = mongoose.model('hash', hashSchema);
