import { dataApiFactory } from '../__testHelpers/mockApi';

let mockApi: ReturnType<typeof dataApiFactory> | null;

const testAccount = { is: { pub: 'bleep', alias: 'blahblah' } };

describe('comments api', () => {
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

	test('creates a comment', () => {
		/**/
	});

	test('reject create comment', () => {
		/**/
	});

	test('like a comment', () => {
		/**/
	});

	test('reject like comment', () => {
		/**/
	});

	test('unlike a comment', () => {
		/**/
	});

	test('reject unlike comment', () => {
		/**/
	});
});
