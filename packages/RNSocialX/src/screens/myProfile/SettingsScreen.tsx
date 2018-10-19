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

const onGoBackHandler = (navigation: any) => {
	navigation.goBack(null);
};

const Screen: React.SFC<ISettingsScreenProps> = ({
	currentUser,
	updateUserProfile,
	navigation,
	getText,
	showDotsMenuModal,
}) => (
	<SettingsScreenView
		bio={currentUser.aboutMeText}
		fullName={currentUser.fullName}
		email={currentUser.email}
		miningEnabled={currentUser.miningEnabled}
		avatarURL={currentUser.avatarURL}
		userName={currentUser.userName}
		onSaveChanges={async (saveData: ISettingsData) => {
			await saveChanges(saveData, { currentUser, updateUserProfile });
			navigation.goBack();
		}}
		onGoBack={() => onGoBackHandler(navigation)}
		getText={getText}
		showDotsMenuModal={showDotsMenuModal}
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
