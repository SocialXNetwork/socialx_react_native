import { dataApiFactory } from '../__testHelpers/mockApi';
import records from '../__testHelpers/records';
import { NOTIFICATION_TYPES } from '../repository/notifications/types';
import { ValidationError } from '../utils/errors';
const { getProfile, getTestAccount } = records;

let mockApi: ReturnType<typeof dataApiFactory>;

const testAccount = getTestAccount();
const testProfile = getProfile();
const testNotification = {
	to: testAccount.is.alias,
	type: NOTIFICATION_TYPES.RECENT_COMMENT,
	from: {
		alias: testAccount.is.alias,
		pub: testAccount.is.pub,
	},
	metaData: {},
	timestamp: new Date().valueOf(),
};

describe('notifications api', () => {
	beforeEach(async () => {
		jest.setTimeout(30 * 1000);
		mockApi = dataApiFactory(testAccount);
		await mockApi.profiles.createProfile(testProfile);
	});

	afterEach(async () => {
		await mockApi.resetAllDatabase();
	});

	test('creates a notification', async () => {
		try {
			await mockApi.notifications.createNotification(testNotification);
			const notifs = await mockApi.notifications.getNotifications();
			expect(notifs).toBeTruthy();
			expect(notifs.length).toEqual(1);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject create a notification', async () => {
		let error: any;
		try {
			const { from, ...incompleteData } = testNotification;
			await mockApi.notifications.createNotification({
				from: { alias: '', pub: '' },
				...incompleteData,
			});
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ValidationError);
	});

	test('removes a notification', async () => {
		try {
			await mockApi.notifications.createNotification(testNotification);
			let notifications = await mockApi.notifications.getNotifications();
			const { notificationId } = notifications[0];
			await mockApi.notifications.removeNotification({ notificationId });
			notifications = await mockApi.notifications.getNotifications();
			expect(notifications).toBeTruthy();
			expect(notifications.length).toEqual(0);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject remove notification', async () => {
		let error: any;
		try {
			await mockApi.notifications.removeNotification({ notificationId: '' });
		} catch (e) {
			error = e;
		}
		expect(error).toBeInstanceOf(ValidationError);
	});

	test('get current notifications', async () => {
		try {
			await Promise.all([
				mockApi.notifications.createNotification(testNotification),
				mockApi.notifications.createNotification(testNotification),
			]);
			const notifs = await mockApi.notifications.getNotifications();
			expect(notifs).toBeTruthy();
			expect(notifs.length).toEqual(2);
		} catch (e) {
			expect(e).toBeUndefined();
		}
	});

	test('reject get current notifications', async () => {
		let error: any;
		try {
			await mockApi.notifications.getNotifications();
		} catch (e) {
			error = e;
		}
		expect(error).toMatch('no notifications found');
	});
});
