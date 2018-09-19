/**
 * old screen -> screens/SettingsScreen/index.tsx
 * TODO list:
 * 1. Get rid of navigation workaround for passing doLogout, then we can have this as SFC
 * 2. Check proper data structure: currentUser.name or split with firstName and lastName?
 */

import * as React from 'react';

import {ScreenHeaderButton} from '../../components';
import {INavigationProps} from '../../types';
import {SettingsData, SettingsScreenView} from './SettingsScreen.view';

import {IWithSettingsEnhancedActions, IWithSettingsEnhancedData, WithSettings} from '../../enhancers/screens';

type ISettingsScreenProps = INavigationProps & IWithSettingsEnhancedActions & IWithSettingsEnhancedData;

const saveChanges = (saveData: SettingsData, {currentUser, updateUserProfile}: ISettingsScreenProps) => {
	const avatarHasChanged = currentUser.avatarURL !== saveData.avatarURL;
	updateUserProfile(saveData, avatarHasChanged);
};

class Screen extends React.Component<ISettingsScreenProps> {
	public componentDidMount() {
		const {navigation, doLogout} = this.props;
		navigation.setParams({runLogoutHandler: doLogout});
	}

	public render() {
		const {currentUser, settingsLoading, getText} = this.props;
		return (
			<SettingsScreenView
				isLoading={settingsLoading}
				aboutMeText={currentUser.aboutMeText}
				firstName={currentUser.fullName.split(' ')[0]}
				lastName={currentUser.fullName.split(' ')[1]}
				email={currentUser.email}
				miningEnabled={currentUser.miningEnabled}
				avatarURL={currentUser.avatarURL || null}
				userName={currentUser.userName}
				onSaveChanges={(saveData: SettingsData) => saveChanges(saveData, this.props)}
				getText={getText}
			/>
		);
	}
}

export const SettingsScreen = ({navigation, navigationOptions}: INavigationProps) => (
	<WithSettings>
		{({data, actions}) => (
			<Screen navigation={navigation} navigationOptions={navigationOptions} {...data} {...actions} />
		)}
	</WithSettings>
);

// @ts-ignore
SettingsScreen.navigationOptions = ({
	navigation: {
		state: {params},
	},
	navigationOptions: {getText},
}: INavigationProps) => ({
	title: getText('settings.screen.title'),
	// @ts-ignore
	headerRight: <ScreenHeaderButton iconName={'ios-log-out'} onPress={params.runLogoutHandler} />,
});
