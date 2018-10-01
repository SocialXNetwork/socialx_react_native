/**
 * TODO list:
 * 1. Props data: marginBottom (can be provided via KeyboardContext in consts.ts)
 * 2. Props actions: createPost
 */

import * as React from 'react';

import {
	IResizeProps,
	ITranslatedProps,
	IWallPostPhotoOptimized,
} from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
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
					<WithCurrentUser>
						{(currentUserProps) =>
							children({
								data: {
									...mock.data,
									currentUserAvatarURL: currentUserProps.currentUser!.avatarURL,
								},
								actions: { ...mock.actions, getText: i18nProps.getText },
							})
						}
					</WithCurrentUser>
				)}
			</WithI18n>
		);
	}
}
