/**
 * TODO list:
 * 1. Props data: currentUser
 * 2. Props actions: showDotsMenuModal, refreshUser, resetNavigationToRoute (see old repo. Internals/backend/actions/navigation.ts)
 */

import * as React from 'react';
import {NavigationScreenProp} from 'react-navigation';

import {DotsMenuItem} from '../../../components';
import {ITranslatedProps, MediaTypeImage, MediaTypes} from '../../../types';

const mock: IWithMyProfileEnhancedProps = {
	data: {
		currentUser: {
			userId: 'ulkfnasldg',
			numberOfLikes: 10,
			numberOfPhotos: 30,
			numberOfFriends: 20,
			numberOfViews: 13,
			avatarURL: 'https://avatars2.githubusercontent.com/u/212',
			fullName: 'Gail Fullwood',
			userName: 'gail.fullwood2',
			aboutMeText: 'My user description\nSecond test line.',
			loading: false,
			mediaObjects: [
				{
					url: 'https://placeimg.com/300/400/any',
					type: MediaTypeImage,
				},
				{
					url: 'https://placeimg.com/251/526/any',
					type: MediaTypeImage,
				},
			],
		},
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
		resetNavigationToRoute: (screenName: string, navigation: NavigationScreenProp<any>) => {
			/**/
		},
		showDotsMenuModal: (items: DotsMenuItem[]) => {
			/**/
		},
		refreshUser: (userId: string) => {
			/**/
		},
	},
};

interface MyProfileUserData {
	userId: string;
	numberOfLikes: number;
	numberOfPhotos: number;
	numberOfFriends: number;
	numberOfViews: number;
	avatarURL?: string;
	fullName: string;
	userName: string;
	aboutMeText: string;
	loading: boolean;
	mediaObjects: Array<{
		url: string;
		type: MediaTypes;
	}>;
}

export interface IWithMyProfileEnhancedData {
	currentUser: MyProfileUserData;
}

export interface IWithMyProfileEnhancedActions extends ITranslatedProps {
	resetNavigationToRoute: (screenName: string, navigation: NavigationScreenProp<any>) => void;
	showDotsMenuModal: (items: DotsMenuItem[]) => void;
	refreshUser: (userId: string) => void;
}

interface IWithMyProfileEnhancedProps {
	data: IWithMyProfileEnhancedData;
	actions: IWithMyProfileEnhancedActions;
}

interface IWithMyProfileProps {
	children(props: IWithMyProfileEnhancedProps): JSX.Element;
}

interface IWithMyProfileState {}

export class WithMyProfile extends React.Component<IWithMyProfileProps, IWithMyProfileState> {
	render() {
		const {children} = this.props;
		return children({data: mock.data, actions: mock.actions});
	}
}
