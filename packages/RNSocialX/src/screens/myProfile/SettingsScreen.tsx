/**
 * old screen -> screens/SettingsScreen/index.tsx
 * TODO list:
 * 1. Get rid of navigation workaround for passing doLogout, then we can have this as SFC - Done @Alex
 * 2. Check proper data structure: currentUser.name or split with firstName and lastName? - Done @Alex
 */

import * as React from 'react';

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

const onLogoutHandler = (logout: () => void) => {
	logout();
};

const onGoBackHandler = (navigation: any) => {
	navigation.goBack(null);
};

const Screen: React.SFC<ISettingsScreenProps> = ({
	currentUser,
	updateUserProfile,
	settingsLoading,
	logout,
	navigation,
	getText,
}) => (
	<SettingsScreenView
		isLoading={settingsLoading}
		aboutMeText={currentUser.aboutMeText}
		firstName={currentUser.fullName.split(' ')[0]}
		lastName={currentUser.fullName.split(' ')[1]}
		email={currentUser.email}
		miningEnabled={currentUser.miningEnabled}
		avatarURL={currentUser.avatarURL || null}
		userName={currentUser.userName}
		onSaveChanges={(saveData: ISettingsData) =>
			saveChanges(saveData, { currentUser, updateUserProfile })
		}
		onLogout={() => onLogoutHandler(logout)}
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
