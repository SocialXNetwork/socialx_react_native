import * as React from 'react';

import { KeyboardContext, SCREENS } from '../../../environment/consts';
import {
	ICreateWallPostData,
	ICurrentUser,
	IGlobal,
	IOptionsMenuProps,
	IResizeProps,
	ITranslatedProps,
	IUploadFileInput,
	IWallPostPhotoOptimized,
} from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithFiles } from '../../connectors/storage/WithFiles';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../../intermediary';

export interface IWithPhotoEnhancedData extends IResizeProps {
	currentUser: ICurrentUser;
	media: IWallPostPhotoOptimized[];
}

export interface IWithPhotoEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	createPost: (post: ICreateWallPostData) => void;
	uploadFile: (input: IUploadFileInput) => void;
	setGlobal: (global: IGlobal) => void;
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
					<WithGlobals>
						{({ setGlobal }) => (
							<WithOverlays>
								{({ showOptionsMenu }) => (
									<KeyboardContext.Consumer>
										{({ marginBottom }) => (
											<WithNavigationParams>
												{({ navigationParams }) => (
													<WithFiles>
														{({ uploadFile }) => (
															<WithPosts>
																{({ createPost }) => (
																	<WithCurrentUser>
																		{({ currentUser }) =>
																			this.props.children({
																				data: {
																					currentUser: currentUser!,
																					media: navigationParams[SCREENS.Photo].media,
																					marginBottom,
																				},
																				actions: {
																					uploadFile,
																					createPost: async (post: ICreateWallPostData) => {
																						await createPost({
																							postText: post.text,
																							location: post.location,
																							taggedFriends: post.taggedFriends,
																							media: post.media,
																							privatePost: false,
																						} as any);
																					},
																					showOptionsMenu: (items) =>
																						showOptionsMenu({
																							items,
																						}),
																					setGlobal,
																					getText,
																				},
																			})
																		}
																	</WithCurrentUser>
																)}
															</WithPosts>
														)}
													</WithFiles>
												)}
											</WithNavigationParams>
										)}
									</KeyboardContext.Consumer>
								)}
							</WithOverlays>
						)}
					</WithGlobals>
				)}
			</WithI18n>
		);
	}
}
