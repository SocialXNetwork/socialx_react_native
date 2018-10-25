import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';

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
				{({ getText }) => (
					<WithNavigationParams>
						{({ setNavigationParams }) => (
							<WithGlobals>
								{({ setGlobal }) => (
									<WithOverlays>
										{({ showOptionsMenu }) => (
											<WithAccounts>
												{({ logout }) => (
													<WithCurrentUserContent>
														{({ currentUser }) =>
															this.props.children({
																data: {
																	currentUser: currentUser!,
																},
																actions: {
																	showDotsMenuModal: (items) =>
																		showOptionsMenu({ items }),
																	logout,
																	resetNavigationToRoute,
																	setNavigationParams,
																	setGlobal,
																	getText,
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
