/**
 * TODO list:
 * 1. Props actions: createPost (should also upload media files)
 */

import * as React from 'react';

import { KeyboardContext } from '../../../environment/consts';
import {
	IResizeProps,
	ITranslatedProps,
	IWallPostPhotoOptimized,
} from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithPosts } from '../../connectors/data/WithPosts';
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
		// This is now implemented with the WithI18n connector enhancer
		getText: (value: string, ...args: any[]) => value,
	},
};

interface IWallPostData {
	mediaObjects: IWallPostPhotoOptimized[];
	text: string;
}

export interface IWithCreateWallPostEnhancedData extends IResizeProps {
	currentUserAvatarURL?: string;
}

export interface IWithCreateWallPostEnhancedActions extends ITranslatedProps {
	createPost: (wallPostData: IWallPostData) => void;
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
					<KeyboardContext.Consumer>
						{(keyboardProps) => (
							<WithCurrentUser>
								{(currentUserProps) => (
									<WithPosts>
										{(postsProps) =>
											children({
												data: {
													...mock.data,
													marginBottom: keyboardProps.marginBottom,
													currentUserAvatarURL: currentUserProps.currentUser!
														.avatarURL,
												},
												actions: {
													...mock.actions,
													getText: i18nProps.getText,
													// createPost: (wallPostData: IWallPostData) =>
													// 	postsProps.createPost({
													// 		postText: wallPostData.text,
													// 		privatePost: false,
													// 		media: wallPostData.mediaObjects.map(
													// 			(mediaObject) => ({
													// 				hash: 'TBD',
													// 				type: {
													// 					key: 'TBD',
													// 					name: 'Photo',
													// 					category: 'TBD',
													// 				},
													// 				extension: 'TBD',
													// 				size: 1234,
													// 			}),
													// 		),
													// 	}),
												},
											})
										}
									</WithPosts>
								)}
							</WithCurrentUser>
						)}
					</KeyboardContext.Consumer>
				)}
			</WithI18n>
		);
	}
}
