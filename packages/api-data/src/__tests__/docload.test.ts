import { dataApiFactory } from '../__testHelpers/mockApi';
import records from '../__testHelpers/records';
import { IGunInstance } from '../types';

const testAcc = records.getTestAccount();

let mockApi: ReturnType<typeof dataApiFactory>;
let gun: IGunInstance;

const testLevelData = {
	levelA: {
		levelB: {
			levelC: {
				levelD: {
					levelEA: {
						a: 'a',
						b: 'b',
						c: 'c',
						d: {
							'd-a': {
								e: 'e on d-a',
								f: 'f on d-a',
							},
							'd-b': {
								e: 'e on d-b',
								f: 'f on d-b',
							},
							'd-c': {
								e: 'e on d-c',
								f: 'f on d-c',
							},
						},
						e: {
							'e-a': {
								f: 'f on e-a',
								g: 'g on e-a',
							},
							'e-b': {
								f: 'f on e-b',
								g: 'g on e-b',
							},
							'e-c': {
								f: 'f on e-c',
								g: 'g on e-c',
							},
						},
					},
					levelEB: {
						a: 'a',
						b: 'b',
						c: 'c',
						d: {
							'd-a': {
								e: 'e on d-a',
								f: 'f on d-a',
							},
							'd-b': {
								e: 'e on d-b',
								f: 'f on d-b',
							},
							'd-c': {
								e: 'e on d-c',
								f: 'f on d-c',
							},
						},
						e: {
							'e-a': {
								f: 'f on e-a',
								g: 'g on e-a',
							},
							'e-b': {
								f: 'f on e-b',
								g: 'g on e-b',
							},
							'e-c': {
								f: 'f on e-c',
								g: 'g on e-c',
							},
						},
					},
					levelEC: {
						a: 'a',
						b: 'b',
						c: 'c',
						d: {
							'd-a': {
								e: 'e on d-a',
								f: 'f on d-a',
							},
							'd-b': {
								e: 'e on d-b',
								f: 'f on d-b',
							},
							'd-c': {
								e: 'e on d-c',
								f: 'f on d-c',
							},
						},
						e: {
							'e-a': {
								f: 'f on e-a',
								g: 'g on e-a',
							},
							'e-b': {
								f: 'f on e-b',
								g: 'g on e-b',
							},
							'e-c': {
								f: 'f on e-c',
								g: 'g on e-c',
							},
						},
					},
				},
			},
		},
	},
};

const docLoadApi = () =>
	new Promise<typeof testLevelData>((r, e) => {
		gun.get('db').docLoad((data) => {
			if (!data) {
				e();
			}
			r(data as any);
		});
	});

describe('docLoad ext', () => {
	beforeEach(async () => {
		jest.setTimeout(30 * 1000);
		mockApi = dataApiFactory(testAcc);
		gun = mockApi.gun;
		gun.get('db').put(testLevelData);
	});

	afterEach(async () => {
		await mockApi.resetAllDatabase();
	});

	test.only('loads entire document', async () => {
		const rdata = await docLoadApi();
		expect(rdata).toMatchObject(testLevelData);
	});
});
