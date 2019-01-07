import * as React from 'react';

import {
	ICreateWallPost,
	ICurrentUser,
	IGlobal,
	IOptionsMenuProps,
	ITranslatedProps,
	IUploadFileInput,
} from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithFiles } from '../../connectors/storage/WithFiles';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../../intermediary';

export interface IWithCreateWallPostEnhancedData {
	currentUser: ICurrentUser;
}

export interface IWithCreateWallPostEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	createPost: (post: ICreateWallPost) => void;
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
											<WithCurrentUser>
												{({ currentUser }) => (
													<WithPosts>
														{({ createPost }) =>
															this.props.children({
																data: {
																	currentUser,
																},
																actions: {
																	uploadFile,
																	createPost: async (post: ICreateWallPost) => {
																		await createPost({
																			postText: post.text,
																			location: post.location,
																			taggedFriends: post.taggedFriends,
																			media: post.media as any,
																			privatePost: false,
																		});
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
