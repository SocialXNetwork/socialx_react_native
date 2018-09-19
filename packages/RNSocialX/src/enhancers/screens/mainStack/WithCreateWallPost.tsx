/**
 * TODO list:
 * 1. Props data: currentUserAvatarURL, marginBottom (can be provided via KeyboardContext in consts.ts)
 * 2. Props actions: createPost, getText
 */

import * as React from 'react';

import {IResizeProps, ITranslatedProps, WallPostPhotoOptimized} from '../../../types';

const mock: IWithCreateWallPostEnhancedProps = {
	data: {
		marginBottom: 0,
		currentUserAvatarURL: 'https://placeimg.com/200/200/people',
	},
	actions: {
		createPost: (wallPostData: WallPostData) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

interface WallPostData {
	mediaObjects: WallPostPhotoOptimized[];
	text: string;
}

export interface IWithCreateWallPostEnhancedData extends IResizeProps {
	currentUserAvatarURL?: string;
}

export interface IWithCreateWallPostEnhancedActions extends ITranslatedProps {
	createPost: (wallPostData: WallPostData) => void;
}

interface IWithCreateWallPostEnhancedProps {
	data: IWithCreateWallPostEnhancedData;
	actions: IWithCreateWallPostEnhancedActions;
}

interface IWithCreateWallPostProps {
	children(props: IWithCreateWallPostEnhancedProps): JSX.Element;
}

interface IWithCreateWallPostState {}

export class WithCreateWallPost extends React.Component<IWithCreateWallPostProps, IWithCreateWallPostState> {
	render() {
		const {children} = this.props;
		return children({data: mock.data, actions: mock.actions});
	}
}
