import { dataApiFactory } from '../__testHelpers/mockApi';
import records from '../__testHelpers/records';
import { datePathFromDate } from '../utils/helpers';

const { getPost, getProfile, getTestAccount } = records;

let mockApi: ReturnType<typeof dataApiFactory>;
const profile = getProfile();

describe('posts api', () => {
	beforeEach(async () => {
		jest.setTimeout(30 * 1000);
		mockApi = dataApiFactory(getTestAccount());
		await mockApi.profiles.createProfile(profile);
	});

	afterEach(async () => {
		await mockApi.resetAllDatabase();
	});

	test('creates a post', async () => {
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject create a post', async () => {
		let error: any;
		try {
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
			const post = getPost();
			await mockApi.posts.createPost(post);
			const createdPost = await mockApi.posts.getPostByPath({
				postPath: `${datePathFromDate(new Date())}.public`,
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
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
			const createdPost = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			// TODO: do a more strict comparison
			expect(createdPost).toBeTruthy();
		} catch (e) {
			expect(e).toBeUndefined();
		}
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
