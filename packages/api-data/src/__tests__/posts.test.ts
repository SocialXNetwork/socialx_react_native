import { dataApiFactory } from '../__testHelpers/mockApi';
import records from '../__testHelpers/records';

const { getPost, getProfile, getTestAccount } = records;

let mockApi: ReturnType<typeof dataApiFactory> | undefined;
const profile = getProfile();

describe('posts api', () => {
	beforeEach(async () => {
		if (mockApi) {
			throw new Error('mockApi is already defined');
		}
		jest.setTimeout(30 * 1000);
		mockApi = dataApiFactory(getTestAccount());
		await mockApi.profiles.createProfile(profile);
	});

	afterEach(async () => {
		if (!mockApi) {
			throw new Error('mockApi is not defined');
		}
		await mockApi.resetAllDatabase();
		mockApi = undefined;
	});

	test('creates a post', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			const post = getPost();
			await mockApi.posts.createPost(post);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject create a post', async () => {
		let error: any;
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			const post = getPost();
			const { postText, ...incompleteData } = post;
			await mockApi.posts.createPost({ ...incompleteData, postText: '' });
		} catch (e) {
			error = e;
		}
		expect(error).toMatch('postText must be at least 5 characters');
	});

	test('gets a post by path', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			const post = getPost();
			await mockApi.posts.createPost(post);
		} catch (e) {
			expect(e).toBeUndefined();
		}
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

	test('unlike a post', () => {
		/**/
	});

	test('rejects unlike a post', () => {
		/**/
	});
});
