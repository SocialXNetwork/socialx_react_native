import * as React from 'react';

import { IDictionary, IOptionsMenuProps } from '../../types';

import { IModalOverlay } from '../../store/ui/overlays';
import { WithI18n } from '../connectors/app/WithI18n';
import { WithOverlays } from '../connectors/ui/WithOverlays';
import { IWithFriendsEnhancedData, WithCurrentUser, WithFriends } from '../intermediary';

export interface IWithUserEntryEnhancedData extends IDictionary, IWithFriendsEnhancedData {
	currentUserAlias: string;
	modal: IModalOverlay;
}

export interface IWithUserEntryEnhancedActions extends IOptionsMenuProps {
	showModal: (input: IModalOverlay) => void;
}

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
					<WithOverlays>
						{({ modal, showModal, showOptionsMenu }) => (
							<WithFriends>
								{(friends) => (
									<WithCurrentUser>
										{({ currentUser }) =>
											this.props.children({
												data: {
													...friends.data,
													currentUserAlias: currentUser.alias,
													modal,
													dictionary,
												},
												actions: {
													showModal,
													showOptionsMenu,
												},
											})
										}
									</WithCurrentUser>
								)}
							</WithFriends>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
