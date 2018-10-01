/**
 * TODO list:
 * 1. Props data: loading, marginBottom (can be provided via KeyboardContext in consts.ts)
 * 2. Props actions: createPost, getText
 */

import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import {
	IFriendsSearchResult,
	IResizeProps,
	ITranslatedProps,
	IWallPostPhotoOptimized,
} from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithCurrentUser } from '../intermediary';

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
		mediaObjects: [],
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
	mediaObjects: IWallPostPhotoOptimized[];
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
				{(i18nProps) => (
					<WithNavigationParams>
						{(navigationParamsProps) => (
							<WithCurrentUser>
								{(currentUserProps) =>
									this.props.children({
										data: {
											...mock.data,
											currentUserAvatarURL: currentUserProps.currentUser!
												.avatarURL,
											mediaObjects:
												navigationParamsProps.navigationParams[SCREENS.Photo]
													.mediaObjects,
										},
										actions: { ...mock.actions, getText: i18nProps.getText },
									})
								}
							</WithCurrentUser>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
