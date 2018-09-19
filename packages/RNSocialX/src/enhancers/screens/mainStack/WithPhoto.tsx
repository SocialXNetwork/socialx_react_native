/**
 * TODO list:
 * 1. Props data: loading, currentUserAvatarURL, marginBottom (can be provided via KeyboardContext in consts.ts)
 * 2. Props actions: createPost, getText
 */

import * as React from 'react';

import {FriendsSearchResult, IResizeProps, ITranslatedProps, WallPostPhotoOptimized} from '../../../types';

interface WallPostPhotoData {
	mediaObjects: WallPostPhotoOptimized[];
	title?: string;
	location?: string;
	taggedFriends?: FriendsSearchResult[];
}

const mock: IWithPhotoEnhancedProps = {
	data: {
		marginBottom: 0,
		currentUserAvatarURL: 'https://placeimg.com/200/200/people',
		loading: false,
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
		createPost: (wallPostData: WallPostPhotoData) => {
			/**/
		},
	},
};

export interface IWithPhotoEnhancedData extends IResizeProps {
	currentUserAvatarURL?: string;
	loading: boolean;
}

export interface IWithPhotoEnhancedActions extends ITranslatedProps {
	createPost: (wallPostData: WallPostPhotoData) => void;
}

interface IWithPhotoEnhancedProps {
	data: IWithPhotoEnhancedData;
	actions: IWithPhotoEnhancedActions;
}

interface IWithPhotoProps {
	children(props: IWithPhotoEnhancedProps): JSX.Element;
}

interface IWithPhotoState {}

export class WithPhoto extends React.Component<IWithPhotoProps, IWithPhotoState> {
	render() {
		const {children} = this.props;
		return children({data: mock.data, actions: mock.actions});
	}
}
