import { MESSAGE_TYPES } from '../../../types';
import { IMessage, IState } from './Types';

const messages: IMessage[] = [
	{
		id: '1',
		type: MESSAGE_TYPES.TEXT,
		content: 'What are you doing tomorrow?',
		timestamp: Number(new Date(2018, 2, 13)),
		seen: true,
		sent: true,
		consecutive: {
			first: false,
			middle: false,
			last: false,
		},
	},
	{
		id: '2',
		type: MESSAGE_TYPES.TEXT,
		content:
			'How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today?',
		timestamp: Number(new Date(2018, 3, 13)),
		seen: false,
		sent: true,
		consecutive: {
			first: false,
			middle: false,
			last: false,
		},
	},
	{
		id: '3',
		type: MESSAGE_TYPES.TEXT,
		content: 'Why are you doing this?',
		timestamp: Number(new Date(2018, 4, 13)),
		seen: true,
		sent: true,
		consecutive: {
			first: false,
			middle: false,
			last: false,
		},
	},
	{
		id: '4',
		type: MESSAGE_TYPES.TEXT,
		content: 'What are you doing tomorrow?',
		timestamp: Number(new Date(2018, 5, 13)),
		seen: true,
		sent: true,
		consecutive: {
			first: false,
			middle: false,
			last: false,
		},
	},
	{
		id: '5',
		type: MESSAGE_TYPES.TEXT,
		content:
			'How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today?',
		timestamp: Number(new Date(2018, 6, 13)),
		self: true,
		seen: false,
		sent: true,
		consecutive: {
			first: false,
			middle: false,
			last: false,
		},
	},
	{
		id: '6',
		type: MESSAGE_TYPES.TEXT,
		content: 'Why are you doing this?',
		timestamp: Number(new Date(2019, 0, 27, 14, 20)),
		self: true,
		seen: true,
		sent: true,
		consecutive: {
			first: false,
			middle: false,
			last: false,
		},
	},
	{
		id: '7',
		type: MESSAGE_TYPES.TEXT,
		content:
			'How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today?',
		timestamp: Number(new Date(2019, 0, 28, 14, 20)),
		self: true,
		seen: false,
		sent: true,
		consecutive: {
			first: false,
			middle: false,
			last: false,
		},
	},
	{
		id: '8',
		type: MESSAGE_TYPES.TEXT,
		content:
			'How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today?',
		timestamp: Number(new Date(2019, 0, 28, 15, 20)),
		self: true,
		seen: true,
		sent: true,
		consecutive: {
			first: false,
			middle: false,
			last: false,
		},
	},
	{
		id: '9',
		type: MESSAGE_TYPES.TEXT,
		content: 'Why are you doing this?',
		timestamp: Number(new Date(2019, 0, 28, 15, 25)),
		self: false,
		seen: true,
		sent: true,
		consecutive: {
			first: false,
			middle: false,
			last: false,
		},
	},
];

messages.sort((x, y) => x.timestamp - y.timestamp);
for (let i = 0; i < messages.length - 1; i++) {
	const current = messages[i];
	const next = messages[i + 1];
	const previous = messages[i - 1];

	if ((current.self && next.self) || (!current.self && !next.self)) {
		current.consecutive.first = true;
		next.consecutive.last = true;

		if (
			(current.consecutive.last && previous.consecutive!.first) ||
			(current.consecutive.last && previous.consecutive!.middle)
		) {
			current.consecutive.first = false;
			current.consecutive.last = false;
			current.consecutive.middle = true;
		}
	}
}

const initialState: IState = {
	messages: {
		jaakee: messages,
		hackerman: messages,
	},
};

export default initialState;
