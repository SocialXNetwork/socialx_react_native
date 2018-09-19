import {AccountCurrencyData} from './components';
import {CoinSymbol} from './environment/consts';
import {
	ICryptoStats,
	ICurrentUser,
	ILike,
	ISimpleComment,
	IVisitedUser,
	IWallPostCardProps,
	MediaTypeImage,
	SearchResultKind,
} from './types';

const avatar = 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350';

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

export const posts: IWallPostCardProps[] = [
	{
		id: '1',
		postText: 'Lorem ipsum dolor sit amet.',
		location: 'Dolor',
		taggedFriends: [{fullName: 'Lorem'}, {fullName: 'Ipsum'}],
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
		onImagePress: () => {
			/**/
		},
		onLikeButtonPress: () => {
			/**/
		},
		onDeletePress: () => {
			/**/
		},
		onUserPress: () => {
			/**/
		},
		onCommentPress: () => {
			/**/
		},
		onAddComment: () => {
			/**/
		},
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
		getText: (value) => value,
		marginBottom: 0,
		currentUserAvatarURL: avatar,
	},
];

export const currentUser: ICurrentUser = {
	userId: '999',
	avatarURL: avatar,
	fullName: 'Alex Sirbu',
	userName: 'alexsirbu',
	email: 'alex.sirbu@test.com',
	aboutMeText: 'Lorem ipsum dolor sit amet',
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
	miningEnabled: false,
};

export const visitedUser: IVisitedUser = {
	userId: '999',
	avatarURL: avatar,
	fullName: 'Alex Sirbu',
	userName: 'alexsirbu',
	aboutMeText: 'Lorem ipsum dolor sit amet',
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
	relationship: SearchResultKind.NotFriend,
};

export const suggestedItems = [
	{
		userId: '101',
		name: 'test user 1',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: true,
	},
	{
		userId: '102',
		name: 'test user 2',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: false,
	},
	{
		userId: '103',
		name: 'test user 3',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: true,
	},
	{
		userId: '104',
		name: 'test user 4',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: true,
	},
	{
		userId: '105',
		name: 'test user 5',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: false,
	},
	{
		userId: '106',
		name: 'test user 6',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: false,
	},
];

const digitalCoins: AccountCurrencyData[] = [
	{
		coinSymbol: CoinSymbol.SOCX,
		coinAmount: 799151.311,
		usdValue: 34621,
		trendPercentage: 4.5,
		graphData: [0.2, 0.22, 0.19, 0.15, 0.18, 0.25, 0.23, 0.26, 0.2, 0.22, 0.19, 0.15, 0.18, 0.25, 0.23, 0.26],
	},
	{
		coinSymbol: CoinSymbol.ETH,
		coinAmount: 10.578,
		usdValue: 1341415,
		trendPercentage: -2.6,
		graphData: [800, 850, 820, 840, 780, 810, 750, 720, 800, 850, 820, 840, 780, 810, 750, 720],
	},
];

export const cryptoStats: ICryptoStats = {
	coins: 53680,
	contribution: 42205,
	returnPercentage: 27.21,
	digitalCoins,
};
