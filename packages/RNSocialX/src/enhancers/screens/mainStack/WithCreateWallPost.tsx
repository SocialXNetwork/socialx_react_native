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

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithFiles } from '../../connectors/storage/WithFiles';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../intermediary';

interface IWallPostData {
	text: string;
	media: IWallPostPhotoOptimized[];
	taggedFriends?: Array<{
		fullName: string;
	}>;
	location?: string;
}

export interface IWithCreateWallPostEnhancedData extends IResizeProps {
	currentUserAvatarURL: string;
	currentUserId: string;
	currentUserFullName: string;
}

export interface IWithCreateWallPostEnhancedActions extends ITranslatedProps, IDotsMenuProps {
	createPost: (post: IWallPostData) => void;
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
				{({ getText }) => (
					<WithOverlays>
						{({ showOptionsMenu }) => (
							<WithGlobals>
								{({ setGlobal }) => (
									<WithFiles>
										{({ uploadFile }) => (
											<KeyboardContext.Consumer>
												{({ marginBottom }) => (
													<WithCurrentUser>
														{({ currentUser }) => (
															<WithPosts>
																{({ createPost }) =>
																	children({
																		data: {
																			currentUserAvatarURL: currentUser!.avatarURL,
																			currentUserId: currentUser!.userId,
																			currentUserFullName: currentUser!.fullName,
																			marginBottom,
																		},
																		actions: {
																			uploadFile,
																			createPost: async (post: IWallPostData) => {
																				await createPost({
																					postText: post.text,
																					location: post.location,
																					taggedFriends: post.taggedFriends,
																					media: post.media,
																					privatePost: false,
																				} as any);
																			},
																			setGlobal,
																			getText,
																			showDotsMenuModal: (items) =>
																				showOptionsMenu({
																					items,
																				}),
																		},
																	})
																}
															</WithPosts>
														)}
													</WithCurrentUser>
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
