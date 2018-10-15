import { action } from '@storybook/addon-actions';
import { boolean, button, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import Picker from 'react-native-picker';

import { getTextMock } from '../../../../src/mocks';
import { AdsManagementConfigBudgetScreenView } from '../../../../src/screens/adsManagementStack/AdsManagementConfigBudgetScreen.view';

import { customStyleProps } from '../../../../src/screens/adsManagementStack/AdsManagementConfigBudgetScreen.style';

const pickerData = ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'];

storiesOf('Screens/adsManagementStack', module)
	.addDecorator(withKnobs)
	.add('AdsManagementConfigBudgetScreen', () => {
		const selectedCurrencyValue = text('currencyButtonSelectedValue', 'SOCX');
		const knobsCurrencyButtonPressed = boolean('currencyButtonPress', false);
		const perDayPressed = boolean('perDayPressed', true);
		const lifetimePressed = boolean('lifetime', false);
		const runAdContinuouslyPressed = boolean('runAdContinuouslyPressed', true);
		const isStartDatePickerVisible = boolean('isStartDatePickerVisible', false);
		const isStopDatePickerVisible = boolean('isStopDatePickerVisible', false);
		const defaultDate = 'DD/MM/JJJJ';

		const currencyButtonPressed = (hasBeenPressed: boolean) => {
			if (hasBeenPressed) {
				Picker.init({
					pickerData,
					pickerTitleColor: customStyleProps.pickerTitleColor,
					pickerConfirmBtnColor:
						customStyleProps.pickerConfirmAndCancelBtnColor,
					pickerCancelBtnColor: customStyleProps.pickerConfirmAndCancelBtnColor,
					pickerBg: customStyleProps.pickerToolbarAndBgColor,
					pickerToolBarBg: customStyleProps.pickerToolbarAndBgColor,
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
				onGoBack={action('onGoBack')}
				getText={getTextMock}
				currencyButtonPressed={() => {
					currencyButtonPressed(knobsCurrencyButtonPressed);
				}}
				selectedCurrencyValue={selectedCurrencyValue}
				onChangeBudget={action('onChangeBudget')}
				returnKeyAction={action('TRKeyboardKeys.done')}
				perDayPressed={perDayPressed}
				lifetimePressed={lifetimePressed}
				runAdContinuouslyPressed={runAdContinuouslyPressed}
				isStartDatePickerVisible={isStartDatePickerVisible}
				isStopDatePickerVisible={isStopDatePickerVisible}
				showDatePicker={action('showDatePicker')}
				confirmDatePicker={action('confirmDatePicker')}
				cancelDatePicker={action('cancelDatePicker')}
				defaultDate={defaultDate}
				nextButtonPressed={action('nextButtonPressed')}
			/>
		);
	});
