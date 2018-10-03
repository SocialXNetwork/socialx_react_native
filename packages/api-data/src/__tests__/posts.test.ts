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
			expect(createdPost).toBeTruthy();
			expect(createdPost.length).toEqual(1);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject get posts by user', async () => {
		let error: any;
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
			await mockApi.posts.getPostsByUser({
				username: 'abcdef',
			});
		} catch (e) {
			error = e;
		}
		expect(error).toMatch('no posts found');
	});

	test('get public posts by date', async () => {
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
			const publicPosts = await mockApi.posts.getPublicPostsByDate({
				date: new Date(),
			});
			expect(publicPosts).toBeTruthy();
			expect(publicPosts.length).toEqual(1);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject get public posts by date', async () => {
		let error: any;
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
			await mockApi.posts.getPublicPostsByDate({
				date: new Date('1234'),
			});
		} catch (e) {
			error = e;
		}
		expect(error).toMatch('no posts found');
	});

	test.skip('likes a post', async () => {
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
			const posts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			const { postId } = posts[0];
			await mockApi.posts.likePost({ postId });
			const updatedPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			// NOTE: No like was added
			// console.log(JSON.stringify(updatedPosts, null, 2));
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject likes a post', async () => {
		let error: any;
		try {
			await mockApi.posts.likePost({
				postId: '12341234',
			});
		} catch (e) {
			error = e;
		}
		expect(error).toMatch('no post found');
	});

	test.skip('removes a post', async () => {
		// NOTE: need to provide postMetaId? if so how can we get it?
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
			const posts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			const { postId } = posts[0];
			const userPosts = await mockApi.posts.removePost({
				postPath: `${datePathFromDate(new Date())}.public.${postId}`,
				postMetaId: '',
			});
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject removes a post', async () => {
		let error: any;
		try {
			await mockApi.posts.removePost({
				postPath: 'some_inexistant_post_path',
				postMetaId: '',
			});
			// NOTE: this succeeds even if post did not exist,
			// should we allow someone set an non-existant post
			// path to null
		} catch (e) {
			error = e;
		}
		expect(error).toMatch('postMetaId must be at least 1 characters');
	});

	test.skip('unlike a post', async () => {
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
			let posts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			const { postId } = posts[0];
			await mockApi.posts.likePost({ postId });
			await mockApi.posts.unlikePost({
				postPath: `${datePathFromDate(new Date())}.public.${postId}`,
			});
			posts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			expect(posts.length).toEqual(1);
			expect(posts[0].likes.length).toEqual(0);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('rejects unlike a post', async () => {
		let error: any;
		try {
			// NOTE: this succeeds even if post did not exist
			await mockApi.posts.unlikePost({
				postPath: '',
			});
		} catch (e) {
			error = e;
		}
		expect(error).toMatch('postPath must be at least 1 characters');
	});
});
