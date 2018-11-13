import * as React from 'react';

import { KeyboardContext } from '../../../environment/consts';
import {
	ICreateWallPostData,
	ICurrentUser,
	IGlobal,
	IOptionsMenuProps,
	IResizeProps,
	ITranslatedProps,
	IUploadFileInput,
} from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithFiles } from '../../connectors/storage/WithFiles';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../intermediary';

export interface IWithCreateWallPostEnhancedData extends IResizeProps {
	currentUser: ICurrentUser;
}

export interface IWithCreateWallPostEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	createPost: (post: ICreateWallPostData) => void;
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
																	this.props.children({
																		data: {
																			currentUser,
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
