import { ApiError, ValidationError } from '../utils/errors';

describe('errors', () => {
	beforeEach(() => {
		delete process.env.DEBUG;
	});

	test('ApiError instantiates correctly', () => {
		const extErr = new ApiError('something happened', {
			details: { bleep: 'bloop' },
			status: '420',
			initialRequestBody: { username: 'username' },
			statusReturned: 200,
		});
		expect(extErr).toBeInstanceOf(ApiError);
		expect(extErr).toHaveProperty('name', 'ApiError');
		expect(extErr).toHaveProperty('message', 'something happened');
		expect(extErr).toHaveProperty(['details', 'bleep'], 'bloop');
		expect(extErr).toHaveProperty('message', 'something happened');
		expect(extErr).toHaveProperty(
			['initialRequestBody', 'username'],
			'username',
		);
		expect(extErr.loggedMessage.length).toEqual(1);
		// console.log(JSON.stringify(extErr, null, 2));
		// console.log(extErr.stack);
		// extErr.log();
	});

	test('ApiError logs details to debug', () => {
		process.env.DEBUG = 'true';
		const apiErr = new ApiError('something happened', {
			details: { bleep: 'bloop' },
			status: '420',
			initialRequestBody: { username: 'username' },
			statusReturned: 200,
		});
		expect(apiErr).toBeInstanceOf(ApiError);
		expect(apiErr).toHaveProperty('name', 'ApiError');
		expect(apiErr).toHaveProperty('message', 'something happened');
		expect(apiErr).toHaveProperty(
			['initialRequestBody', 'username'],
			'username',
		);
		expect(apiErr.loggedMessage.length).toEqual(4);
		// console.log(JSON.stringify(extErr, null, 2));
		// console.log(extErr.stack);
		// apiErr.log();
	});

	test('ValidationError instantiates correctly', () => {
		const valErr = new ValidationError('something happened', {
			details: { bleep: 'bloop' },
			status: '420',
			validationInput: { bleep: 'bloop' },
		});
		expect(valErr).toBeInstanceOf(ValidationError);
		expect(valErr).toHaveProperty('name', 'ValidationError');
		expect(valErr).toHaveProperty('message', 'something happened');
		expect(valErr).toHaveProperty(['validationInput', 'bleep'], 'bloop');
		expect(valErr.loggedMessage.length).toEqual(1);
		// console.log(JSON.stringify(extErr, null, 2));
		// console.log(extErr.stack);
		// valErr.log();
	});

	test('ValidationError logs details to debug', () => {
		process.env.DEBUG = 'true';
		const valErr = new ValidationError('something happened', {
			details: { bleep: 'bloop' },
			status: '420',
			validationInput: { bleep: 'bloop' },
		});
		expect(valErr).toBeInstanceOf(ValidationError);
		expect(valErr).toHaveProperty('name', 'ValidationError');
		expect(valErr).toHaveProperty('message', 'something happened');
		expect(valErr).toHaveProperty(['validationInput', 'bleep'], 'bloop');
		expect(valErr.loggedMessage.length).toEqual(3);
		// console.log(JSON.stringify(extErr, null, 2));
		// console.log(extErr.stack);
		// valErr.log();
	});
});
