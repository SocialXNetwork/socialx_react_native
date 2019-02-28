import { MESSAGE_TYPES } from '../../../types';
import { IMessage, IState } from './Types';

const messages: IMessage[] = [
	{
		id: '1',
		type: MESSAGE_TYPES.TEXT,
		content: 'These messages are not real.',
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
		content: 'this is a test :)',
		timestamp: Number(new Date(2018, 3, 13)),
		seen: false,
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
