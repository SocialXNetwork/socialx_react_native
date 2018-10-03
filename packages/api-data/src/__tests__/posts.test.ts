import moment from 'moment-timezone';
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
			const createdPost = await mockApi.posts.getPostByPath({
				postPath: `${moment().format('YYYY/M/D')}/public`,
			});
			// TODO: do a more strict comparison
			expect(createdPost).toBeTruthy();
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject get post by path', async () => {
		let error: any;
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			const post = getPost();
			await mockApi.posts.createPost(post);
			await mockApi.posts.getPostByPath({
				postPath: 'abcd',
			});
		} catch (e) {
			error = e;
		}
		expect(error).toMatch('no post found');
	});

	test('get posts by user', async () => {
		/**/
	});

	test('reject get posts by user', async () => {
		/**/
	});

	test('get public posts by date', async () => {
		/**/
	});

	test('reject get public posts by date', async () => {
		/**/
	});

	test('likes a post', async () => {
		/**/
	});

	test('reject likes a post', async () => {
		/**/
	});

	test('removes a post', async () => {
		/**/
	});

	test('reject removes a post', async () => {
		/**/
	});

	test('unlike a post', async () => {
		/**/
	});

	test('rejects unlike a post', async () => {
		/**/
	});
});
