import moment from 'moment';
import * as React from 'react';
import Picker from 'react-native-picker';

import { defaultStyles } from './AdsManagementConfigBudgetScreen.style';
import { AdsManagementConfigBudgetScreenView } from './AdsManagementConfigBudgetScreen.view';

import { IConfirmation } from '../../store/ui/overlays';
import { ITranslatedProps } from '../../types';

export interface IBudgetConfigData {
	currency: string;
	budget: number;
	perDay: boolean;
	lifetime: boolean;
	runAdContinuously: boolean;
	start: string;
	stop: string;
}

interface IAdsManagementConfigBudgetScreenProps extends ITranslatedProps {
	showConfirmation: (confirmation: IConfirmation) => void;
}

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
	nextDayFromStartDate: Date;
}

const pickerData = [
	'ad.management.budget.currency.socx',
	'ad.management.budget.currency.bitcoin',
	'ad.management.budget.currency.usd',
	'ad.management.budget.currency.euro',
];

const dateFormatMomentJS = 'DD/MM/YYYY';

export class AdsManagementConfigBudgetScreen extends React.Component<
	IAdsManagementConfigBudgetScreenProps,
	IAdsManagementConfigBudgetScreenState
> {
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
		nextDayFromStartDate: new Date(),
	};

	private currentDate = new Date();

	public render() {
		const { getText } = this.props;
		const {
			selectedCurrencyValue,
			budgetValue,
			perDayPressed,
			lifetimePressed,
			runAdContinuouslyPressed,
			selectedStartDate,
			selectedStopDate,
			isStartDatePickerVisible,
			isStopDatePickerVisible,
			nextDayFromStartDate,
		} = this.state;

		return (
			<AdsManagementConfigBudgetScreenView
				getText={getText}
				currencyButtonPressed={this.currencyButtonPressed}
				selectedCurrencyValue={selectedCurrencyValue}
				budgetValue={budgetValue}
				submitBudget={this.submitBudget}
				perDayPressed={perDayPressed}
				lifetimePressed={lifetimePressed}
				runAdContinuouslyPressed={runAdContinuouslyPressed}
				selectedStartDate={selectedStartDate}
				selectedStopDate={selectedStopDate}
				handleCheckboxChange={this.handleCheckboxChange}
				isStartDatePickerVisible={isStartDatePickerVisible}
				isStopDatePickerVisible={isStopDatePickerVisible}
				handleDatePicker={this.handleDatePicker}
				currentDate={this.currentDate}
				nextDayFromStartDate={nextDayFromStartDate}
				handleStartDatePicked={this.handleStartDatePicked}
				handleStopDatePicked={this.handleStopDatePicked}
			/>
		);
	}

	public getAdBudgetData = (): IBudgetConfigData => {
		const {
			selectedCurrencyValue,
			budgetValue,
			perDayPressed,
			lifetimePressed,
			runAdContinuouslyPressed,
			selectedStartDate,
			selectedStopDate,
		} = this.state;

		return {
			currency: selectedCurrencyValue,
			budget: parseInt(budgetValue, 10),
			perDay: perDayPressed,
			lifetime: lifetimePressed,
			runAdContinuously: runAdContinuouslyPressed,
			start: selectedStartDate,
			stop: selectedStopDate,
		};
	};

	private currencyButtonPressed = () => {
		const { getText } = this.props;
		Picker.init({
			pickerData: pickerData.map((value: string) =>
				getText(value).toUpperCase(),
			),
			pickerTitleColor: defaultStyles.pickerTitleColor,
			pickerConfirmBtnColor: defaultStyles.pickerConfirmAndCancelBtnColor,
			pickerCancelBtnColor: defaultStyles.pickerConfirmAndCancelBtnColor,
			pickerBg: defaultStyles.pickerToolbarAndBgColor,
			pickerToolBarBg: defaultStyles.pickerToolbarAndBgColor,
			selectedValue: [1],
			pickerTitleText: getText('ad.management.budget.currency.picker.select'),
			pickerConfirmBtnText: getText('button.confirm'),
			pickerCancelBtnText: getText('button.cancel'),
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

	private handleCheckboxChange = (
		checkboxName: 'perday' | 'lifetime' | 'runAdContinuously',
	) => {
		Picker.hide();
		if (checkboxName) {
			if (checkboxName === 'perday') {
				this.setState({
					lifetimePressed: false,
					perDayPressed: true,
				});
			}
			if (checkboxName === 'lifetime') {
				this.setState({
					perDayPressed: false,
					lifetimePressed: true,
				});
			}
			if (checkboxName === 'runAdContinuously') {
				if (this.state.runAdContinuouslyPressed) {
					this.setState({ runAdContinuouslyPressed: false });
				} else {
					this.setState({
						runAdContinuouslyPressed: true,
						selectedStartDate: 'DD/MM/JJJJ',
						selectedStopDate: 'DD/MM/JJJJ',
					});
				}
			}
		}
	};

	private handleDatePicker = (
		datePicker: 'startDatePicker' | 'stopDatePicker' | 'hidePicker',
	) => {
		if (datePicker) {
			if (datePicker === 'startDatePicker') {
				this.setState({
					isStartDatePickerVisible: true,
					isStopDatePickerVisible: false,
				});
			}
			if (datePicker === 'stopDatePicker') {
				this.setState({
					isStartDatePickerVisible: false,
					isStopDatePickerVisible: true,
				});
			}
			if (datePicker === 'hidePicker') {
				this.setState({
					isStartDatePickerVisible: false,
					isStopDatePickerVisible: false,
				});
			}
		}
	};

	private handleStartDatePicked = (date: Date) => {
		const formattedStartDate = moment(date).format(dateFormatMomentJS);
		this.setState({ selectedStartDate: formattedStartDate });
		this.calculateStopDateFromStartDate(date);
		this.handleDatePicker('hidePicker');
	};

	private handleStopDatePicked = (date: Date) => {
		const formattedStopDate = moment(date).format(dateFormatMomentJS);
		this.setState({ selectedStopDate: formattedStopDate });
		this.handleDatePicker('hidePicker');
	};

	private calculateStopDateFromStartDate = (selectedStartDate: Date) => {
		const newDate = new Date(selectedStartDate);
		newDate.setDate(selectedStartDate.getDate() + 1);

		const formattedNewDate = moment(newDate).format(dateFormatMomentJS);
		this.setState({
			selectedStopDate: formattedNewDate,
			nextDayFromStartDate: newDate,
		});
	};
}
