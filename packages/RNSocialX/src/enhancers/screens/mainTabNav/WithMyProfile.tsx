import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { currentUser } from '../../../mocks';
import {
	ICurrentUser,
	IDotsMenuProps,
	IGlobal,
	INavigationParamsActions,
	ITranslatedProps,
} from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { resetNavigationToRoute } from '../../helpers';
import { WithCurrentUserContent } from '../intermediary';

const mock: IWithMyProfileEnhancedProps = {
	data: {
		currentUser,
	},
	actions: {
		showDotsMenuModal: (items) => {
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
		setGlobal: (input: IGlobal) => {
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
		IDotsMenuProps,
		INavigationParamsActions {
	resetNavigationToRoute: (
		screenName: string,
		navigation: NavigationScreenProp<any>,
	) => void;
	logout: () => void;
	setGlobal: (input: IGlobal) => void;
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
							<WithGlobals>
								{({ setGlobal }) => (
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
																	showDotsMenuModal: (items) =>
																		overlayProps.showOptionsMenu({ items }),
																	logout: accountsProps.logout,
																	resetNavigationToRoute,
																	setNavigationParams,
																	setGlobal,
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
							</WithGlobals>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
