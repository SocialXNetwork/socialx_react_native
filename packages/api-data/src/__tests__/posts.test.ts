import moment from 'moment';
import { dataApiFactory } from '../__testHelpers/mockApi';
import records from '../__testHelpers/records';
import { ApiError, ValidationError } from '../utils/errors';
import {
	datePathFromDate,
	getRelatedUsernamesFromPosts,
} from '../utils/helpers';

const {
	getPost,
	getProfile,
	getTestAccount,
	getProfilealt,
	getTestAccountalt,
} = records;

let mockApi: ReturnType<typeof dataApiFactory>;
const profile = getProfile();

const testComment = {
	text: 'Hey something really interesting happened',
};

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
		expect(error).toBeInstanceOf(ValidationError);
	});

	test('gets a post by path', async () => {
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
			const createdPost = await mockApi.posts.getPostByPath({
				postPath: `${datePathFromDate(new Date())}.public`,
			});
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
		expect(error).toBeInstanceOf(ApiError);
	});

	test('get post by id', async () => {
		try {
			const cpost = getPost();
			await mockApi.posts.createPost(cpost);
			const createdPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const fetchPostById = await mockApi.posts.getPostById({
				postId: createdPosts[0].postId,
			});
			expect(fetchPostById).toBeTruthy();
			expect(fetchPostById.owner.alias).toEqual(profile.username);
		} catch (e) {
			expect(e).toBeUndefined();
		}
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
				username: '',
			});
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ValidationError);
	});

	test('get public posts by date', async () => {
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
			const publicPosts = await mockApi.posts.getPublicPostsByDate({
				date: new Date(Date.now()),
			});
			expect(publicPosts).toBeTruthy();
			expect(publicPosts.length).toEqual(1);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('likes a post', async () => {
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

			const likes = updatedPosts[0].likes;
			expect(likes).toHaveProperty([0, 'owner', 'alias'], profile.username);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject likes a post (post doesnt exist)', async () => {
		let error: any;
		try {
			await mockApi.posts.likePost({
				postId: '12341234',
			});
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ApiError);
	});

	test('rejects unlike a post (already liked)', async () => {
		let error: any;
		try {
			const post = getPost();

			await mockApi.posts.createPost(post);
			const posts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const { postId } = posts[0];

			await mockApi.posts.likePost({ postId });
			await mockApi.posts.likePost({ postId });
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ApiError);
	});

	test('removes a post', async () => {
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
			let posts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			const { postId } = posts[0];
			await mockApi.posts.removePost({
				postId,
			});
			posts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			expect(posts.length).toEqual(0);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject removes a post (doesnt exist)', async () => {
		let error: any;
		try {
			await mockApi.posts.removePost({
				postId: '123123',
			});
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ApiError);
	});

	test('reject removes a post (user doesnt own the post)', async () => {
		let error: any;
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
			const posts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			const { postId } = posts[0];

			// change user
			mockApi = dataApiFactory(getTestAccountalt());
			await mockApi.profiles.createProfile(getProfilealt());

			await mockApi.posts.removePost({
				postId,
			});
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ApiError);
	});

	test('unlike a post', async () => {
		try {
			const post = getPost();

			await mockApi.posts.createPost(post);
			let posts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const { postId } = posts[0];
			await mockApi.posts.likePost({ postId });

			await mockApi.posts.unlikePost({ postId });

			posts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			expect(posts.length).toEqual(1);
			expect(posts[0].likes.length).toEqual(0);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('rejects unlike a post (doesnt exist)', async () => {
		let error: any;
		try {
			await mockApi.posts.unlikePost({
				postId: '1234',
			});
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ApiError);
	});

	test('rejects unlike a post (cannot unlike)', async () => {
		let error: any;
		try {
			const post = getPost();

			await mockApi.posts.createPost(post);
			const posts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const { postId } = posts[0];

			await mockApi.posts.unlikePost({ postId });
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ApiError);
	});

	test('gets profiles by list of posts', async () => {
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
			const posts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});
			const { postId } = posts[0];

			await mockApi.posts.likePost({ postId });

			await mockApi.comments.createComment({
				postId,
				...testComment,
			});

			let updatedPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const { commentId } = updatedPosts[0].comments[0];

			await mockApi.comments.likeComment({
				commentId,
			});

			updatedPosts = await mockApi.posts.getPostsByUser({
				username: profile.username,
			});

			const userProfiles = await mockApi.profiles.getUserProfilesByPosts({
				posts: updatedPosts,
			});
			expect(userProfiles.length).toEqual(3);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('loads more posts that are within 30 days', async () => {
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
			await mockApi.posts.createPost(post);
			const loadMorePosts = await mockApi.posts.loadMorePosts({
				timestamp: moment()
					.add(5, 'days')
					.valueOf(),
			});
			expect(loadMorePosts.length).toEqual(2);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('does not load more posts beyond 30 days', async () => {
		jest.setTimeout(120 * 1000);
		try {
			const post = getPost();
			await mockApi.posts.createPost(post);
			await mockApi.posts.createPost(post);

			const loadMorePosts = await mockApi.posts.loadMorePosts({
				timestamp: moment()
					.add(31, 'days')
					.valueOf(),
			});

			expect(loadMorePosts.length).toEqual(0);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});
});
