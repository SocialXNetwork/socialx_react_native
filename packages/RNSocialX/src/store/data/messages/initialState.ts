import { MESSAGE_TYPES } from '../../../types';
import { IState } from './Types';

const messages = [
	{
		id: '0',
		type: MESSAGE_TYPES.TEXT,
		content: 'What are you doing tomorrow?',
		timestamp: Number(new Date(2018, 2, 13)),
	},
	{
		id: '1',
		type: MESSAGE_TYPES.TEXT,
		content: 'How are you doing today?',
		timestamp: Number(new Date(2018, 8, 13)),
	},
	{
		id: '3',
		type: MESSAGE_TYPES.TEXT,
		content: 'Why are you doing this?',
		timestamp: Number(new Date(2019, 0, 20)),
	},
];

messages.sort((x, y) => y.timestamp - x.timestamp);

const initialState: IState = {
	messages: {
		jaakee: messages,
	},
};

export default initialState;
