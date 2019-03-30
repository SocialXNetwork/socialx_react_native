import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';

import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import favicon from 'express-favicon';

import config from './config';
import Database from './database';
import Routes from './routes';

import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import socketIO, { Socket } from 'socket.io';

export default class Server {
	public app: express.Application;
	public isProduction: boolean = true;
	public port: number = 0;
	public sslPort: number = 0;

	public httpsServer: https.Server | null = null;
	public httpServer: http.Server;
	public socketServer: SocketIO.Server;

	public listening: boolean = false;
	// private compiler: any;

	// certificates
	private key: any;
	private cert: any;

	constructor() {
		// assign the app
		this.app = express();

		// configure the server
		this.config();

		this.httpServer = new http.Server(this.app);
		this.socketServer = socketIO(this.httpsServer || this.httpServer);

		this.httpServer.listen(this.port, '0.0.0.0', () => {
			console.log(`Http Server Started on 0.0.0.0:${this.port}`);
		});

		console.log(`Socket Server Started on 0.0.0.0:${this.port}`);

		console.log(
			`\nEverything running normal, Graphql playground at ${
				this.httpsServer ? 'https://' : 'http://'
			}0.0.0.0:${this.httpsServer ? this.sslPort : this.port}/graphql`,
		);
	}

  public static bootstrap(): Server { /* tslint:disable-line */
		return new Server();
	}

	private controllers() {
		// index router
		Routes(this.app);

		// fire up the database
		Database(this.app);
	}

	private async config() {
		this.isProduction = process.env.NODE_ENV === 'production';
		this.port = config.port;
		this.sslPort = config.sslPort;

		// Compress Results and file requrest and limit them to 20mb + parse request bodies + force ssl on all requests
		this.app.use(compression());
		this.app.use(bodyParser.json({ limit: '20mb' }));
		this.app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
		// this.app.use(forceSSL);

		// cookies parsing
		this.app.use(cookieParser());

		// configure routes/controllers/database etc..
		this.controllers();

		if (this.isProduction) {
			this.productionConfig();
		} else {
			this.developmentConfig();
		}
	}

	private productionConfig() {
		// Remove unnecessary stuff & add production flags
		this.app.disable('x-powered-by');
		// this.app.use(logger('combined'));
		this.app.use(logger('dev'));
		this.app.set('trust proxy', 1);

		this.key = fs.readFileSync(path.resolve('cert', 'key.pem'));
		this.cert = fs.readFileSync(path.resolve('cert', 'key.pem'));
	}

	private developmentConfig() {
		// set express logger
		this.app.use(helmet());
		this.app.disable('x-powered-by');
		this.app.set('trust proxy', 1);
		this.app.use(logger('dev'));
	}
}
