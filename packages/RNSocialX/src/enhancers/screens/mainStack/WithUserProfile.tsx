/**
 * TODO list:
 * 1. Props data: currentUser, visitedUser, refreshingProfile, loadingProfile
 * 2. Props actions: addFriend, likePost, unlikePost, loadMorePosts, loadMorePhotos
 */

import * as React from 'react';
import {currentUser, visitedUser} from '../../../mocks';
import {ICurrentUser, ITranslatedProps, IVisitedUser} from '../../../types';

const mock = {
	data: {
		currentUser,
		visitedUser,
		refreshingProfile: false,
		loadingProfile: false,
	},
	actions: {
		addFriend: (userId: string) => {
			/**/
		},
		likePost: (postId: string) => {
			/**/
		},
		unlikePost: (postId: string) => {
			/**/
		},
		loadMorePosts: (userId: string) => {
			/**/
		},
		loadMorePhotos: (userId: string) => {
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
}

interface IUserProfileEnhancedProps {
	data: IWithUserProfileEnhancedData;
	actions: IWithUserProfileEnhancedActions;
}

interface IWithUserProfileProps {
	children(props: IUserProfileEnhancedProps): JSX.Element;
}

interface IWithUserProfileState {}

export class WithUserProfile extends React.Component<IWithUserProfileProps, IWithUserProfileState> {
	render() {
		return this.props.children({data: mock.data, actions: mock.actions});
	}
}
