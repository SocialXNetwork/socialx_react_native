import { dataApiFactory } from '../__testHelpers/mockApi';
import { FRIEND_TYPES } from '../repository/profiles';

let mockApi: ReturnType<typeof dataApiFactory>;

// TODO: how to test this properly?
// createUser fails with the following:
//
// * NO! Unverified data. (appears in logs)
// * Public key does not exist! (comes through as the error from the reject/catch)
//
// https://github.com/amark/gun/issues/579 seems to be very relevant
describe.skip('accounts api', () => {
	beforeEach(() => {
		jest.setTimeout(30 * 1000);
		mockApi = dataApiFactory();
	});

	test('create account', async () => {
		try {
			await mockApi.accounts.createAccount({
				username: 'foo1234',
				password: 'bar1234',
				aboutMeText: 'about',
				avatar: 'xxx',
				email: 'test@test.com',
				fullName: 'foo bar',
				friends: {
					xxx: {
						username: 'foo',
						timestamp: Date.now(),
						relation: FRIEND_TYPES.PENDING,
					},
				},
				miningEnabled: false,
				pub: 'xxx',
				recover: {
					encryptedReminder: 'xxx',
					question1: 'sss',
					question2: 'yyy',
					reminder: 'xxx',
				},
			});

			await mockApi.accounts.login({
				username: 'foo1234',
				password: 'bar1234',
			});
			const currentAccount = await mockApi.accounts.getCurrentAccount();

			expect(currentAccount).toBe('foo');
		} catch (e) {
			expect(e).toBe(undefined);
		}
	});
});
