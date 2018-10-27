import fs from 'fs';
import Gun from 'gun';
import http from 'http';
import ws from 'ws';

const WebSocketServer = ws.Server;

const port: string | number =
	process.env.OPENSHIFT_NODEJS_PORT ||
	process.env.VCAP_APP_PORT ||
	process.env.PORT ||
	process.argv[2] ||
	8765;

//
// have to do this before instancing gun(?)
const gunPeers: Array<{ send: (msg: any) => void }> = [];

Gun.on('out', function(msg: any) {
	// @ts-ignore
	this.to.next(msg);
	msg = JSON.stringify(msg);
	// tslint:disable-next-line
	gunPeers.forEach(function(peer) {
		peer.send(msg);
	});
});

const gun = Gun({
	file: 'data',
});

const server = http.createServer((req, res) => {
	let insert = '';
	if (req.url!.endsWith('gun.js')) {
		insert = '../';
	}

	fs.createReadStream(require('path').join(__dirname, insert, req.url))
		.on('error', () => {
			// static files!
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(require('fs').readFileSync(require('path').join(__dirname, 'index.html'))); // or default to index
		})
		.pipe(res); // stream
});
