import { dataApiFactory } from '../__testHelpers/mockApi';
import { FRIEND_TYPES } from '../repository/profiles/types';

let mockApi: ReturnType<typeof dataApiFactory> | undefined;
let mockApi2: ReturnType<typeof dataApiFactory> | undefined;

const mockProfile = {
	aboutMeText: 'Hello there, I have been here',
	avatar: '123456',
	email: 'a@b.com',
	fullName: 'neil de grasse tyson',
	miningEnabled: true,
	pub: 'bleep',
	username: 'blahblah',
};

const testAccount = { is: { pub: 'bleep', alias: 'blahblah' } };
const testAccount2 = { is: { pub: 'boop', alias: 'bopybopy' } };
// TODO: how to test this properly?
// createUser fails with the following:
//
// * NO! Unverified data. (appears in logs)
// * Public key does not exist! (comes through as the error from the reject/catch)
//
// https://github.com/amark/gun/issues/579 seems to be very relevant
describe('profiles api', () => {
	beforeEach(() => {
		expect(mockApi).toBeUndefined();
		expect(mockApi2).toBeUndefined();
		jest.setTimeout(30 * 1000);
		mockApi = dataApiFactory(testAccount);
		mockApi2 = dataApiFactory(testAccount2);
	});

	afterEach(async () => {
		expect(mockApi).toBeDefined();
		expect(mockApi2).toBeDefined();
		if (mockApi && mockApi2) {
			await mockApi.resetAllDatabase();
		}
		mockApi = undefined;
		mockApi2 = undefined;
	});

	test('rejects create profile', async () => {
		const invalidProfile = {
			aboutMeText: 'hall',
			avatar: '',
			email: 'a',
			fullName: '',
			miningEnabled: true,
			pub: 'bleep',
			username: 'bla',
		};

		Object.entries(invalidProfile).forEach(async ([key, value]) => {
			const testProfile = {
				...mockProfile,
				[key]: value,
			};

			try {
				if (!mockApi) {
					throw new Error('mockApi is not defined');
				}
				await mockApi.profiles.createProfile(testProfile);
			} catch (e) {
				expect(e).toBeTruthy();
			}
		});
	});

	test('create profile', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			await mockApi.profiles.createProfile(mockProfile);
			const currentProfile = await mockApi.profiles.getCurrentProfile();

			// Deconstruct because username is not in the returned object
			const { username, ...profileData } = mockProfile;
			const profileUnderTest = { ...profileData, friends: [] };

			expect(currentProfile).toEqual(profileUnderTest);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('rejects get profile by username', async () => {
		let error: any;
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			await mockApi.profiles.getProfileByUsername({ username: '*' });
		} catch (e) {
			error = e;
		}
		expect(error).toMatch(/username must be/);
	});

	test('get profile by username', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			// Deconstruct because username is not in the returned object, but is required
			// in the getter parameters
			const { username, ...profileData } = mockProfile;

			await mockApi.profiles.createProfile(mockProfile);
			const userProfile = await mockApi.profiles.getProfileByUsername({
				username,
			});

			const profileUnderTest = { ...profileData, friends: [] };
			expect(userProfile).toEqual(profileUnderTest);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('rejects update profile', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			await mockApi.profiles.createProfile(mockProfile);
			await mockApi.profiles.updateProfile({
				aboutMeText: 'This is a story about a man who lost his pants',
				email: 'a',
				fullName: 'some new full name',
				avatar: '12345',
			});
		} catch (e) {
			expect(e).toBeTruthy();
		}
	});

	test('updates profile', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			await mockApi.profiles.createProfile(mockProfile);
			// TODO: the helper seems to require all of the keys in
			// IUpdateProfileInput and fails to update the profile
			// if we only provide an email for example
			const updatedProperties = {
				aboutMeText: 'This is a story about a man who lost his pants',
				email: 'laurel@yanny.com',
				fullName: 'some new full name',
				avatar: '12345',
			};
			await mockApi.profiles.updateProfile(updatedProperties);
			const userProfile = await mockApi.profiles.getCurrentProfile();
			const { username, ...oldProperties } = mockProfile;
			expect(userProfile).toMatchObject({
				...oldProperties,
				...updatedProperties,
			});
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('rejects adds friend', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			await mockApi.profiles.createProfile(mockProfile);
			await mockApi.profiles.addFriend({ username: '' });
		} catch (e) {
			expect(e).toBeTruthy();
		}
	});

	test('adds friend', async () => {
		try {
			if (!mockApi || !mockApi2) {
				throw new Error('mockApi is not defined');
			}
			const friendProfile = {
				...mockProfile,
				username: 'bopybopy',
				pub: 'boop',
			};
			await Promise.all([
				mockApi.profiles.createProfile(mockProfile),
				mockApi2.profiles.createProfile(friendProfile),
			]);
			await mockApi.profiles.addFriend({ username: 'bopybopy' });
			const newProfile = await mockApi.profiles.getCurrentProfile();
			expect(newProfile).toHaveProperty(
				['friends', 0, 'relation'],
				FRIEND_TYPES.PENDING,
			);
			expect(newProfile).toHaveProperty(['friends', 0, 'username'], 'bopybopy');
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('rejects removes friend', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}

			await mockApi.profiles.createProfile(mockProfile);
			await mockApi.profiles.removeFriend({
				friendshipId: '',
				username: 'first_friend',
			});
		} catch (e) {
			expect(e).toBeTruthy();
		}
	});

	// ! profiles.removeFriend uses .put(null) which doesnt work, we have to use unset on the setter
	test.skip('removes friend', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			const friends = [
				{
					friendId: 'jmrzjcc101awINqWKVZDdRW',
					relation: FRIEND_TYPES.PENDING,
					timestamp: 1538500604977,
					username: 'first_friend',
				},
			];
			const mockProfileWithFriends = { ...mockProfile, friends };

			await mockApi.profiles.createProfile(mockProfile);
			// NOTE: this succeeds even if friend does not exist?
			// NOTE: currently fails
			// Needs some attention
			// "TypeError: Cannot destructure property `_` of 'undefined' or 'null'"
			// src/utils/helpers.ts:24:46
			await mockApi.profiles.removeFriend({
				friendshipId: 'jmrzjcc101awINqWKVZDdRW',
				username: 'first_friend',
			});
			const newProfile = await mockApi.profiles.getCurrentProfile();
			expect(newProfile).toHaveProperty('friends', []);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('rejects accepts friend', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			const friendProfile = { ...mockProfile, username: 'first_friend' };
			await Promise.all([
				mockApi.profiles.createProfile(mockProfile),
				mockApi.profiles.createProfile(friendProfile),
			]);
			// NOTE: this succeeds even if friend does not exist?
			await mockApi.profiles.acceptFriend({
				friendshipId: '',
				username: friendProfile.username,
			});
		} catch (e) {
			expect(e).toBeTruthy();
		}
	});

	test('accepts friend', async () => {
		try {
			if (!mockApi || !mockApi2) {
				throw new Error('mockApi is not defined');
			}
			const friendProfile = {
				...mockProfile,
				username: 'bopybopy',
				pub: 'boop',
			};
			await Promise.all([
				mockApi.profiles.createProfile(mockProfile),
				mockApi2.profiles.createProfile(friendProfile),
			]);

			// fetch the profiles
			let newFriendProfile = await mockApi2.profiles.getCurrentProfile();
			let newProfile = await mockApi.profiles.getCurrentProfile();

			await mockApi.profiles.addFriend({
				username: friendProfile.username,
			});

			// refetch the profiles for updates
			// newFriendProfile = await mockApi2.profiles.getCurrentProfile();
			newProfile = await mockApi.profiles.getCurrentProfile();

			const relationshipId = newProfile.friends[0].friendId;

			// NOTE: this succeeds even if friend does not exist?
			// accept the reverse user of the adding
			await mockApi2.profiles.acceptFriend({
				friendshipId: relationshipId,
				username: mockProfile.username,
			});

			// refetch the data
			newFriendProfile = await mockApi2.profiles.getCurrentProfile();
			newProfile = await mockApi.profiles.getCurrentProfile();

			// test for both cases on the friend
			expect(newFriendProfile).toHaveProperty(
				['friends', 0, 'relation'],
				FRIEND_TYPES.MUTUAL,
			);
			// expect(newFriendProfile).toHaveProperty(
			// 	['friends', 0, 'username'],
			// 	mockProfile.username,
			// );

			// test for both cases on the current user
			// ? not working see setters
			// expect(newProfile).toHaveProperty(
			// 	['friends', 0, 'relation'],
			// 	FRIEND_TYPES.MUTUAL,
			// );
			// expect(newProfile).toHaveProperty(
			// 	['friends', 0, 'username'],
			// 	friendProfile.username,
			// );
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('shouldnt add self as friend', () => {
		//
	});
});
