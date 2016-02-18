/** 
 * rekordo.io
 * (c) 2015 luisan00
 * This application is under a (MIT) license.
 * See LICENSE file for more information. 
 */
var bitcore = require('bitcore');
var net = require('../config/config').bitcoin.net;

function getPairAsync(cb){
	if (net === 1) {
		bitcore.Networks.defaultNetwork = bitcore.Networks.testnet;	
	}
	else {
		bitcore.Networks.defaultNetwork = bitcore.Networks.livenet;
	}
	var privateKey = new bitcore.PrivateKey();
	var address = privateKey.toAddress();
	
	return cb({ 
				prvKey: privateKey.toWIF(),
				pubKey: address.toString()
				});
}

/**
 * @param net : TESTNET = 1, LIVENET = 0
 * @returns : a JSON Object.
 */
function getPairSync(){
	if (net===1) {
		bitcore.Networks.defaultNetwork = bitcore.Networks.testnet;	
	}
	else {
		bitcore.Networks.defaultNetwork = bitcore.Networks.livenet;
	}
	var privateKey = new bitcore.PrivateKey();
	var address = privateKey.toAddress();
	return({prvKey: privateKey.toWIF(),
			pubKey: address.toString()})
};

exports.getPairAsync = getPairAsync;
exports.getPairSync = getPairSync;
