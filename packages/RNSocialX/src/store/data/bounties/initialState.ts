import { IBounties, IBounty, IState } from './Types';

const bounties: IBounty[] = [
	{
		id: '1',
		content: 'What are you doing tomorrow?',
		timestamp: Number(new Date(2018, 2, 13)),
		reward: 3000,
		claimed: false,
		icon: '',
	},
	{
		id: '2',
		content: 'What are you doing tomorrow?',
		timestamp: Number(new Date(2018, 2, 13)),
		reward: 3000,
		claimed: false,
		icon: '',
	},
	{
		id: '3',
		content: 'What are you doing tomorrow?',
		timestamp: Number(new Date(2018, 2, 13)),
		reward: 3000,
		claimed: false,
		icon: '',
	},
	{
		id: '4',
		content: 'What are you doing tomorrow?',
		timestamp: Number(new Date(2018, 2, 13)),
		reward: 3000,
		claimed: false,
		icon: '',
	},
	{
		id: '5',
		content: 'What are you doing tomorrow?',
		timestamp: Number(new Date(2018, 2, 13)),
		reward: 3000,
		claimed: false,
		icon: '',
	},
	{
		id: '6',
		content: 'What are you doing tomorrow?',
		timestamp: Number(new Date(2018, 2, 13)),
		reward: 3000,
		claimed: false,
		icon: '',
	},
	{
		id: '7',
		content: 'What are you doing tomorrow?',
		timestamp: Number(new Date(2018, 2, 13)),
		reward: 3000,
		claimed: false,
		icon: '',
	},
	{
		id: '8',
		content: 'What are you doing tomorrow?',
		timestamp: Number(new Date(2018, 2, 13)),
		reward: 3000,
		claimed: false,
		icon: '',
	},
	{
		id: '9',
		content: 'What are you doing tomorrow?',
		timestamp: Number(new Date(2018, 2, 13)),
		reward: 3000,
		claimed: false,
		icon: '',
	},
];

bounties.sort((x, y) => x.timestamp - y.timestamp);

const initialState: IState = {
	bounties: {},
};

export default initialState;
