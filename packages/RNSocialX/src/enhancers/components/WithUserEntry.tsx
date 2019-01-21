import * as React from 'react';

import { IDictionary } from '../../types';

import { WithI18n } from '../connectors/app/WithI18n';
import { IWithFriendsEnhancedData, WithCurrentUser, WithFriends } from '../intermediary';

export interface IWithUserEntryEnhancedData extends IDictionary, IWithFriendsEnhancedData {
	currentUserAlias: string;
}

export interface IWithUserEntryEnhancedActions {}

interface IWithUserEntryEnhancedProps {
	data: IWithUserEntryEnhancedData;
	actions: IWithUserEntryEnhancedActions;
}

interface IWithUserEntryProps {
	children(props: IWithUserEntryEnhancedProps): JSX.Element;
}

interface IWithUserEntryState {}

export class WithUserEntry extends React.Component<IWithUserEntryProps, IWithUserEntryState> {
	render() {
		return (
			<WithI18n>
				{({ dictionary }) => (
					<WithFriends>
						{(friends) => (
							<WithCurrentUser>
								{({ currentUser }) =>
									this.props.children({
										data: {
											...friends.data,
											currentUserAlias: currentUser.alias,
											dictionary,
										},
										actions: {},
									})
								}
							</WithCurrentUser>
						)}
					</WithFriends>
				)}
			</WithI18n>
		);
	}
}
