import { dataApiFactory } from '../__testHelpers/mockApi';
import records from '../__testHelpers/records';
import { NOTIFICATION_TYPES } from '../repository/notifications/types';
const { getProfile, getTestAccount } = records;

let mockApi: ReturnType<typeof dataApiFactory> | undefined;

const testAccount = getTestAccount();
const testProfile = getProfile();
const testNotification = {
	to: '123',
	type: NOTIFICATION_TYPES.RECENT_COMMENT,
	from: {
		alias: testAccount.is.alias,
		pub: testAccount.is.pub,
	},
	metaData: {},
	timestamp: new Date().valueOf(),
};

describe('notifications api', () => {
	beforeEach(() => {
		expect(mockApi).toBeUndefined();
		jest.setTimeout(30 * 1000);
		mockApi = dataApiFactory(testAccount);
	});

	beforeEach(async () => {
		if (!mockApi) {
			throw new Error('mockApi is not defined');
		}
		await mockApi.profiles.createProfile(testProfile);
	});

	afterEach(async () => {
		if (!mockApi) {
			throw new Error('mockApi is not defined');
		}
		await mockApi.resetAllDatabase();
		mockApi = undefined;
	});

	test('creates a notification', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			await mockApi.notifications.createNotification(testNotification);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject create a notification', async () => {
		let error: any;
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			const { from, ...incompleteData } = testNotification;
			await mockApi.notifications.createNotification({
				from: { alias: '', pub: '' },
				...incompleteData,
			});
		} catch (e) {
			error = e;
		}
		expect(error).toMatch('from.pub must be at least 1 characters');
	});

	test.skip('removes a notification', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			await mockApi.notifications.createNotification(testNotification);
			// TODO: fails to get notifications
			const notifications = await mockApi.notifications.getNotifications();
			// await mockApi.notifications.removeNotification(testNotification);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject remove notification', async () => {
		let error: any;
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			await mockApi.notifications.removeNotification({ notificationId: '' });
		} catch (e) {
			error = e;
		}
		expect(error).toEqual('notificationId must be at least 1 characters');
	});

	test.skip('get current notifications', async () => {
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			await mockApi.notifications.createNotification(testNotification);
			// TODO: fails to get notifications
			const notifications = await mockApi.notifications.getNotifications();
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject get current notifications', async () => {
		let error: any;
		try {
			if (!mockApi) {
				throw new Error('mockApi is not defined');
			}
			await mockApi.notifications.createNotification(testNotification);
			const notifications = await mockApi.notifications.getNotifications();
		} catch (e) {
			error = e;
		}
		expect(error).toBeTruthy();
	});
});
