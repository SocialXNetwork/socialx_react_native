import * as React from 'react';

import { INavigationProps } from '../../types';
import { ISettingsData, SettingsScreenView } from './SettingsScreen.view';

import {
	IWithSettingsEnhancedActions,
	IWithSettingsEnhancedData,
	WithSettings,
} from '../../enhancers/screens';

type ISettingsScreenProps = INavigationProps &
	IWithSettingsEnhancedActions &
	IWithSettingsEnhancedData;

class Screen extends React.Component<ISettingsScreenProps> {
	public render() {
		const { currentUser, navigation, getText, showDotsMenuModal } = this.props;
		console.log('shareDataEnabled', currentUser.shareDataEnabled);

		return (
			<SettingsScreenView
				bio={currentUser.aboutMeText}
				fullName={currentUser.fullName}
				email={currentUser.email}
				miningEnabled={currentUser.miningEnabled}
				shareDataEnabled={currentUser.shareDataEnabled}
				avatarURL={currentUser.avatarURL}
				userName={currentUser.userName}
				onSaveChanges={this.onSaveChangesHandler}
				onGoBack={() => this.onGoBackHandler(navigation)}
				showDotsMenuModal={showDotsMenuModal}
				getText={getText}
			/>
		);
	}

	private onSaveChangesHandler = async (user: ISettingsData) => {
		this.switchActivityIndicator(true);
		await this.props.updateUserProfile(user);
		this.switchActivityIndicator(false);
	};

	private onGoBackHandler = (navigation: any) => {
		navigation.goBack(null);
	};

	private switchActivityIndicator = (state: boolean) => {
		this.props.setGlobal({
			activity: {
				visible: state,
				title: this.props.getText('settings.progress.message'),
			},
		});
	};
}

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
