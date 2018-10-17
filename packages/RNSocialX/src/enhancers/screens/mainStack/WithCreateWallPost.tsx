/**
 * TODO list:
 * 1. Props actions: createPost (should also upload media files)
 */

import * as React from 'react';

import { KeyboardContext } from '../../../environment/consts';
import {
	IDotsMenuProps,
	IGlobal,
	IResizeProps,
	ITranslatedProps,
	IUploadFileInput,
	IWallPostPhotoOptimized,
} from '../../../types';

import { ActionTypes } from '../../../store/data/posts/Types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithFiles } from '../../connectors/storage/WithFiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { getActivity } from '../../helpers';
import { WithCurrentUser } from '../intermediary';

const mock: IWithCreateWallPostEnhancedProps = {
	data: {
		creatingPost: false,
		marginBottom: 0,
		currentUserAvatarURL: 'https://placeimg.com/200/200/people',
	},
	actions: {
		createPost: (wallPostData: IWallPostData) => {
			/**/
		},
		uploadFile: (input: IUploadFileInput) => {
			/**/
		},
		setGlobal: (global: IGlobal) => {
			/**/
		},
		// This is now implemented with the WithI18n connector enhancer
		getText: (value: string, ...args: any[]) => value,
		// This is now implemented with the WithOverlays connector enhancer
		showDotsMenuModal: (items) => {
			/**/
		},
	},
};

interface IWallPostData {
	mediaObjects: IWallPostPhotoOptimized[];
	taggedFriends?: Array<{
		fullName: string;
	}>;
	location?: string;
	text: string;
}

export interface IWithCreateWallPostEnhancedData extends IResizeProps {
	currentUserAvatarURL?: string;
	creatingPost: boolean;
}

export interface IWithCreateWallPostEnhancedActions
	extends ITranslatedProps,
		IDotsMenuProps {
	createPost: (wallPostData: IWallPostData) => void;
	uploadFile: (input: IUploadFileInput) => void;
	setGlobal: (global: IGlobal) => void;
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
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithOverlays>
						{(overlayProps) => (
							<WithGlobals>
								{({ setGlobal }) => (
									<WithFiles>
										{({ uploadFile, uploads }) => (
											<KeyboardContext.Consumer>
												{({ marginBottom }) => (
													<WithActivities>
														{({ activities }) => (
															<WithCurrentUser>
																{({ currentUser }) => (
																	<WithPosts>
																		{(postsProps) =>
																			children({
																				data: {
																					...mock.data,
																					creatingPost: getActivity(
																						activities,
																						ActionTypes.CREATE_POST,
																					),
																					marginBottom,
																					currentUserAvatarURL: currentUser!
																						.avatarURL,
																				},
																				actions: {
																					...mock.actions,
																					uploadFile,
																					createPost: (
																						wallPostData: IWallPostData,
																					) =>
																						postsProps.createPost({
																							postText: wallPostData.text,
																							// location: wallPostData.location,
																							location: 'Timisoara',
																							taggedFriends:
																								wallPostData.taggedFriends,
																							// media: uploads.map((upload) => ({
																							// 	hash: upload.hash,
																							// 	type: {
																							// 		key: 'TBD',
																							// 		name: 'Photo',
																							// 		category: 'TBD',
																							// 	},
																							// 	extension: 'TBD',
																							// 	size: 1234,
																							// })),
																							privatePost: false,
																						}),
																					setGlobal,
																					getText: i18nProps.getText,
																					showDotsMenuModal: (items) =>
																						overlayProps.showOptionsMenu({
																							items,
																						}),
																				},
																			})
																		}
																	</WithPosts>
																)}
															</WithCurrentUser>
														)}
													</WithActivities>
												)}
											</KeyboardContext.Consumer>
										)}
									</WithFiles>
								)}
							</WithGlobals>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
