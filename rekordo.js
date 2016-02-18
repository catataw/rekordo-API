/** 
 * rekordo.io
 * (c) 2015 luisan00
 * This application is under a (MIT) license.
 * See LICENSE file for more information.
 *
 * - Main Application file -
 * 
 **/
var express = require('express');
var bodyParser  = require('body-parser');
var path = require('path');
var url = require('url');
/**/
var config = require('./config/config');
var api = config.api;
var price = config.prices;
var response = require('./config/messages').response;
var db = require('./database/tools/hash.js');
var processHash = db.processHash;
var insertNewHash = db.insertNewHash;
var getTx = require('./helpers/insightWrapper').getTx;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view cache', api.cache);

/** -- GET method -- routes */
/* /api/query/:hashid (one) record only*/
app.get('/api/query/:hashid', function(req, res) {
	var hash = req.params.hashid
	var hashes = hash.split(",")
	console.log('GET /api/query/%s', hashes)
	if (hashes.length ==1){
	/** One Hash Only */
		processHash(hash, function(data){
			switch (data.record){
				case 'new':
					console.log('new record: %s', data.document)
					res.send({
						order : data.document._id,
						date: data.document.dateOrder,
						document: data.document.hash,
						address : data.document.keyPair.pubKey,
						amount: data.document.amount,
						paid: data.document.amountPaid,
						tx: data.document.txid,
						block: data.document.block,
						status: data.document.status,
						error: data.document.error
						})
					res.end()
					break;
				case 'exist':
					console.log('record exist: %s', data.document)
					res.send({
						order : data.document._id,
						date: data.document.dateOrder,
						document: data.document.hash,
						address : data.document.keyPair.pubKey,
						amount: data.document.amount,
						paid: data.document.amountPaid,
						tx: data.document.txid,
						block: data.document.block,
						status: data.document.status,
						error: data.document.error
						})
					res.end()
					break;
				default:
					console.log('[error] processing query to database')
					res.send({'record':'error', 'document':'error'})
			}
		})
	}
	else{
		console.log('more than a hash is not yet implemented')
		res.send({
			order : null,
			date: null,
			document: hash,
			address : null,
			amount: null,
			paid: null,
			tx: null,
			block: null,
			status: -1,
			error: 'More than a hash is not yet implemented'
			})
		res.end()
	}
})
/* /api/tx/:txid */
app.get('/api/tx/:id', function(req, res){
	var txid = req.params.id
	console.log(txid)
	if (txid){
		console.log('request: %s', txid)
		getTx(txid, function(tx){
			if (tx){
				console.log(tx)
				res.send(tx)
				res.end()	
			}
		})

	}
	else {
		console.log('request: %s', 'error')
		res.send({ tx : 'not found' })
		res.end()
	}
	
})

/* -- POST method -- routes  */
app.post('/api/query/', function (req, res) {
	var body = req.body
	/** One Hash Only */
	var payload = body.hash
	console.log('request: %s, %s record/s', payload, payload.length)
	if (body.hash.length==1){
		processHash(body.hash, function(data){
			switch (data.record){
				case 'new':
					console.log('new record: %s', data.document)
					res.send({
						order : data.document._id,
						date: data.document.dateOrder,
						document: data.document.hash,
						address : data.document.keyPair.pubKey,
						amount: data.document.amount,
						paid: data.document.amountPaid,
						tx: data.document.txid,
						block: data.document.block,
						status: data.document.status,
						error: data.document.error
						})
					res.end()
					break;
				case 'exist':
					console.log('record exist: %s', data.document)
					res.send({
						order : data.document._id,
						date: data.document.dateOrder,
						document: data.document.hash,
						address : data.document.keyPair.pubKey,
						amount: data.document.amount,
						paid: data.document.amountPaid,
						tx: data.document.txid,
						block: data.document.block,
						status: data.document.status,
						error: data.document.error
						})
					res.end()
					break;
				default:
					console.log('[error] processing query to database')
					res.send({'record':'error', 'document':'error'})
			}
		})
	}
	else {
		console.log('something is wrong')
		res.send({
			order: null,
			date: null,
			document: body.hash,
			address: null,
			amount: null,
			paid: null,
			tx: null,
			block: null,
			status: 0,
			error: 'Only a hash per query',
		})
		res.end()
	}
	
});

/* Run the server!	*/
app.listen(api.port);
console.log('Application listening on port: %s', api.port);
