// TODO: @serkan remove this mock, or at least it should probably be only used in stories
// also ask @alex @ionut about suggestedItems
import {
	ICurrentUser,
	ILike,
	ISimpleComment,
	ISuggestionCardItem,
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

export const suggestedItems: ISuggestionCardItem[] = [
	{
		userId: '101',
		fullName: 'test user 1',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		relationship: SearchResultKind.NotFriend,
	},
	{
		userId: '102',
		fullName: 'test user 2',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		relationship: SearchResultKind.NotFriend,
	},
	{
		userId: '103',
		fullName: 'test user 3',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		relationship: SearchResultKind.Friend,
	},
	{
		userId: '104',
		fullName: 'test user 4',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		relationship: SearchResultKind.Friend,
	},
	{
		userId: '105',
		fullName: 'test user 5',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		relationship: SearchResultKind.NotFriend,
	},
	{
		userId: '106',
		fullName: 'test user 6',
		userName: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		relationship: SearchResultKind.NotFriend,
	},
];

// TODO: @alex @ionut why do we have actions and data props mixed together like this?
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
	{
		id: '2',
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
		suggested: suggestedItems,
		noInput: false,
		getText: (value) => value,
		marginBottom: 0,
		currentUserAvatarURL: avatar,
	},
	{
		id: '3',
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
