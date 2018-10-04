import { dataApiFactory } from '../__testHelpers/mockApi';
import records from '../__testHelpers/records';
import { ApiError } from '../utils/errors';

const {
	getTestAccount,
	getProfile,
	getPost,
	getProfilealt,
	getTestAccountalt,
} = records;

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
			let newPost = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			const postId = newPost[0].postId;

			await mockApi.comments.createComment({
				postId,
				...testComment,
			});

			newPost = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const comments = newPost[0].comments;

			expect(comments.length).toEqual(1);
			expect(comments).toHaveProperty([0, 'owner', 'alias'], profile.username);
			expect(comments).toHaveProperty([0, 'text'], testComment.text);
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
		expect(error).toBeInstanceOf(ApiError);
	});

	test('removes comment', async () => {
		try {
			let newPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			const postId = newPosts[0].postId;

			await mockApi.comments.createComment({
				postId,
				...testComment,
			});

			newPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			let comments = newPosts[0].comments;
			const { commentId } = comments[0];

			expect(newPosts[0].comments.length).toEqual(1);

			await mockApi.comments.removeComment({
				commentId,
			});

			newPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			comments = newPosts[0].comments;

			expect(comments.length).toEqual(0);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject remove comment (comment doesnt exist)', async () => {
		let error: any;
		try {
			await mockApi.comments.removeComment({
				commentId: '12341234',
			});
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ApiError);
	});

	test('reject remove comment (user doesnt own the comment)', async () => {
		let error: any;
		try {
			let newPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			const postId = newPosts[0].postId;

			await mockApi.comments.createComment({
				postId,
				...testComment,
			});

			newPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const comments = newPosts[0].comments;
			const { commentId } = comments[0];

			// switch user
			mockApi = dataApiFactory(getTestAccountalt());
			await mockApi.profiles.createProfile(getProfilealt());

			await mockApi.comments.removeComment({
				commentId,
			});
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ApiError);
	});

	test('like a comment', async () => {
		try {
			const newPost = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const { postId } = newPost[0];

			await mockApi.comments.createComment({
				postId,
				...testComment,
			});

			let updatedPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const commentId = updatedPosts[0].comments[0].commentId;
			await mockApi.comments.likeComment({
				commentId,
			});

			updatedPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const comments = updatedPosts[0].comments;

			expect(comments.length).toEqual(1);
			expect(comments).toHaveProperty(
				[0, 'likes', 0, 'owner', 'alias'],
				profile.username,
			);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject like comment (comment doesnt exist)', async () => {
		let error: any;
		try {
			await mockApi.comments.likeComment({
				commentId: '12341234',
			});
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ApiError);
	});

	test('reject like comment (already liked)', async () => {
		let error: any;
		try {
			let posts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const { postId } = posts[0];

			await mockApi.comments.createComment({
				postId,
				...testComment,
			});

			posts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const { commentId } = posts[0].comments[0];

			await mockApi.comments.likeComment({
				commentId,
			});
			await mockApi.comments.likeComment({
				commentId,
			});
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ApiError);
	});

	test('unlike a comment', async () => {
		try {
			const newPost = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const { postId } = newPost[0];

			await mockApi.comments.createComment({
				postId,
				...testComment,
			});

			let updatedPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const commentId = updatedPosts[0].comments[0].commentId;
			await mockApi.comments.likeComment({
				commentId,
			});

			updatedPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			let likes = updatedPosts[0].comments[0].likes;

			expect(likes.length).toEqual(1);
			expect(likes).toHaveProperty([0, 'owner', 'alias'], profile.username);

			await mockApi.comments.unlikeComment({
				commentId,
			});

			updatedPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			likes = updatedPosts[0].comments[0].likes;
			expect(likes.length).toEqual(0);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject unlike comment (comment doesnt exit)', async () => {
		let error: any;
		try {
			await mockApi.comments.unlikeComment({
				commentId: '12341234',
			});
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ApiError);
	});

	test('reject unlike comment (not liked)', async () => {
		let error: any;
		try {
			let newPost = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const { postId } = newPost[0];

			await mockApi.comments.createComment({
				postId,
				...testComment,
			});

			newPost = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const { commentId } = newPost[0].comments[0];

			await mockApi.comments.unlikeComment({
				commentId,
			});
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ApiError);
	});
});
