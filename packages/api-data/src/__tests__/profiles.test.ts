import { dataApiFactory } from '../__testHelpers/mockApi';
import records from '../__testHelpers/records';
import { FRIEND_TYPES } from '../repository/profiles/types';
import { ApiError, ValidationError } from '../utils/errors';

let mockApi: ReturnType<typeof dataApiFactory>;

const { getProfile, getProfilealt } = records;

const testAccount = { is: { pub: 'bleep', alias: 'blahblah' } };
const testAccount2 = { is: { pub: 'boop', alias: 'bopybopy' } };
// TODO: how to test this properly?
// createUser fails with the following:
//
// * NO! Unverified data. (appears in logs)
// * Public key does not exist! (comes through as the error from the reject/catch)
//
// https://github.com/amark/gun/issues/579 seems to be very relevant

const mockProfile = getProfile();
const mockProfile2 = getProfilealt();

describe('profiles api', () => {
	beforeEach(() => {
		jest.setTimeout(30 * 1000);
		mockApi = dataApiFactory(testAccount);
	});

	afterEach(async () => {
		await mockApi.resetAllDatabase();
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
				await mockApi.profiles.createProfile(testProfile);
			} catch (e) {
				expect(e).toBeInstanceOf(ValidationError);
			}
		});
	});

	test('create profile', async () => {
		try {
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

	test('searches by full name existing profiles', async () => {
		try {
			mockProfile.fullName = 'Neil Patrick Harris';
			mockProfile2.fullName = 'Neil de Grasse';
			await mockApi.profiles.createProfile(mockProfile);
			await mockApi.profiles.createProfile(mockProfile2);

			let profiles = await mockApi.profiles.searchByFullName({
				textSearch: 'Neil',
			});
			expect(profiles.length).toEqual(2);
			profiles = await mockApi.profiles.searchByFullName({
				// make sure case insensitive works
				textSearch: 'grasse',
			});
			expect(profiles.length).toEqual(1);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('rejects get profile by username', async () => {
		let error: any;
		try {
			await mockApi.profiles.getProfileByUsername({ username: '*' });
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ValidationError);
	});

	test('get profile by username', async () => {
		try {
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
			await mockApi.profiles.createProfile(mockProfile);
			await mockApi.profiles.updateProfile({
				aboutMeText: 'This is a story about a man who lost his pants',
				email: 'a',
				fullName: 'some new full name',
				avatar: '12345',
			});
		} catch (e) {
			expect(e).toBeInstanceOf(ValidationError);
		}
	});

	test('updates profile', async () => {
		try {
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
			await mockApi.profiles.createProfile(mockProfile);
			await mockApi.profiles.addFriend({ username: '' });
		} catch (e) {
			expect(e).toBeInstanceOf(ValidationError);
		}
	});

	test('adds friend', async () => {
		try {
			const friendProfile = {
				...mockProfile,
				username: 'bopybopy',
				pub: 'boop',
			};
			await Promise.all([
				mockApi.profiles.createProfile(mockProfile),
				mockApi.profiles.createProfile(friendProfile),
			]);
			await mockApi.profiles.addFriend({ username: 'bopybopy' });

			const thisProfile = await mockApi.profiles.getCurrentProfile();
			const targetProfile = await mockApi.profiles.getProfileByUsername({
				username: 'bopybopy',
			});

			expect(thisProfile).toHaveProperty(['friends', 0, 'relation'], FRIEND_TYPES.PENDING);
			expect(thisProfile).toHaveProperty(['friends', 0, 'username'], friendProfile.username);

			expect(targetProfile).toHaveProperty(['friends', 0, 'relation'], FRIEND_TYPES.PENDING);
			expect(targetProfile).toHaveProperty(['friends', 0, 'username'], mockProfile.username);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('rejects removes friend', async () => {
		try {
			await mockApi.profiles.createProfile(mockProfile);
			await mockApi.profiles.removeFriend({
				username: 'first_friend',
			});
		} catch (e) {
			expect(e).toBeInstanceOf(ValidationError);
		}
	});

	test('removes friend', async () => {
		try {
			const friendProfile = {
				...mockProfile,
				username: 'bopybopy',
				pub: 'boop',
			};
			await Promise.all([
				mockApi.profiles.createProfile(mockProfile),
				mockApi.profiles.createProfile(friendProfile),
			]);
			await mockApi.profiles.addFriend({ username: 'bopybopy' });

			let thisProfile = await mockApi.profiles.getCurrentProfile();

			await mockApi.profiles.removeFriend({
				friendshipId: thisProfile.friends[0].friendId,
				username: 'bopybopy',
			});

			thisProfile = await mockApi.profiles.getCurrentProfile();
			const targetProfile = await mockApi.profiles.getProfileByUsername({
				username: 'bopybopy',
			});

			expect(thisProfile.friends).toBeTruthy();
			expect(targetProfile.friends).toBeTruthy();

			expect(thisProfile.friends.length).toEqual(0);
			expect(targetProfile.friends.length).toEqual(0);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('rejects accepts friend', async () => {
		try {
			const friendProfile = { ...mockProfile, username: 'first_friend' };
			await Promise.all([
				mockApi.profiles.createProfile(mockProfile),
				mockApi.profiles.createProfile(friendProfile),
			]);
			// NOTE: this succeeds even if friend does not exist?
			await mockApi.profiles.acceptFriend({
				username: friendProfile.username,
			});
		} catch (e) {
			expect(e).toBeInstanceOf(ValidationError);
		}
	});

	test('accepts friend', async () => {
		try {
			const friendProfile = {
				...mockProfile,
				username: 'bopybopy',
				pub: 'boop',
			};
			await Promise.all([
				mockApi.profiles.createProfile(mockProfile),
				mockApi.profiles.createProfile(friendProfile),
			]);

			await mockApi.profiles.addFriend({
				username: friendProfile.username,
			});

			// fetch the profiles
			let newFriendProfile = await mockApi.profiles.getProfileByUsername({
				username: 'bopybopy',
			});
			let newProfile = await mockApi.profiles.getCurrentProfile();

			// switch the api to the second user
			mockApi = dataApiFactory(testAccount2);

			await mockApi.profiles.acceptFriend({
				username: 'blahblah',
			});

			newFriendProfile = await mockApi.profiles.getProfileByUsername({
				username: 'blahblah',
			});
			newProfile = await mockApi.profiles.getCurrentProfile();

			expect(newProfile).toHaveProperty(['friends', 0, 'relation'], FRIEND_TYPES.MUTUAL);
			expect(newProfile).toHaveProperty(['friends', 0, 'username'], mockProfile.username);

			expect(newFriendProfile).toHaveProperty(['friends', 0, 'relation'], FRIEND_TYPES.MUTUAL);
			expect(newFriendProfile).toHaveProperty(['friends', 0, 'username'], friendProfile.username);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('shouldnt add self as friend', async () => {
		let error: any;
		try {
			await mockApi.profiles.createProfile(mockProfile);
			await mockApi.profiles.addFriend({
				username: mockProfile.username,
			});
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ApiError);
	});
});
