/**
 * TODO list:
 * 1. Props data: currentUserAvatarURL, marginBottom (can be provided via KeyboardContext in consts.ts)
 * 2. Props actions: createPost, getText
 */

import * as React from 'react';

import {
	IResizeProps,
	ITranslatedProps,
	IWallPostPhotoOptimized,
} from '../../../types';

const mock: IWithCreateWallPostEnhancedProps = {
	data: {
		marginBottom: 0,
		currentUserAvatarURL: 'https://placeimg.com/200/200/people',
	},
	actions: {
		createPost: (wallPostData: IWallPostData) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

interface IWallPostData {
	mediaObjects: IWallPostPhotoOptimized[];
	text: string;
}

export interface IWithCreateWallPostEnhancedData extends IResizeProps {
	currentUserAvatarURL?: string;
}

export interface IWithCreateWallPostEnhancedActions extends ITranslatedProps {
	createPost: (wallPostData: IWallPostData) => void;
}

interface IWithCreateWallPostEnhancedProps {
	data: IWithCreateWallPostEnhancedData;
	actions: IWithCreateWallPostEnhancedActions;
}

interface IWithCreateWallPostProps {
	children(props: IWithCreateWallPostEnhancedProps): JSX.Element;
}

interface IWithCreateWallPostState {}

export class WithCreateWallPost extends React.Component<
	IWithCreateWallPostProps,
	IWithCreateWallPostState
> {
	render() {
		const { children } = this.props;
		return children({ data: mock.data, actions: mock.actions });
	}
}
