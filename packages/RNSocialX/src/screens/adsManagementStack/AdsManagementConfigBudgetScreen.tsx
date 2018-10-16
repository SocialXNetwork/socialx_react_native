import moment from 'moment';
import * as React from 'react';
import Picker from 'react-native-picker';

import { INavigationProps } from '../../types';
import { customStyleProps } from './AdsManagementConfigBudgetScreen.style';
import { AdsManagementConfigBudgetScreenView } from './AdsManagementConfigBudgetScreen.view';

import {
	IWithAdsManagementConfigBudgetEnhancedActions,
	IWithAdsManagementConfigBudgetEnhancedData,
	WithAdsManagementConfigBudget,
} from '../../enhancers/screens';

type IAdsManagementConfigBudgetScreenProps = INavigationProps &
	IWithAdsManagementConfigBudgetEnhancedActions &
	IWithAdsManagementConfigBudgetEnhancedData;

interface IAdsManagementConfigBudgetScreenState {
	budgetValue: string;
	selectedCurrencyValue: string;
	perDayPressed: boolean;
	lifetimePressed: boolean;
	runAdContinuouslyPressed: boolean;
	isStartDatePickerVisible: boolean;
	isStopDatePickerVisible: boolean;
	selectedStartDate: string;
	selectedStopDate: string;
}

const pickerData = [
	'ad.management.budget.currency.socx',
	'ad.management.budget.currency.bitcoin',
	'ad.management.budget.currency.usd',
	'ad.management.budget.currency.euro',
];

const dateFormatMomentJS = 'DD/MM/YYYY';
const dateNow = new Date();

class Screen extends React.Component<IAdsManagementConfigBudgetScreenProps> {
	public state = {
		budgetValue: this.props.getText(
			'ad.management.budget.budget.textinput.initialvalue',
		),
		selectedCurrencyValue: this.props
			.getText('ad.management.budget.currency.socx')
			.toUpperCase(),
		perDayPressed: true,
		lifetimePressed: false,
		runAdContinuouslyPressed: true,
		isStartDatePickerVisible: false,
		isStopDatePickerVisible: false,
		selectedStartDate: 'DD/MM/JJJJ',
		selectedStopDate: 'DD/MM/JJJJ',
	};

	public render() {
		const { getText } = this.props;

		return (
			<AdsManagementConfigBudgetScreenView
				onGoBack={this.onGoBackHandler}
				getText={getText}
				currencyButtonPressed={this.currencyButtonPressed}
				selectedCurrencyValue={this.state.selectedCurrencyValue}
				budgetValue={this.state.budgetValue}
				submitBudget={this.submitBudget}
				perDayPressed={this.state.perDayPressed}
				lifetimePressed={this.state.lifetimePressed}
				runAdContinuouslyPressed={this.state.runAdContinuouslyPressed}
				selectedStartDate={this.state.selectedStartDate}
				selectedStopDate={this.state.selectedStopDate}
				handleCheckboxChange={this.handleCheckboxChange}
				isStartDatePickerVisible={this.state.isStartDatePickerVisible}
				isStopDatePickerVisible={this.state.isStopDatePickerVisible}
				handleDatePicker={this.handleDatePicker}
				handleStartDatePicked={this.handleStartDatePicked}
				handleStopDatePicked={this.handleStopDatePicked}
				nextButtonPressed={this.nextButtonPressed}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};

	private currencyButtonPressed = () => {
		const { getText } = this.props;
		Picker.init({
			pickerData: pickerData.map((value: string) =>
				getText(value).toUpperCase(),
			),
			pickerTitleColor: customStyleProps.pickerTitleColor,
			pickerConfirmBtnColor: customStyleProps.pickerConfirmAndCancelBtnColor,
			pickerCancelBtnColor: customStyleProps.pickerConfirmAndCancelBtnColor,
			pickerBg: customStyleProps.pickerToolbarAndBgColor,
			pickerToolBarBg: customStyleProps.pickerToolbarAndBgColor,
			selectedValue: [1],
			pickerTitleText: getText('ad.management.budget.currency.picker.select'),
			pickerConfirmBtnText: getText(
				'ad.management.budget.currency.picker.confirm',
			),
			pickerCancelBtnText: getText(
				'ad.management.budget.currency.picker.cancel',
			),
			onPickerConfirm: (data) => {
				this.setState({ selectedCurrencyValue: data[0] });
				Picker.hide();
			},
		});
		Picker.show();
	};

	private submitBudget = (newBudget: string) => {
		Picker.hide();
		this.setState({ budgetValue: newBudget.replace(/[^0-9]/g, '') });
	};

	private handleCheckboxChange = (checkboxName: string) => {
		Picker.hide();
		switch (checkboxName) {
			case 'perday':
				this.setState({
					lifetimePressed: false,
					perDayPressed: true,
				});
				break;
			case 'lifetime':
				this.setState({
					perDayPressed: false,
					lifetimePressed: true,
				});
				break;
			case 'runAdContinuously':
				if (this.state.runAdContinuouslyPressed) {
					this.setState({ runAdContinuouslyPressed: false });
				} else {
					this.setState({
						runAdContinuouslyPressed: true,
						selectedStartDatePlaceholder: 'DD/MM/JJJJ',
						selectedStopDatePlaceholder: 'DD/MM/JJJJ',
					});
				}
				break;
		}
	};

	private handleDatePicker = (datePicker: string) => {
		switch (datePicker) {
			case 'startDatePicker':
				this.setState({
					isStartDatePickerVisible: true,
					isStopDatePickerVisible: false,
				});
				break;
			case 'stopDatePicker':
				this.setState({
					isStartDatePickerVisible: false,
					isStopDatePickerVisible: true,
				});
				break;
			case 'hidePicker':
				this.setState({
					isStartDatePickerVisible: false,
					isStopDatePickerVisible: false,
				});
				break;
		}
	};

	private handleStartDatePicked = (date: Date) => {
		const formattedStartDate = moment(date).format(dateFormatMomentJS);
		this.setState({ selectedStartDate: formattedStartDate });
		this.handleDatePicker('hidePicker');
	};

	private handleStopDatePicked = (date: Date) => {
		const formattedStopDate = moment(date).format(dateFormatMomentJS);
		this.setState({ selectedStopDate: formattedStopDate });
		this.handleDatePicker('hidePicker');
	};

	private nextButtonPressed = () => {
		const budgetObject = {
			currency: this.state.selectedCurrencyValue,
			budget: parseInt(this.state.budgetValue, 10),
			perDay: this.state.perDayPressed,
			lifetime: this.state.lifetimePressed,
			runAdContinuously: this.state.runAdContinuouslyPressed,
			start: this.state.selectedStartDate,
			stop: this.state.selectedStopDate,
		};

		this.props.onCreateAdSetBudget(budgetObject);
	};
}

export const AdsManagementConfigBudgetScreen = (navProps: INavigationProps) => (
	<WithAdsManagementConfigBudget>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithAdsManagementConfigBudget>
);
