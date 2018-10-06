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
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { resetNavigationToRoute } from '../../helpers';
import { WithCurrentUserContent } from '../intermediary';

const mock: IWithMyProfileEnhancedProps = {
	data: {
		currentUser,
	},
	actions: {
		showDotsMenuModal: (items: IDotsMenuItem[]) => {
			/**/
		},
		logout: () => {
			/**/
		},
		resetNavigationToRoute: (
			screenName: string,
			navigation: NavigationScreenProp<any>,
		) => {
			/**/
		},
		setNavigationParams: () => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
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
					<WithNavigationParams>
						{({ setNavigationParams }) => (
							<WithOverlays>
								{(overlayProps) => (
									<WithAccounts>
										{(accountsProps) => (
											<WithCurrentUserContent>
												{(currentUserProps) =>
													this.props.children({
														data: {
															currentUser: currentUserProps.currentUser!,
														},
														actions: {
															showDotsMenuModal: (items: IDotsMenuItem[]) =>
																overlayProps.showOptionsMenu({ items }),
															logout: accountsProps.logout,
															resetNavigationToRoute,
															setNavigationParams,
															getText: i18nProps.getText,
														},
													})
												}
											</WithCurrentUserContent>
										)}
									</WithAccounts>
								)}
							</WithOverlays>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
