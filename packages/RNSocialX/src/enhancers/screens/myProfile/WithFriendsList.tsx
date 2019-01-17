import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { IDictionary, INavigationProps } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithProfiles } from '../../connectors/data/WithProfiles';

export interface IWithFriendsListEnhancedData extends IDictionary {
	aliases: string[];
}

export interface IWithFriendsListEnhancedActions {}

interface IWithFriendsListEnhancedProps {
	data: IWithFriendsListEnhancedData;
	actions: IWithFriendsListEnhancedActions;
}

interface IWithFriendsListProps extends INavigationProps {
	children(props: IWithFriendsListEnhancedProps): JSX.Element;
}

interface IWithFriendsListState {}

export class WithFriendsList extends React.Component<IWithFriendsListProps, IWithFriendsListState> {
	render() {
		return (
			<WithI18n>
				{({ dictionary }) => (
					<WithNavigationParams>
						{({ navigationParams }) => (
							<WithProfiles>
								{({ friends }) => {
									const { key } = this.props.navigation.state;
									const { alias } = navigationParams[SCREENS.FriendsList][key];

									return this.props.children({
										data: {
											aliases: friends[alias],
											dictionary,
										},
										actions: {},
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
