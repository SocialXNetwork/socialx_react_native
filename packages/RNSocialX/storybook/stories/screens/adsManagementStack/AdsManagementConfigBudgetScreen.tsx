import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import Picker from 'react-native-picker';

import { getTextMock } from '../../../../src/mocks';
import { AdsManagementConfigBudgetScreenView } from '../../../../src/screens/adsManagementStack/AdsManagementConfigBudgetScreen.view';

import { defaultStyles } from '../../../../src/screens/adsManagementStack/AdsManagementConfigBudgetScreen.style';

const pickerData = ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'];

storiesOf('Screens/adsManagementStack', module)
	.addDecorator(withKnobs)
	.add('AdsManagementConfigBudgetScreen', () => {
		const selectedCurrencyValue = text('currencyButtonSelectedValue', 'SOCX');
		const budgetValue = text('budgetValue', '458');
		const knobsCurrencyButtonPressed = boolean('currencyButtonPress', false);
		const perDayPressed = boolean('perDayPressed', true);
		const lifetimePressed = boolean('lifetime', false);
		const runAdContinuouslyPressed = boolean('runAdContinuouslyPressed', true);
		const isStartDatePickerVisible = boolean('isStartDatePickerVisible', false);
		const isStopDatePickerVisible = boolean('isStopDatePickerVisible', false);
		const selectedStartDate = text('selectedStartDate', 'DD/MM/JJJJ');
		const selectedStopDate = text('selectedStopDate', 'DD/MM/JJJJ');
		const defaultDate = new Date();

		const currencyButtonPressed = () => {
			if (knobsCurrencyButtonPressed) {
				Picker.init({
					pickerData,
					pickerTitleColor: defaultStyles.pickerTitleColor,
					pickerConfirmBtnColor: defaultStyles.pickerConfirmAndCancelBtnColor,
					pickerCancelBtnColor: defaultStyles.pickerConfirmAndCancelBtnColor,
					pickerBg: defaultStyles.pickerToolbarAndBgColor,
					pickerToolBarBg: defaultStyles.pickerToolbarAndBgColor,
					selectedValue: [1],
					pickerTitleText: getTextMock(
						'ad.management.budget.currency.picker.select',
					),
					pickerConfirmBtnText: getTextMock(
						'ad.management.budget.currency.picker.confirm',
					),
					pickerCancelBtnText: getTextMock(
						'ad.management.budget.currency.picker.cancel',
					),
					onPickerConfirm: () => {
						action('OnPickerConfirm');
					},
					onPickerCancel: () => {
						action('OnPickerCancel');
					},
				});
				Picker.show();
			} else {
				Picker.hide();
			}
		};

		return (
			<AdsManagementConfigBudgetScreenView
				getText={getTextMock}
				currencyButtonPressed={currencyButtonPressed}
				selectedCurrencyValue={selectedCurrencyValue}
				budgetValue={budgetValue}
				submitBudget={action('submitBudget')}
				perDayPressed={perDayPressed}
				lifetimePressed={lifetimePressed}
				runAdContinuouslyPressed={runAdContinuouslyPressed}
				selectedStartDate={selectedStartDate}
				selectedStopDate={selectedStopDate}
				handleCheckboxChange={action('handleCheckboxChange')}
				isStartDatePickerVisible={isStartDatePickerVisible}
				isStopDatePickerVisible={isStopDatePickerVisible}
				handleDatePicker={action('handleDatePicker')}
				currentDate={defaultDate}
				nextDayFromStartDate={defaultDate}
				handleStartDatePicked={action('handleStartDatePicked')}
				handleStopDatePicked={action('handleStopDatePicked')}
			/>
		);
	});
