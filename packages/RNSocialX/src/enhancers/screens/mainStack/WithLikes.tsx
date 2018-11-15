import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { ILike, ITranslatedProps } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';

export interface IWithLikesEnhancedData {
	likes: ILike[];
}

export interface IWithLikesEnhancedActions extends ITranslatedProps {}

interface IUserProfileEnhancedProps {
	data: IWithLikesEnhancedData;
	actions: IWithLikesEnhancedActions;
}

interface IWithLikesProps {
	children(props: IUserProfileEnhancedProps): JSX.Element;
}

interface IWithLikesState {}

export class WithLikes extends React.Component<IWithLikesProps, IWithLikesState> {
	render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithNavigationParams>
						{({ navigationParams }) =>
							this.props.children({
								data: {
									likes: navigationParams[SCREENS.Likes].likes,
								},
								actions: {
									getText,
								},
							})
						}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
