import * as React from 'react';

import { INavigationProps } from '../../types';
import { ISettingsData, SettingsScreenView } from './SettingsScreen.view';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import {
	IWithSettingsEnhancedActions,
	IWithSettingsEnhancedData,
	WithSettings,
} from '../../enhancers/screens';

interface IProps extends INavigationProps, IWithSettingsEnhancedActions, IWithSettingsEnhancedData {
	onGoBack: () => void;
}

class Screen extends React.Component<IProps> {
	public render() {
		const { currentUser, dictionary, showOptionsMenu, onGoBack } = this.props;

		return (
			<SettingsScreenView
				currentUser={currentUser}
				onSaveChanges={this.onSaveChangesHandler}
				showOptionsMenu={showOptionsMenu}
				dictionary={dictionary}
				onGoBack={onGoBack}
			/>
		);
	}

	private onSaveChangesHandler = async (user: ISettingsData) => {
		this.switchActivityIndicator(true);
		await this.props.updateUserProfile(user);
		this.switchActivityIndicator(false);
	};

	private switchActivityIndicator = (state: boolean) => {
		this.props.setGlobal({
			activity: {
				visible: state,
				title: this.props.dictionary.screens.settings.progress,
			},
		});
	};
}

export const SettingsScreen = (props: INavigationProps) => (
	<WithNavigationHandlers>
		{(nav) => (
			<WithSettings>
				{({ data, actions }) => (
					<Screen {...props} {...data} {...actions} onGoBack={nav.actions.onGoBack} />
				)}
			</WithSettings>
		)}
	</WithNavigationHandlers>
);
