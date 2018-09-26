/**
 * TODO list:
 * 1. Props data: currentUser, visitedUser, refreshingProfile, loadingProfile
 * 2. Props actions: addFriend, likePost, unlikePost, loadMorePosts, loadMorePhotos, getText, postComment, blockUser, reportProblem
 */

import * as React from 'react';
import { currentUser, posts } from '../../../mocks';
import {
	ICurrentUser,
	ITranslatedProps,
	IVisitedUser,
	MediaTypeImage,
	SearchResultKind,
} from '../../../types';

const mock = {
	data: {
		currentUser,
		visitedUser: {
			userId: '999',
			avatarURL:
				'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350',
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
		},
		refreshingProfile: false,
		loadingProfile: false,
	},
	actions: {
		addFriend: (userId: string) => {
			/**/
		},
		loadMorePosts: (userId: string) => {
			/**/
		},
		loadMorePhotos: (userId: string) => {
			/**/
		},
		likePost: (postId: string) => {
			/**/
		},
		unlikePost: (postId: string) => {
			/**/
		},
		postComment: (commentText: string, postId: string) => {
			/**/
		},
		blockUser: (userId: string) => {
			/**/
		},
		reportProblem: (reason: string, description: string) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithUserProfileEnhancedData {
	currentUser: ICurrentUser;
	visitedUser: IVisitedUser;
	refreshingProfile: boolean;
	loadingProfile: boolean;
}

export interface IWithUserProfileEnhancedActions extends ITranslatedProps {
	addFriend: (userId: string) => void;
	likePost: (postId: string) => void;
	unlikePost: (postId: string) => void;
	loadMorePosts: (userId: string) => void;
	loadMorePhotos: (userId: string) => void;
	postComment: (postId: string, commentText: string) => void;
	blockUser: (userId: string) => void;
	reportProblem: (reason: string, description: string) => void;
}

interface IUserProfileEnhancedProps {
	data: IWithUserProfileEnhancedData;
	actions: IWithUserProfileEnhancedActions;
}

interface IWithUserProfileProps {
	children(props: IUserProfileEnhancedProps): JSX.Element;
}

interface IWithUserProfileState {}

export class WithUserProfile extends React.Component<
	IWithUserProfileProps,
	IWithUserProfileState
> {
	render() {
		return this.props.children({ data: mock.data, actions: mock.actions });
	}
}
