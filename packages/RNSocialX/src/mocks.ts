import {
	FRIEND_TYPES,
	ICurrentUser,
	ITransactionData,
	ITrendingCategoriesItem,
	ITrendingContentItem,
	IUserEntry,
	IWallPost,
	MediaTypeImage,
	MediaTypeVideo,
	TransactionType,
} from './types';

import { CoinSymbol, IRewardsHistoryData } from './environment/consts';

import dictionary from './store/app/i18n/data/dictionary.en';
import { getText } from './store/app/i18n/helpers';

export const getTextMock = (key: string, ...args: Array<string | number>) => {
	return getText(dictionary, key, ...args);
};

const avatar =
	'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350';

const topCommentIds = ['topCommentId1', 'topCommentId2'];

export const suggestedItems: IUserEntry[] = [
	{
		userId: '101',
		avatar: 'https://lifehacks.io/wp-content/uploads/21-Questions-to-ask-a-guy.jpg',
		fullName: 'Seth Saunders',
		userName: 'sethsaunders',
		relationship: FRIEND_TYPES.NOT_FRIEND,
	},
	{
		userId: '102',
		avatar:
			'https://static1.squarespace.com/static/5717fbc72eeb81a7600203c4/t/57361baa45bf2122c02109d3/1463163822530/teresa-ting-104-WEB.jpg',
		fullName: 'Teresa Lamb',
		userName: 'terlamb',
		relationship: FRIEND_TYPES.NOT_FRIEND,
	},
	{
		userId: '103',
		avatar:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhxxOvVEmfKWgIxdz1Xvd0zTKY4oHlC8E709FF91o5FMTirI2T',
		fullName: 'Sophie Smith',
		userName: 'sophsmt',
		relationship: FRIEND_TYPES.MUTUAL,
	},
	{
		userId: '104',
		avatar:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlhQDjvfpOkYBNz_sFX6egUWv-tKgr9iwb9S0ECK5Ll8C-I9Oj',
		fullName: 'Cory Maxwell',
		userName: 'corymaxwell',
		relationship: FRIEND_TYPES.PENDING,
	},
	{
		userId: '105',
		avatar:
			'https://yt3.ggpht.com/a-/AN66SAyxvKvpstRZN6-LzcuggRm6kEQs-lKW5cOg6g=s900-mo-c-c0xffffffff-rj-k-no',
		fullName: 'Claudia Kulmitzer',
		userName: 'claudiam',
		relationship: FRIEND_TYPES.NOT_FRIEND,
	},
];

export const posts: IWallPost[] = [
	{
		postId: '1',
		postText: 'Lorem ipsum dolor sit amet.',
		location: 'Dolor',
		taggedFriends: [{ fullName: 'Lorem' }, { fullName: 'Ipsum' }],
		timestamp: new Date(Date.now()),
		owner: {
			userId: 'testgggg',
			fullName: 'Test GGGG',
			avatar,
		},
		numberOfSuperLikes: 0,
		numberOfComments: 1,
		numberOfWalletCoins: 0,
		likedByCurrentUser: false,
		removable: false,
		media: {
			objects: [
				{
					hash: '131289fsdf03yr9hehdiwb32',
					type: MediaTypeVideo,
					extension: 'mp4',
					size: 51231,
				},
			],
			postId: '1',
		},
		likeIds: ['likeId1', 'likeId2'],
		commentIds: [],
		topCommentIds,
		loading: false,
		suggested: undefined,
		offensiveContent: false,
	},
	{
		postId: '2',
		postText: 'Lorem ipsum dolor sit amet.',
		location: 'Dolor',
		taggedFriends: [{ fullName: 'Lorem' }, { fullName: 'Ipsum' }],
		timestamp: new Date(Date.now()),
		owner: {
			userId: 'testgggg',
			fullName: 'Test GGGG',
			avatar,
		},
		numberOfSuperLikes: 0,
		numberOfComments: 1,
		numberOfWalletCoins: 0,
		likedByCurrentUser: false,
		removable: false,
		media: {
			objects: [
				{
					hash: '131289fsdf03yr9hehdiwb32',
					type: MediaTypeVideo,
					extension: 'mp4',
					size: 51231,
				},
			],
			postId: '2',
		},
		likeIds: ['likeId1', 'likeId2'],
		commentIds: [],
		topCommentIds,
		loading: false,
		suggested: suggestedItems,
		offensiveContent: true,
	},
	{
		postId: '3',
		postText: 'Lorem ipsum dolor sit amet.',
		location: 'Dolor',
		taggedFriends: [{ fullName: 'Lorem' }, { fullName: 'Ipsum' }],
		timestamp: new Date(Date.now()),
		owner: {
			userId: 'testgggg',
			fullName: 'Test GGGG',
			avatar,
		},
		numberOfSuperLikes: 0,
		numberOfComments: 1,
		numberOfWalletCoins: 0,
		likedByCurrentUser: false,
		removable: false,
		media: {
			objects: [
				{
					hash: '131289fsdf03yr9hehdiwb32',
					type: MediaTypeVideo,
					extension: 'mp4',
					size: 51231,
				},
			],
			postId: '3',
		},
		likeIds: ['likeId1', 'likeId2'],
		commentIds: [],
		topCommentIds,
		loading: false,
		suggested: undefined,
		offensiveContent: false,
	},
];

