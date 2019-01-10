import * as React from 'react';

import { IPost } from '../../../store/data/posts';
import {
	ICurrentUser,
	IOptionsMenuProps,
	ITranslatedProps,
	IUploadFileInput,
} from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithFiles } from '../../connectors/storage/WithFiles';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../../intermediary';

export interface IWithCreateWallPostEnhancedData {
	currentUser: ICurrentUser;
}

export interface IWithCreateWallPostEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	createPost: (post: IPost) => void;
	uploadFile: (input: IUploadFileInput) => void;
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
															createPost: (post: IPost) => createPost(post),
															showOptionsMenu: (items) =>
																showOptionsMenu({
																	items,
																}),
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
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
