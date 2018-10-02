/**
 * TODO list:
 * 1. Props actions: createPost (should also upload media files)
 */

import * as React from 'react';

import { KeyboardContext, SCREENS } from '../../../environment/consts';
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
					<KeyboardContext.Consumer>
						{(keyboardProps) => (
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
														navigationParamsProps.navigationParams[
															SCREENS.Photo
														].mediaObjects,
													marginBottom: keyboardProps.marginBottom,
												},
												actions: {
													...mock.actions,
													getText: i18nProps.getText,
												},
											})
										}
									</WithCurrentUser>
								)}
							</WithNavigationParams>
						)}
					</KeyboardContext.Consumer>
				)}
			</WithI18n>
		);
	}
}