export const currentUser: ICurrentUser = {
	userId: '999',
	avatar,
	fullName: 'Test GGGG',
	userName: 'testgggg',
	email: 'testgggg@test.com',
	description: 'Lorem ipsum dolor sit amet',
	pub: 'rPZqFYcR01E81UiAtzkY0tV2LmxnNHtQG-UwqfvxLyQ.4Xc5xwCqzFaEOJpu7ftadiXXQLE7sbm7ETs23lzC96E',
	miningEnabled: false,
	shareDataEnabled: true,
	numberOfLikes: 25,
	numberOfPhotos: 1,
	numberOfFriends: 2,
	numberOfComments: 87,
	media: {
		objects: [
			{
				hash: '131289fsdf03yr9hehdiwb32',
				type: MediaTypeVideo,
				extension: 'mp4',
				size: 51231,
			},
		],
		postId: '3',
	},
	recentPosts: posts,
};

const CATEGORY_IMAGE_URL =
	'https://images.ctfassets.net/o59xlnp87tr5/nywabPmH5Y6W4geG8IYuk/0a59905671f8d637350df8e7ec9e7fb9/backgrounds-min.jpg?w=360&h=240&fit=fill';
export const trendingCategoriesItems: ITrendingCategoriesItem[] = [
	{
		id: '1',
		name: 'For you',
		url: CATEGORY_IMAGE_URL,
	},
	{
		id: '2',
		name: 'Cars',
		url: CATEGORY_IMAGE_URL,
	},
	{
		id: '3',
		name: 'Food',
		url: CATEGORY_IMAGE_URL,
	},
	{
		id: '4',
		name: 'Music',
		url: CATEGORY_IMAGE_URL,
	},
	{
		id: '5',
		name: 'Fashion',
		url: CATEGORY_IMAGE_URL,
	},
	{
		id: '6',
		name: 'Whatever',
		url: CATEGORY_IMAGE_URL,
	},
];

const CONTENT_IMAGE_URL = 'https://www.w3schools.com/w3css/img_lights.jpg';
const VIDEO_URL = 'http://techslides.com/demos/sample-videos/small.mp4';
const VIDEO_PLACEHOLDER = 'https://www.w3schools.com/w3images/fjords.jpg';
export const trendingContentItems: ITrendingContentItem[] = [
	{
		name: 'For you',
		content: [
			[
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Video', url: VIDEO_PLACEHOLDER, postId: '1875' },
			],
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			[
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Video', url: VIDEO_PLACEHOLDER, postId: '1875' },
			],
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
		],
	},
	{
		name: 'Cars',
		content: [
			[
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Video', url: VIDEO_PLACEHOLDER, postId: '1875' },
			],
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			[
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Video', url: VIDEO_PLACEHOLDER, postId: '1875' },
			],
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
		],
	},
	{
		name: 'Food',
		content: [
			[
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Video', url: VIDEO_PLACEHOLDER, postId: '1875' },
			],
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			[
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Video', url: VIDEO_PLACEHOLDER, postId: '1875' },
			],
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
		],
	},
	{
		name: 'Music',
		content: [
			[
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Video', url: VIDEO_PLACEHOLDER, postId: '1875' },
			],
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			[
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Video', url: VIDEO_PLACEHOLDER, postId: '1875' },
			],
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
		],
	},
	{
		name: 'Fashion',
		content: [
			[
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Video', url: VIDEO_PLACEHOLDER, postId: '1875' },
			],
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			[
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Video', url: VIDEO_PLACEHOLDER, postId: '1875' },
			],
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
		],
	},
	{
		name: 'Whatever',
		content: [
			[
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Video', url: VIDEO_PLACEHOLDER, postId: '1875' },
			],
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			[
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
				{ type: 'Video', url: VIDEO_PLACEHOLDER, postId: '1875' },
			],
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875', middle: true },
			{ type: 'Image', url: CONTENT_IMAGE_URL, postId: '1875' },
		],
	},
];

