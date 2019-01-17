import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { IDictionary, INavigationProps } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';

export interface IWithLikesEnhancedData extends IDictionary {
	likeIds: string[];
}

export interface IWithLikesEnhancedActions {}

interface IUserProfileEnhancedProps {
	data: IWithLikesEnhancedData;
	actions: IWithLikesEnhancedActions;
}

interface IWithLikesProps extends INavigationProps {
	children(props: IUserProfileEnhancedProps): JSX.Element;
}

interface IWithLikesState {}

export class WithLikes extends React.Component<IWithLikesProps, IWithLikesState> {
	render() {
		return (
			<WithI18n>
				{({ dictionary }) => (
					<WithNavigationParams>
						{({ navigationParams }) => {
							const { key } = this.props.navigation.state;
							const { likeIds } = navigationParams[SCREENS.Likes][key];

							return this.props.children({
								data: {
									likeIds,
									dictionary,
								},
								actions: {},
							});
						}}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
