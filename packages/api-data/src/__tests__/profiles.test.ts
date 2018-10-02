import { dataApiFactory } from '../__testHelpers/mockApi';
import { FRIEND_TYPES } from '../repository/profiles';

let mockApi: ReturnType<typeof dataApiFactory> | null;

const testProfile = {
	aboutMeText: 'Hello there, I have been here',
	avatar: '123',
	email: 'a@b.com',
	fullName: 'neil de grasse tyson',
	miningEnabled: true,
	pub: 'bleep',
	username: 'blahblah',
};

const testAccount = { is: { pub: 'bleep', alias: 'blahblah' } };

// TODO: how to test this properly?
// createUser fails with the following:
//
// * NO! Unverified data. (appears in logs)
// * Public key does not exist! (comes through as the error from the reject/catch)
//
// https://github.com/amark/gun/issues/579 seems to be very relevant
describe('profiles api', () => {
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

	test('create profile', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			await mockApi.profiles.createProfile(testProfile);
			const currentProfile = await mockApi.profiles.getCurrentProfile();

			// Deconstruct because username is not in the returned object
			const { username, ...profileData } = testProfile;
			const profileUnderTest = { ...profileData, friends: [] };

			expect(currentProfile).toEqual(profileUnderTest);
		} catch (e) {
			expect(e).toBe(undefined);
		}
	});

	test('get profile by username', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			// Deconstruct because username is not in the returned object, but is required
			// in the getter parameters
			const { username, ...profileData } = testProfile;

			await mockApi.profiles.createProfile(testProfile);
			const userProfile = await mockApi.profiles.getProfileByUsername({
				username,
			});

			const profileUnderTest = { ...profileData, friends: [] };
			expect(userProfile).toEqual(profileUnderTest);
		} catch (e) {
			expect(e).toBe(undefined);
		}
	});

	// TODO: test for username and email edgecases
});