export const dailyHistory: IRewardsHistoryData[] = [
	{
		date: '1st',
		amount: 39,
		currency: 'SOCX',
	},
	{
		date: '2nd',
		amount: 12,
		currency: 'SOCX',
	},
	{
		date: '3rd',
		amount: 43,
		currency: 'SOCX',
	},
	{
		date: '4th',
		amount: 17,
		currency: 'SOCX',
	},
	{
		date: '5th',
		amount: 39,
		currency: 'SOCX',
	},
	{
		date: '6th',
		amount: 67,
		currency: 'SOCX',
	},
	{
		date: '7th',
		amount: 50,
		currency: 'SOCX',
	},
	{
		date: '8th',
		amount: 32,
		currency: 'SOCX',
	},
	{
		date: '9th',
		amount: 10,
		currency: 'SOCX',
	},
	{
		date: '10th',
		amount: 27,
		currency: 'SOCX',
	},
	{
		date: '11st',
		amount: 78,
		currency: 'SOCX',
	},
	{
		date: '12nd',
		amount: 87,
		currency: 'SOCX',
	},
	{
		date: '13rd',
		amount: 39,
		currency: 'SOCX',
	},
	{
		date: '14th',
		amount: 12,
		currency: 'SOCX',
	},
	{
		date: '15th',
		amount: 43,
		currency: 'SOCX',
	},
	{
		date: '16th',
		amount: 17,
		currency: 'SOCX',
	},
	{
		date: '17th',
		amount: 39,
		currency: 'SOCX',
	},
	{
		date: '18th',
		amount: 67,
		currency: 'SOCX',
	},
	{
		date: '19th',
		amount: 50,
		currency: 'SOCX',
	},
	{
		date: '20th',
		amount: 32,
		currency: 'SOCX',
	},
	{
		date: '21st',
		amount: 10,
		currency: 'SOCX',
	},
	{
		date: '22nd',
		amount: 27,
		currency: 'SOCX',
	},
	{
		date: '23rd',
		amount: 78,
		currency: 'SOCX',
	},
	{
		date: '24th',
		amount: 87,
		currency: 'SOCX',
	},
	{
		date: '25th',
		amount: 67,
		currency: 'SOCX',
	},
	{
		date: '26th',
		amount: 50,
		currency: 'SOCX',
	},
	{
		date: '27th',
		amount: 32,
		currency: 'SOCX',
	},
	{
		date: '28th',
		amount: 10,
		currency: 'SOCX',
	},
	{
		date: '29th',
		amount: 27,
		currency: 'SOCX',
	},
	{
		date: '30th',
		amount: 78,
		currency: 'SOCX',
	},
	{
		date: '31st',
		amount: 87,
		currency: 'SOCX',
	},
];

export const monthlyHistory: IRewardsHistoryData[] = [
	{
		date: 'Jan',
		amount: 39,
		currency: 'SOCX',
	},
	{
		date: 'Feb',
		amount: 12,
		currency: 'SOCX',
	},
	{
		date: 'March',
		amount: 43,
		currency: 'SOCX',
	},
	{
		date: 'April',
		amount: 17,
		currency: 'SOCX',
	},
	{
		date: 'May',
		amount: 39,
		currency: 'SOCX',
	},
	{
		date: 'June',
		amount: 67,
		currency: 'SOCX',
	},
	{
		date: 'July',
		amount: 50,
		currency: 'SOCX',
	},
	{
		date: 'Aug',
		amount: 32,
		currency: 'SOCX',
	},
	{
		date: 'Sep',
		amount: 10,
		currency: 'SOCX',
	},
	{
		date: 'Oct',
		amount: 27,
		currency: 'SOCX',
	},
	{
		date: 'Nov',
		amount: 78,
		currency: 'SOCX',
	},
	{
		date: 'Dec',
		amount: 87,
		currency: 'SOCX',
	},
];

export const transactions: ITransactionData[] = [
	{
		id: '1',
		type: TransactionType.Bought,
		firstAmount: 23,
		firstCoin: CoinSymbol.SOCX,
		secondAmount: 0.2,
		secondCoin: CoinSymbol.ETH,
		date: new Date(2018, 2, 13),
	},
	{
		id: '2',
		type: TransactionType.Sold,
		firstAmount: 0.2,
		firstCoin: CoinSymbol.ETH,
		secondAmount: 23,
		secondCoin: CoinSymbol.SOCX,
		date: new Date(2018, 1, 17),
	},
	{
		id: '3',
		type: TransactionType.Sold,
		firstAmount: 23,
		firstCoin: CoinSymbol.SOCX,
		secondAmount: 0.2,
		secondCoin: CoinSymbol.ETH,
		date: new Date(2018, 4, 8),
	},
	{
		id: '4',
		type: TransactionType.Bought,
		firstAmount: 0.2,
		firstCoin: CoinSymbol.ETH,
		secondAmount: 23,
		secondCoin: CoinSymbol.SOCX,
		date: new Date(2018, 5, 1),
	},
	{
		id: '5',
		type: TransactionType.Sold,
		firstAmount: 0.2,
		firstCoin: CoinSymbol.ETH,
		secondAmount: 23,
		secondCoin: CoinSymbol.SOCX,
		date: new Date(2018, 11, 12),
	},
];
