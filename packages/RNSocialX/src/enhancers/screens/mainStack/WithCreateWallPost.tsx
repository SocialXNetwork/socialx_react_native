/**
 * TODO list:
 * 1. Props actions: createPost (should also upload media files)
 */

import * as React from 'react';

import { KeyboardContext } from '../../../environment/consts';
import {
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
import { WithCurrentUser } from '../intermediary';

const mock: IWithCreateWallPostEnhancedProps = {
	data: {
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
}

export interface IWithCreateWallPostEnhancedActions extends ITranslatedProps {
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
					<WithGlobals>
						{({ setGlobal }) => (
							<WithFiles>
								{({ uploadFile, uploads }) => (
									<KeyboardContext.Consumer>
										{({ marginBottom }) => (
											<WithCurrentUser>
												{({ currentUser }) => (
													<WithPosts>
														{(postsProps) =>
															children({
																data: {
																	...mock.data,
																	marginBottom,
																	currentUserAvatarURL: currentUser!.avatarURL,
																},
																actions: {
																	...mock.actions,
																	uploadFile,
																	createPost: (wallPostData: IWallPostData) =>
																		postsProps.createPost({
																			postText: wallPostData.text,
																			// location: wallPostData.location,
																			location: 'Timisoara',
																			taggedFriends: wallPostData.taggedFriends,
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
			</WithI18n>
		);
	}
}
