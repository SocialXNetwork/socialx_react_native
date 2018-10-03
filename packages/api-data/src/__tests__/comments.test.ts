import { dataApiFactory } from '../__testHelpers/mockApi';
import records from '../__testHelpers/records';

const { getTestAccount, getProfile, getPost } = records;

let mockApi: ReturnType<typeof dataApiFactory>;

const profile = getProfile();
const post = getPost();

const testComment = {
	text: 'Hey something really interesting happened',
};

describe('comments api', () => {
	beforeEach(async () => {
		jest.setTimeout(30 * 1000);
		mockApi = dataApiFactory(getTestAccount());
		await mockApi.profiles.createProfile(profile);
		await mockApi.posts.createPost(post);
	});

	afterEach(async () => {
		await mockApi.resetAllDatabase();
	});

	test('creates a comment', async () => {
		try {
			const newPost = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			const postId = newPost[0].postId;
			await mockApi.comments.createComment({
				postId,
				...testComment,
			});
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject create comment', async () => {
		let error: any;
		try {
			const postId = '12341234';
			await mockApi.comments.createComment({
				postId,
				...testComment,
			});
		} catch (e) {
			error = e;
		}
		expect(error).toEqual('no post found by this id');
	});

	test.skip('like a comment', async () => {
		try {
			const newPost = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			const postId = newPost[0].postId;
			await mockApi.comments.createComment({
				postId,
				...testComment,
			});
			const updatedPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			// NOTE: No comment was added
			// console.log(JSON.stringify(updatedPosts, null, 2));
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject like comment', async () => {
		let error: any;
		try {
			await mockApi.comments.likeComment({
				commentId: '12341234',
			});
		} catch (e) {
			error = e;
		}
		expect(error).toEqual('no comment found by this id');
	});

	test.skip('unlike a comment', async () => {
		try {
			const newPost = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			const postId = newPost[0].postId;
			await mockApi.comments.createComment({
				postId,
				...testComment,
			});
			const updatedPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			// NOTE: No comment was added
			// console.log(JSON.stringify(updatedPosts, null, 2));
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject unlike comment', async () => {
		let error: any;
		try {
			await mockApi.comments.unlikeComment({
				postPath: '',
				commentId: '12341234',
			});
		} catch (e) {
			error = e;
		}
		expect(error).toEqual('postPath is a required field');
	});
});
