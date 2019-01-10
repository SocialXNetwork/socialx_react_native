import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { ITranslatedProps } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithProfiles } from '../../connectors/data/WithProfiles';

export interface IWithFriendsListEnhancedData {
	aliases: string[];
}

export interface IWithFriendsListEnhancedActions extends ITranslatedProps {}

interface IWithFriendsListEnhancedProps {
	data: IWithFriendsListEnhancedData;
	actions: IWithFriendsListEnhancedActions;
}

interface IWithFriendsListProps {
	children(props: IWithFriendsListEnhancedProps): JSX.Element;
}

interface IWithFriendsListState {}

export class WithFriendsList extends React.Component<IWithFriendsListProps, IWithFriendsListState> {
	render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithNavigationParams>
						{({ navigationParams }) => (
							<WithProfiles>
								{({ friends }) => {
									const { alias } = navigationParams[SCREENS.FriendsList];

									return this.props.children({
										data: {
											aliases: friends[alias],
										},
										actions: {
											getText,
										},
									});
								}}
							</WithProfiles>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
