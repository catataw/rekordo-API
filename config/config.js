/**
 * rekordo.io
 * (c) 2015 luisan00
 * This application is under a (MIT) license.
 * See LICENSE file for more information.
 * 
 *
 * Define various parameters for run properly the application.
 */

/* api options */
var api = {
		port : 9000,
		cache: false
};

/*prices options*/
var prices = { 
			user: 400000,
			user_n: 300000, 
			guest: 500000,
			guest_n: 400000
};
/* database options*/
var uri = 'mongodb://MONGODB_HOST';
var options = {
		db: { native_parser: true },
		server: { poolSize: 5 },
		user: 'MONGODB_USER',
		pass: 'MONGODB_PASS',
		auth: 'AUTH'
};

/* define parameters about BITCOIN daemon*/
var bitcoin = {
		// Put here the same values than in you bitcoin.conf file.
		rpc : { user : 'rpc_user',
				pass : 'rpc_pass',
				host : 'rpc_host',
				port : 18332 //<--default for TESTNET, use 8332 for the LIVENET
				},
		// Set to [0] for LIVENET or [1] if you want run in TESNET mode.
		net : 1				
};

/* route to the host explorer */
var explorer = {
		host : 'explorer_host',
		port : 3001 // use 3000 for LIVENET
};

/* the timer between checks t*/
var timer = 3000;

/* console colors && formats */
var color = {
		reset:'\x1b[0m',
		fg_D: '\x1b[90m',
		fg_R: '\x1b[91m',
		fg_G: '\x1b[92m',
		fg_B: '\x1b[94m',
		fg_Y: '\x1b[93m',
		bg_D: '\x1b[100m',
		bg_R: '\x1b[101m',
		bg_G: '\x1b[102m',
		bg_B: '\x1b[104m',
		bg_Y: '\x1b[103m'
};

/* exports  */
exports.api = api;
exports.prices = prices;
exports.uri = uri;
exports.options = options;
exports.bitcoin = bitcoin;
exports.explorer = explorer;
exports.timer = timer;
exports.color = color;