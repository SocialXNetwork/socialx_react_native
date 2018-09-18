import {IWallPostCardProps} from './components';
import {ICurrentUser, ILike, ISimpleComment, IVisitedUser, MediaTypeImage, SearchResultKind} from './types';

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

const posts: IWallPostCardProps[] = [
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
		marginBottom: 20,
		currentUser: {
			userId: '999',
			avatarURL: avatar,
			fullName: 'Alex Sirbu',
			userName: 'alexsirbu',
			aboutMeText: 'Lorem ipsum dolor sit amet',
			numberOfLikes: 25,
			numberOfPhotos: 1,
			numberOfFriends: 2,
			numberOfViews: 87,
			loading: false,
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
			recentPosts: [],
		},
	},
];

export const currentUser: ICurrentUser = {
	userId: '999',
	avatarURL: avatar,
	fullName: 'Alex Sirbu',
	userName: 'alexsirbu',
	aboutMeText: 'Lorem ipsum dolor sit amet',
	numberOfLikes: 25,
	numberOfPhotos: 1,
	numberOfFriends: 2,
	numberOfViews: 87,
	loading: false,
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
	loading: false,
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
