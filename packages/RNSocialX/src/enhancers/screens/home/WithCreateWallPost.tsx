import * as React from 'react';

import {
	ICreatePost,
	ICurrentUser,
	IDictionary,
	IOptionsMenuProps,
	IUploadFileInput,
} from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithFiles } from '../../connectors/storage/WithFiles';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../../intermediary';

export interface IWithCreateWallPostEnhancedData extends IDictionary {
	currentUser: ICurrentUser;
}

export interface IWithCreateWallPostEnhancedActions extends IOptionsMenuProps {
	createPost: (post: ICreatePost) => void;
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
				{({ dictionary }) => (
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
															dictionary,
														},
														actions: {
															uploadFile,
															createPost: (post: ICreatePost) => createPost(post),
															showOptionsMenu: (items) =>
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
							</WithFiles>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
