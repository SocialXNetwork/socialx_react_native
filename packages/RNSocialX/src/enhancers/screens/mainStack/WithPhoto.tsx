/**
 * TODO list:
 * 1. Props actions: createPost (should also upload media files)
 */

import * as React from 'react';

import { KeyboardContext, SCREENS } from '../../../environment/consts';
import {
	IFriendsSearchResult,
	IOptionsMenuProps,
	IResizeProps,
	ITranslatedProps,
	IWallPostPhotoOptimized,
} from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
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
		currentUseravatar: 'https://placeimg.com/200/200/people',
		mediaObjects: [],
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
		// This is now implemented with the WithOverlays connector enhancer
		showOptionsMenu: (items) => {
			/**/
		},
		createPost: (wallPostData: IWallPostPhotoData) => {
			/**/
		},
	},
};

export interface IWithPhotoEnhancedData extends IResizeProps {
	currentUseravatar?: string;
	mediaObjects: IWallPostPhotoOptimized[];
}

export interface IWithPhotoEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
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

export class WithPhoto extends React.Component<IWithPhotoProps, IWithPhotoState> {
	render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithOverlays>
						{({ showOptionsMenu }) => (
							<KeyboardContext.Consumer>
								{({ marginBottom }) => (
									<WithNavigationParams>
										{({ navigationParams }) => (
											<WithCurrentUser>
												{({ currentUser }) =>
													this.props.children({
														data: {
															...mock.data,
															currentUseravatar: currentUser!.avatar,
															mediaObjects: navigationParams[SCREENS.Photo].mediaObjects,
															marginBottom,
														},
														actions: {
															...mock.actions,
															getText,
															showOptionsMenu: (items) =>
																showOptionsMenu({
																	items,
																}),
														},
													})
												}
											</WithCurrentUser>
										)}
									</WithNavigationParams>
								)}
							</KeyboardContext.Consumer>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
