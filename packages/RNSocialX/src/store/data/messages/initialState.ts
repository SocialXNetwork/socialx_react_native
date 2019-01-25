import { MESSAGE_TYPES } from '../../../types';
import { IMessage, IState } from './Types';

const messages: IMessage[] = [
	{
		id: '0',
		type: MESSAGE_TYPES.TEXT,
		content: 'What are you doing tomorrow?',
		timestamp: Number(new Date(2018, 2, 13)),
	},
	{
		id: '1',
		type: MESSAGE_TYPES.TEXT,
		content:
			'How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today?',
		timestamp: Number(new Date(2018, 3, 13)),
	},
	{
		id: '3',
		type: MESSAGE_TYPES.TEXT,
		content: 'Why are you doing this?',
		timestamp: Number(new Date(2018, 4, 13)),
	},
	{
		id: '4',
		type: MESSAGE_TYPES.TEXT,
		content: 'What are you doing tomorrow?',
		timestamp: Number(new Date(2018, 5, 13)),
	},
	{
		id: '5',
		type: MESSAGE_TYPES.TEXT,
		content:
			'How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today?',
		timestamp: Number(new Date(2018, 6, 13)),
	},
	{
		id: '6',
		type: MESSAGE_TYPES.TEXT,
		content: 'Why are you doing this?',
		timestamp: Number(new Date(2018, 7, 20)),
	},
	{
		id: '7',
		type: MESSAGE_TYPES.TEXT,
		content:
			'How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today?',
		timestamp: Number(new Date(2018, 8, 13)),
		self: true,
	},
	{
		id: '8',
		type: MESSAGE_TYPES.TEXT,
		content:
			'How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today?',
		timestamp: Number(new Date(2018, 9, 13)),
		self: true,
	},
	{
		id: '9',
		type: MESSAGE_TYPES.TEXT,
		content: 'Why are you doing this?',
		timestamp: Number(new Date(2018, 10, 20)),
		self: true,
	},
];

messages.sort((x, y) => x.timestamp - y.timestamp);
for (let i = 0; i < messages.length - 1; i++) {
	const current = messages[i];
	const next = messages[i + 1];
	const previous = messages[i - 1];

	if (!current.consecutive) {
		current.consecutive = {
			first: false,
			middle: false,
			last: false,
		};
	}

	if (!next.consecutive) {
		next.consecutive = {
			first: false,
			middle: false,
			last: false,
		};
	}

	if (i > 0 && !previous.consecutive) {
		previous.consecutive = {
			first: false,
			middle: false,
			last: false,
		};
	}

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
