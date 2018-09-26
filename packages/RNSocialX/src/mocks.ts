// TODO: @serkan remove this mock, or at least it should probably be only used in stories
// also ask @alex @ionut about suggestedItems
import {
	ICurrentUser,
	ILike,
	ISearchResultData,
	ISimpleComment,
	ITransactionData,
	ITrendingCategoriesItem,
	ITrendingContentItem,
	IWallPostCardData,
	MediaTypeImage,
	MediaTypeVideo,
	SearchResultKind,
	TransactionType,
} from './types';

import { CoinSymbol } from './environment/consts';

const avatar =
	'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350';

const likes: ILike[] = [
	{
		userId: '1',
		userName: 'johndoe',
	},
	{
		userId: '2',
		userName: 'janedoe',
	},
];

const bestComments: ISimpleComment[] = [
	{
		id: '1',
		text: 'Lorem ipsum dolor sit amet',
		likes,
		owner: {
			userId: '2',
			userName: 'janedoe',
		},
	},
	{
		id: '2',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		likes,
		owner: {
			userId: '1',
			userName: 'johndoe',
		},
	},
];

export const suggestedItems: ISearchResultData[] = [
	{
		userId: '101',
		fullName: 'test user 1',
		userName: 'testname',
		location: 'Timisoara',
		avatarURL:
			'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		relationship: SearchResultKind.NotFriend,
	},
	{
		userId: '102',
		fullName: 'test user 2',
		userName: 'testname',
		location: 'Timisoara',
		avatarURL:
			'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		relationship: SearchResultKind.NotFriend,
	},
	{
		userId: '103',
		fullName: 'test user 3',
		userName: 'testname',
		location: 'Timisoara',
		avatarURL:
			'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		relationship: SearchResultKind.Friend,
	},
	{
		userId: '104',
		fullName: 'test user 4',
		userName: 'testname',
		location: 'Timisoara',
		avatarURL:
			'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		relationship: SearchResultKind.Friend,
	},
	{
		userId: '105',
		fullName: 'test user 5',
		userName: 'testname',
		location: 'Timisoara',
		avatarURL:
			'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		relationship: SearchResultKind.NotFriend,
	},
	{
		userId: '106',
		fullName: 'test user 6',
		userName: 'testname',
		location: 'Timisoara',
		avatarURL:
			'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		relationship: SearchResultKind.NotFriend,
	},
];

export const posts: IWallPostCardData[] = [
	{
		id: '1',
		postText: 'Lorem ipsum dolor sit amet.',
		location: 'Dolor',
		taggedFriends: [{ fullName: 'Lorem' }, { fullName: 'Ipsum' }],
		timestamp: new Date(Date.now()),
		owner: {
			userId: '999',
			fullName: 'Alex Sirbu',
			avatarURL: avatar,
		},
		governanceVersion: false,
		numberOfSuperLikes: 0,
		numberOfComments: 1,
		numberOfWalletCoins: 0,
		likedByMe: false,
		canDelete: false,
		media: [
			{
				url: 'https://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
				hash: '131289fsdf03yr9hehdiwb32',
				type: MediaTypeVideo,
				extension: 'mp4',
				size: 51231,
				numberOfLikes: 0,
				numberOfComments: 0,
			},
		],
		likes,
		bestComments,
		listLoading: false,
		suggested: undefined,
		noInput: false,
		marginBottom: 0,
		currentUserAvatarURL: avatar,
		contentOffensive: false,
	},
	{
		id: '2',
		postText: 'Lorem ipsum dolor sit amet.',
		location: 'Dolor',
		taggedFriends: [{ fullName: 'Lorem' }, { fullName: 'Ipsum' }],
		timestamp: new Date(Date.now()),
		owner: {
			userId: '999',
			fullName: 'Alex Sirbu',
			avatarURL: avatar,
		},
		governanceVersion: false,
		numberOfSuperLikes: 0,
		numberOfComments: 1,
		numberOfWalletCoins: 0,
		likedByMe: false,
		canDelete: false,
		media: [
			{
				url:
					'https://images.unsplash.com/photo-1530482817083-29ae4b92ff15?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44f4aebbd1e1371d5bf7dc22016c5d29&w=1000&q=80',
				hash: '131289fsdf03yr9hehdiwb32',
				type: MediaTypeImage,
				extension: 'jpg',
				size: 51231,
				numberOfLikes: 0,
				numberOfComments: 0,
			},
		],
		likes,
		bestComments,
		listLoading: false,
		suggested: suggestedItems,
		noInput: false,
		marginBottom: 0,
		currentUserAvatarURL: avatar,
		contentOffensive: true,
	},
	{
		id: '3',
		postText: 'Lorem ipsum dolor sit amet.',
		location: 'Dolor',
		taggedFriends: [{ fullName: 'Lorem' }, { fullName: 'Ipsum' }],
		timestamp: new Date(Date.now()),
		owner: {
			userId: '999',
			fullName: 'Alex Sirbu',
			avatarURL: avatar,
		},
		governanceVersion: false,
		numberOfSuperLikes: 0,
		numberOfComments: 1,
		numberOfWalletCoins: 0,
		likedByMe: false,
		canDelete: false,
		media: [
			{
				url:
					'https://images.unsplash.com/photo-1530482817083-29ae4b92ff15?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44f4aebbd1e1371d5bf7dc22016c5d29&w=1000&q=80',
				hash: '131289fsdf03yr9hehdiwb32',
				type: MediaTypeImage,
				extension: 'jpg',
				size: 51231,
				numberOfLikes: 0,
				numberOfComments: 0,
			},
		],
		likes,
		bestComments,
		listLoading: false,
		suggested: undefined,
		noInput: false,
		marginBottom: 0,
		currentUserAvatarURL: avatar,
		contentOffensive: false,
	},
];

export const currentUser: ICurrentUser = {
	userId: '999',
	avatarURL: avatar,
	fullName: 'Alex Sirbu',
	userName: 'alexsirbu',
	email: 'alex.sirbu@test.com',
	aboutMeText: 'Lorem ipsum dolor sit amet',
	miningEnabled: false,
	numberOfLikes: 25,
	numberOfPhotos: 1,
	numberOfFriends: 2,
	numberOfViews: 87,
	mediaObjects: [
		{
			url:
				'https://images.unsplash.com/photo-1530482817083-29ae4b92ff15?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44f4aebbd1e1371d5bf7dc22016c5d29&w=1000&q=80',
			hash: '131289fsdf03yr9hehdiwb32',
			type: MediaTypeImage,
			extension: 'jpg',
			size: 512,
			numberOfLikes: 0,
			numberOfComments: 0,
		},
	],
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
