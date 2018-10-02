import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { IDotsMenuItem } from '../../../components';
import { currentUser } from '../../../mocks';
import {
	ICurrentUser,
	INavigationParamsActions,
	ITranslatedProps,
} from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { resetNavigationToRoute } from '../../helpers';
import { WithCurrentUserContent } from '../intermediary';

const mock: IWithMyProfileEnhancedProps = {
	data: {
		currentUser,
	},
	actions: {
		// This is now implemented with the WithI18n connector enhancer
		getText: (value: string, ...args: any[]) => value,
		resetNavigationToRoute: (
			screenName: string,
			navigation: NavigationScreenProp<any>,
		) => {
			/**/
		},
		showDotsMenuModal: (items: IDotsMenuItem[]) => {
			/**/
		},
		logout: () => {
			/**/
		},
		setNavigationParams: () => {
			/**/
		},
	},
};

export interface IWithMyProfileEnhancedData {
	currentUser: ICurrentUser;
}

export interface IWithMyProfileEnhancedActions
	extends ITranslatedProps,
		INavigationParamsActions {
	resetNavigationToRoute: (
		screenName: string,
		navigation: NavigationScreenProp<any>,
	) => void;
	showDotsMenuModal: (items: IDotsMenuItem[]) => void;
	logout: () => void;
}

interface IWithMyProfileEnhancedProps {
	data: IWithMyProfileEnhancedData;
	actions: IWithMyProfileEnhancedActions;
}

interface IWithMyProfileProps {
	children(props: IWithMyProfileEnhancedProps): JSX.Element;
}

interface IWithMyProfileState {}

export class WithMyProfile extends React.Component<
	IWithMyProfileProps,
	IWithMyProfileState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithOverlays>
						{(overlayProps) => (
							<WithAccounts>
								{(accountsProps) => (
									<WithCurrentUserContent>
										{(currentUserProps) =>
											this.props.children({
												data: {
													...mock.data,
													currentUser: currentUserProps.currentUser!,
												},
												actions: {
													...mock.actions,
													getText: i18nProps.getText,
													logout: accountsProps.logout,
													resetNavigationToRoute,
													showDotsMenuModal: (items: IDotsMenuItem[]) =>
														overlayProps.showOptionsMenu({ items }),
												},
											})
										}
									</WithCurrentUserContent>
								)}
							</WithAccounts>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
