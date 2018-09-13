/**
 * old screen -> screens/SettingsScreen/index.tsx
 * TODO list:
 * 1. Data props: currentUser
 * 2. Action props: updateUserProfile, doLogout
 * 3. Get rid of navigation workaround for passing doLogout, then we can have this as SFC
 * 4. Check proper data structure: currentUser.name or split with firstName and lastName?
 */

import * as React from 'react';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';

import {ScreenHeaderButton} from '../../components';
import {ITranslatedProps} from '../../types';
import {SettingsData, SettingsScreenView} from './SettingsScreen.view';

interface ISettingsScreenProps extends ITranslatedProps {
	currentUser: any;
	updateUserProfile: (saveData: SettingsData, avatarHasChanged: boolean) => void;
	doLogout: () => void;
	navigation: NavigationScreenProp<any>;
	navigationOptions: NavigationScreenConfig<any>;
}

const saveChanges = (saveData: SettingsData, {currentUser, updateUserProfile}: ISettingsScreenProps) => {
	const avatarHasChanged = currentUser.avatarURL !== saveData.avatarURL;
	updateUserProfile(saveData, avatarHasChanged);
};

export class SettingsScreen extends React.Component<ISettingsScreenProps> {
	private static navigationOptions = ({
		navigation: {
			state: {params},
		},
		navigationOptions: {getText},
	}: ISettingsScreenProps) => ({
		title: getText('settings.screen.title'),
		// @ts-ignore
		headerRight: <ScreenHeaderButton iconName={'ios-log-out'} onPress={params.runLogoutHandler} />,
	});

	public componentDidMount() {
		const {navigation, doLogout} = this.props;
		navigation.setParams({runLogoutHandler: doLogout});
	}

	public render() {
		const {currentUser, getText} = this.props;
		return (
			<SettingsScreenView
				isLoading={!currentUser}
				aboutText={currentUser ? currentUser.bio : ''}
				firstName={currentUser ? currentUser.name.split(' ')[0] : ''}
				lastName={currentUser ? currentUser.name.split(' ')[1] : ''}
				email={currentUser ? currentUser.email : ''}
				miningEnabled={currentUser ? currentUser.miningEnabled || false : false}
				avatarURL={currentUser ? currentUser.avatarURL : null}
				userName={currentUser ? currentUser.userName : ''}
				onSaveChanges={(saveData: SettingsData) => saveChanges(saveData, this.props)}
				getText={getText}
			/>
		);
	}
}
