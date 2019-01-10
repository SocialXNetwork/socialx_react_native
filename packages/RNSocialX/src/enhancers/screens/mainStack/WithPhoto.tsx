import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { IPost } from '../../../store/data/posts';
import {
	ICurrentUser,
	IOptimizedMedia,
	IOptionsMenuProps,
	ITranslatedProps,
	IUploadFileInput,
} from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithFiles } from '../../connectors/storage/WithFiles';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../../intermediary';

export interface IWithPhotoEnhancedData {
	currentUser: ICurrentUser;
	media: IOptimizedMedia[];
}

export interface IWithPhotoEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	createPost: (post: IPost) => void;
	uploadFile: (input: IUploadFileInput) => void;
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
																	createPost: (post: IPost) => createPost(post),
																	showOptionsMenu: (items) =>
																		showOptionsMenu({
																			items,
																		}),
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
			</WithI18n>
		);
	}
}
