import { storageApiFactory } from './index';

describe('ipfs', () => {
	test('instantiates correctly', async () => {
		try {
			const storageApi = storageApiFactory();
			expect(storageApi).toBeTruthy();
		} catch (e) {
			throw new Error(e);
		}
	});

	// test('adds file', async () => {
	// 	const storageApi = storageApiFactory();
	// 	await storageApi.uploadFile('./test.txt');
	// });
	//
	// test('gets file info');
	//
	// test('cancel upload');
});
