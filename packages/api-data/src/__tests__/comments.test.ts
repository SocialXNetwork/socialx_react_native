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
	beforeEach(() => {
		jest.setTimeout(30 * 1000);
		mockApi = dataApiFactory(getTestAccount());
	});

	afterEach(async () => {
		if (mockApi) {
			await mockApi.resetAllDatabase();
		}
	});

	test.skip('creates a comment', async () => {
		try {
			await mockApi.profiles.createProfile(profile);
			await mockApi.posts.createPost(post);
			// TODO: get post by username or path fails
			// can't get post to get the post id
			const postId = '12341234';
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

	test('like a comment', async () => {
		/**/
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

	test('unlike a comment', async () => {
		/**/
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
