import sinon from 'sinon';
import { storageApiFactory } from '../index';

const config = {
	host: 'ipfs.infura.io',
	port: '5001',
	protocol: 'https',
	root: '/api/v0',
};

const sandbox = sinon.createSandbox();

const completed = sandbox.spy();
const error = sandbox.spy();

const listeners: any = {
	completed,
	error,
};

const uploaderMock = {
	startUpload: sandbox.stub().resolves('123'),
	addListener: (state: any, _: any, cb: any) => {
		console.log('add listener stub', state);
		listeners[state] = cb;
	},
	getFileInfo: sandbox.stub().resolves(),
	cancelUpload: sandbox.stub().resolves(),
};

describe('ipfs', () => {
	beforeEach(() => {
		jest.setTimeout(30000);
		sandbox.restore();
	});

	test('instantiates correctly', async () => {
		try {
			const storageApi = storageApiFactory(config, uploaderMock);
			expect(storageApi).toBeTruthy();
			expect(storageApi).toHaveProperty('uploadFile');
			expect(storageApi).toHaveProperty('getFileInfo');
			expect(storageApi).toHaveProperty('abortUpload');
		} catch (e) {
			throw new Error(e);
		}
	});

	test('adds file', async () => {
		const storageApi = storageApiFactory(config, uploaderMock);
		setTimeout(() => listeners.completed(), 1000);
		const res = await storageApi.uploadFile('path/to/file');
		expect(res).toBeTruthy();
		// because the spy was replaced by the real callback
		// even if we call it above after 1 second
		expect(listeners.completed.called).toBeFalsy();
	});

	test('throws an error', async () => {
		let err: any;
		try {
			const storageApi = storageApiFactory(config, uploaderMock);
			setTimeout(() => listeners.error('something happened'), 1000);
			const res = await storageApi.uploadFile('path/to/file');
			// because the spy was replaced by the real callback
			// even if we call it above after 1 second
			expect(listeners.error.called).toBeFalsy();
		} catch (e) {
			err = e;
		}
		expect(err).toBeTruthy();
		expect(err).toMatch('something happened');
	});

	test('gets file info', async () => {
		const storageApi = storageApiFactory(config, uploaderMock);
		await storageApi.getFileInfo('path/to/file');
		expect(uploaderMock.getFileInfo.called).toBeTruthy();
	});

	test('cancels file upload', async () => {
		const storageApi = storageApiFactory(config, uploaderMock);
		await storageApi.abortUpload('uploadId');
		expect(uploaderMock.cancelUpload.called).toBeTruthy();
	});
});
