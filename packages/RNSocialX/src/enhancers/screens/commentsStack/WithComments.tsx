import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { IError, IWallPostData } from '../../../types';

import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithDataShape } from '../../intermediary';

export interface IWithCommentsEnhancedData {
	post: IWallPostData;
	errors: IError[];
	keyboardRaised: boolean;
}

export interface IWithCommentsEnhancedActions {}

interface IWithCommentsEnhancedProps {
	data: IWithCommentsEnhancedData;
	actions: IWithCommentsEnhancedActions;
}

interface IWithCommentsProps {
	children(props: IWithCommentsEnhancedProps): JSX.Element;
}

interface IWithCommentsState {}

export class WithComments extends React.Component<IWithCommentsProps, IWithCommentsState> {
	render() {
		return (
			<WithNavigationParams>
				{({ navigationParams }) => (
					<WithActivities>
						{({ errors }) => (
							<WithPosts>
								{({ all }) => {
									const { postId, keyboardRaised } = navigationParams[SCREENS.Comments];

									return (
										<WithDataShape post={all[postId]}>
											{({ shapedPost }) =>
												this.props.children({
													data: {
														post: shapedPost!,
														keyboardRaised,
														errors,
													},
													actions: {},
												})
											}
										</WithDataShape>
									);
								}}
							</WithPosts>
						)}
					</WithActivities>
				)}
			</WithNavigationParams>
		);
	}
}
