import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import {
	ICreateWallPost,
	ICurrentUser,
	IGlobal,
	IOptimizedMedia,
	IOptionsMenuProps,
	ITranslatedProps,
	IUploadFileInput,
} from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithFiles } from '../../connectors/storage/WithFiles';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../../intermediary';

export interface IWithPhotoEnhancedData {
	currentUser: ICurrentUser;
	media: IOptimizedMedia[];
}

export interface IWithPhotoEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	createPost: (post: ICreateWallPost) => void;
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
																		},
																		actions: {
																			uploadFile,
																			createPost: async (post: ICreateWallPost) => {
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
							</WithOverlays>
						)}
					</WithGlobals>
				)}
			</WithI18n>
		);
	}
}
