/**
 * rekordo.io
 * (c) 2015 luisan00
 * This application is under a (MIT) license.
 * See LICENSE file for more information.
 * 
 */
 var mongoose = require('mongoose');
 var config = require('../../config/config.js'); 
 var uriDB = config.uri;
 var optionsDB = config.options;
 var hashModel = require('../model/hash.js').hashModel;
 var btc = require('../../btcTools/getPair').getPairSync;
 
 function connect(uri, options, cb){
	 var conn = mongoose.connect(uri, options, function(err){
		 if (err){
			 return cb(err);
			 }
		 else {
			 return cb(conn);
		 }
	 })
 }
 
connect(uriDB, optionsDB, function(res){
	 if (res){
		 console.log('[OK] connected to mongodb server to: %s', uriDB)
		 }
	 else {
		 console.log('[ERROR] connecting to mongodb server to: %s', uriDB)
	 }
 });
 
 /**
  * @param txid
  * @param callback
  */
 function findTx(txid, callback){
	hashModel.findOne({'txid': txid}, {},
			function(err, data){
		// if transaction exist in the system return row, if not return null
		if (data){
			callback(data);
			}
		else {
			callback(null);
		}
	})
};

 /**
  * @param hash : this hash, string type, will be searched in the database.
  * @param callback : callback function can return @data if the record exist or @null if not fount.
  */
function findHash(hash, callback){
	hashModel.findOne({ 'hash': hash },{},
			function(err, data) {
		if (data){
			callback(data);
			}
		else {
			callback(null);
		}	
	});
};

/** 
 * Insert a new hash in hashes collection.
 * @param uploadedHash :
 * @param callback : 
  */
function insertNewHash(uploadedHash, callback) {
	var document = new hashModel({
				hash : uploadedHash,
				dateOrder : new Date(),
				keyPair: btc()
				});
		document.save(function (err, response) {
			  if (!err) {
				  callback(null, response);
			  }
			  else {
				  callback(null);
			  }
		})
};

/**
 *  function check if exist, if not store a new record
 * @param hash :
 * @param callback :
 */
function processHash(hash, callback) {
	findHash(hash, function(data){ 											
		if (data) {													
			callback({'record': 'exist', 'document': data});				//record exist in DB return the document		
		}
		else 																
		{																	
			insertNewHash(hash, function(err, added) {					
				if (added) {
					callback({'record' : 'new', 'document' : added});	
				}
				else {		
					callback(null);
				}
			});
		}
	})
};

exports.findTx = findTx;
exports.findHash = findHash;
exports.insertNewHash = insertNewHash;
exports.processHash = processHash;
