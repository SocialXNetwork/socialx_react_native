import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { INavigationProps } from '../../../types';

import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithProfiles } from '../../connectors/data/WithProfiles';

export interface IWithFriendsListEnhancedData {
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
			<WithNavigationParams>
				{({ navigationParams }) => (
					<WithProfiles>
						{({ friends }) => {
							const { key } = this.props.navigation.state;
							const { alias } = navigationParams[SCREENS.FriendsList][key];

							return this.props.children({
								data: {
									aliases: friends[alias],
								},
								actions: {},
							});
						}}
					</WithProfiles>
				)}
			</WithNavigationParams>
		);
	}
}
