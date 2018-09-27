/**
 * TODO list:
 * 1. Props data: loading, currentUserAvatarURL, marginBottom (can be provided via KeyboardContext in consts.ts)
 * 2. Props actions: createPost, getText
 */

import * as React from 'react';

import {
	IFriendsSearchResult,
	IResizeProps,
	ITranslatedProps,
	IWallPostPhotoOptimized,
} from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

interface IWallPostPhotoData {
	mediaObjects: IWallPostPhotoOptimized[];
	title?: string;
	location?: string;
	taggedFriends?: IFriendsSearchResult[];
}

const mock: IWithPhotoEnhancedProps = {
	data: {
		marginBottom: 0,
		currentUserAvatarURL: 'https://placeimg.com/200/200/people',
		loading: false,
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
		createPost: (wallPostData: IWallPostPhotoData) => {
			/**/
		},
	},
};

export interface IWithPhotoEnhancedData extends IResizeProps {
	currentUserAvatarURL?: string;
	loading: boolean;
}

export interface IWithPhotoEnhancedActions extends ITranslatedProps {
	createPost: (wallPostData: IWallPostPhotoData) => void;
}

interface IWithPhotoEnhancedProps {
	data: IWithPhotoEnhancedData;
	actions: IWithPhotoEnhancedActions;
}

interface IWithPhotoProps {
	children(props: IWithPhotoEnhancedProps): JSX.Element;
}

interface IWithPhotoState {}

export class WithPhoto extends React.Component<
	IWithPhotoProps,
	IWithPhotoState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) =>
					this.props.children({
						data: mock.data,
						actions: { ...mock.actions, getText: i18nProps.getText },
					})
				}
			</WithI18n>
		);
	}
}
