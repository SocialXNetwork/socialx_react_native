import { dataApiFactory } from '../__testHelpers/mockApi';

let mockApi: ReturnType<typeof dataApiFactory> | null;

const testAccount = { is: { pub: 'bleep', alias: 'blahblah' } };

describe('posts api', () => {
	beforeEach(() => {
		if (mockApi) {
			throw new Error('mockApi is already defined');
		}
		jest.setTimeout(30 * 1000);
		mockApi = dataApiFactory(testAccount);
	});

	afterEach(async () => {
		if (!mockApi) {
			throw new Error('mockApi is not defined');
		}
		await mockApi.resetAllDatabase();
		mockApi = null;
	});

	test('creates a post', () => {
		/**/
	});

	test('reject create a post', () => {
		/**/
	});

	test('gets a post by path', () => {
		/**/
	});

	test('reject get post by path', () => {
		/**/
	});

	test('get posts by user', () => {
		/**/
	});

	test('reject get posts by user', () => {
		/**/
	});

	test('get public posts by date', () => {
		/**/
	});

	test('reject get public posts by date', () => {
		/**/
	});

	test('likes a post', () => {
		/**/
	});

	test('reject likes a post', () => {
		/**/
	});

	test('removes a post', () => {
		/**/
	});

	test('reject removes a post', () => {
		/**/
	});

	test('unlike a poast', () => {
		/**/
	});

	test('rejects unlike a post', () => {
		/**/
	});
});
