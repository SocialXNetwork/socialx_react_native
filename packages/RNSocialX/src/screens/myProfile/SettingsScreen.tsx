import * as React from 'react';

import { NAVIGATION } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { ISettingsData, SettingsScreenView } from './SettingsScreen.view';

import {
	ISaveChangesParams,
	IWithSettingsEnhancedActions,
	IWithSettingsEnhancedData,
	WithSettings,
} from '../../enhancers/screens';

type ISettingsScreenProps = INavigationProps &
	IWithSettingsEnhancedActions &
	IWithSettingsEnhancedData;

const saveChanges = (
	saveData: ISettingsData,
	{ currentUser, updateUserProfile }: ISaveChangesParams,
) => {
	const avatarHasChanged = currentUser.avatarURL !== saveData.avatarURL;
	updateUserProfile(saveData, avatarHasChanged);
};

const onLogoutHandler = (
	logout: () => void,
	resetNavigationToRoute: (screenName: string, navigation: any) => void,
	navigation: any,
) => {
	logout();
	resetNavigationToRoute(NAVIGATION.PreAuth, navigation);
};

const onGoBackHandler = (navigation: any) => {
	navigation.goBack(null);
};

const Screen: React.SFC<ISettingsScreenProps> = ({
	currentUser,
	updateUserProfile,
	logout,
	navigation,
	resetNavigationToRoute,
	getText,
}) => (
	<SettingsScreenView
		aboutMeText={currentUser.aboutMeText}
		firstName={currentUser.fullName.split(' ')[0]}
		lastName={currentUser.fullName.split(' ')[1]}
		email={currentUser.email}
		miningEnabled={currentUser.miningEnabled}
		avatarURL={currentUser.avatarURL}
		userName={currentUser.userName}
		onSaveChanges={(saveData: ISettingsData) =>
			saveChanges(saveData, { currentUser, updateUserProfile })
		}
		onLogout={() => onLogoutHandler(logout, resetNavigationToRoute, navigation)}
		onGoBack={() => onGoBackHandler(navigation)}
		getText={getText}
	/>
);

export const SettingsScreen = ({
	navigation,
	navigationOptions,
}: INavigationProps) => (
	<WithSettings>
		{({ data, actions }) => (
			<Screen
				navigation={navigation}
				navigationOptions={navigationOptions}
				{...data}
				{...actions}
			/>
		)}
	</WithSettings>
);
