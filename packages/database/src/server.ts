import { Application, default as express } from 'express';
import { Server } from 'http';

import Gun from 'gun';
import 'gun/lib/store';
import 'gun/nts';

import path from 'path';

const HOST = process.env.NODE_ENV === 'development' ? '127.0.0.1' : process.env.HOST || '0.0.0.0';

const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 8765;

const app: Application = express();

app.use(Gun.serve);

const server: Server = app.listen(PORT, HOST);

const knownPeers = [
	'128.199.162.85',
	'139.59.130.248',
	'188.166.78.168',
	'139.59.11.126',
	'198.211.112.79',
].map((peer) => `http://${peer}:8765/gun`);

Gun({ file: path.resolve(__dirname, '../data'), web: server, peers: knownPeers });

console.log(`socialx database node is listening on http://${HOST}:${PORT}/gun`);
