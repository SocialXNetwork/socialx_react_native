import * as React from 'react';
import Picker from 'react-native-picker';

import { INavigationProps } from '../../types';
import { defaultStyles } from './NodesScreen.style';
import { NodesScreenView } from './NodesScreen.view';

import {
	IWithNodesEnhancedActions,
	IWithNodesEnhancedData,
	WithNodes,
} from '../../enhancers/screens';
import { setCustomGunSuperPeers } from '../../store/app/config';

type INodesScreenProps = INavigationProps & IWithNodesEnhancedActions & IWithNodesEnhancedData;

interface INodesScreenState {
	selectedNodeValue: string;
	hasChanged: boolean;
}

const dataPicker = ['a', 'b'];

class Screen extends React.Component<INodesScreenProps, INodesScreenState> {
	public state = {
		selectedNodeValue: 'initial',
		hasChanged: false,
	};

	public render() {
		const { navigation, getText } = this.props;
		const { hasChanged, selectedNodeValue } = this.state;

		return (
			<NodesScreenView
				onGoBack={() => this.onGoBackHandler(navigation)}
				getText={getText}
				onDisplayNodesList={this.onDisplayNodesList}
				selectedNodeValue={selectedNodeValue}
				hasChanged={hasChanged}
				onSaveNewNode={this.onSaveNodePressed}
			/>
		);
	}

	private onGoBackHandler = (navigation: any) => {
		navigation.goBack(null);
	};

	private onDisplayNodesList = () => {
		const { getText } = this.props;
		// appConfig.map((value: string) => value.toUpperCase()),
		Picker.init({
			pickerData: dataPicker,
			pickerTitleColor: defaultStyles.pickerTitleColor,
			pickerConfirmBtnColor: defaultStyles.pickerConfirmAndCancelBtnColor,
			pickerCancelBtnColor: defaultStyles.pickerConfirmAndCancelBtnColor,
			pickerBg: defaultStyles.pickerToolbarAndBgColor,
			pickerToolBarBg: defaultStyles.pickerToolbarAndBgColor,
			selectedValue: [1],
			pickerTitleText: getText('nodes.screen.picker.title'),
			pickerConfirmBtnText: getText('button.confirm'),
			pickerCancelBtnText: getText('button.cancel'),
			onPickerConfirm: (data) => {
				this.setState({ selectedNodeValue: data[0], hasChanged: true });
				Picker.hide();
			},
		});
		Picker.show();
	};

	private onSaveNodePressed = async () => {
		this.switchActivityIndicator(true);
		// await setCustomGunSuperPeers();
		this.switchActivityIndicator(false);
	};

	private switchActivityIndicator = (state: boolean) => {
		this.props.setGlobal({
			activity: {
				visible: state,
				title: this.props.getText('nodes.progress.message'),
			},
		});
	};
}

export const NodesScreen = (navProps: INavigationProps) => (
	<WithNodes>{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}</WithNodes>
);
