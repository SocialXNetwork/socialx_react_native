import { CheckBox } from 'native-base';
import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import { Header, HeaderButton, PrimaryButton } from '../../components';
import { IHeaderProps, ITranslatedProps } from '../../types';

import styles, {
	customStyleProps,
} from './AdsManagementConfigBudgetScreen.style';

interface IAdsManagementConfigBudgetScreenViewProps
	extends ITranslatedProps,
		IHeaderProps {
	currencyButtonPressed: () => void;
	selectedCurrencyValue: string;
	returnKeyAction: () => void;
	onChangeBudget: () => void;
	perDayPressed: boolean;
	lifetimePressed: boolean;
	runAdContinuouslyPressed: boolean;
	isStartDatePickerVisible: boolean;
	isStopDatePickerVisible: boolean;
	showDatePicker: () => void;
	confirmDatePicker: () => void;
	cancelDatePicker: () => void;
	defaultDate: string;
	nextButtonPressed: () => void;
}

export const AdsManagementConfigBudgetScreenView: React.SFC<
	IAdsManagementConfigBudgetScreenViewProps
> = ({
	onGoBack,
	getText,
	currencyButtonPressed,
	selectedCurrencyValue,
	returnKeyAction,
	onChangeBudget,
	perDayPressed,
	lifetimePressed,
	runAdContinuouslyPressed,
	isStartDatePickerVisible,
	isStopDatePickerVisible,
	showDatePicker,
	confirmDatePicker,
	cancelDatePicker,
	defaultDate,
	nextButtonPressed,
}) => (
	<View style={styles.container}>
		<Header
			title={getText('ad.management.create')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<Text style={styles.title}>
			{getText('ad.management.budget.title').toUpperCase()}
		</Text>
		<View style={styles.separator} />
		<View style={styles.currencyContainer}>
			<Text style={styles.darkColorText}>
				{getText('ad.management.budget.currency.text')}
			</Text>
			<TouchableOpacity
				style={styles.currencyButton}
				onPress={currencyButtonPressed}
			>
				<Text style={styles.currencyText}>{selectedCurrencyValue}</Text>
				<Icon
					size={20}
					name={'md-arrow-dropdown'}
					style={styles.caretDownIcon}
				/>
			</TouchableOpacity>
		</View>
		<View style={styles.budgetContainer}>
			<View style={styles.optionContainer}>
				<Text style={styles.darkColorText}>
					{getText('ad.management.budget.budget.text')}
				</Text>
				<TextInput
					autoCorrect={false}
					defaultValue={getText('ad.management.budget.budget.initialvalue')}
					clearTextOnFocus={true}
					keyboardType={'numeric'}
					onChangeText={onChangeBudget}
					onSubmitEditing={returnKeyAction}
					blurOnSubmit={true}
				/>
			</View>
			<View style={styles.separator} />
			<View style={styles.optionContainer}>
				<Text style={styles.lightColorText}>
					{getText('ad.management.budget.perday')}
				</Text>
				<CheckBox
					checked={perDayPressed}
					color={customStyleProps.checkboxColor}
					style={styles.checkbox}
				/>
			</View>
			<View style={styles.separator} />
			<View style={styles.optionContainer}>
				<Text style={styles.lightColorText}>
					{getText('ad.management.budget.lifetime')}
				</Text>
				<CheckBox
					checked={lifetimePressed}
					color={customStyleProps.checkboxColor}
					style={styles.checkbox}
				/>
			</View>
		</View>
		<View style={styles.separator} />
		<View style={styles.scheduleContainer}>
			<View style={styles.optionContainer}>
				<Text style={styles.darkColorText}>
					{getText('ad.management.budget.schedule')}
				</Text>
			</View>
			<View style={styles.separator} />
			<View style={styles.optionContainer}>
				<Text style={styles.lightColorText}>
					{getText('ad.management.budget.runadcontinuously')}
				</Text>
				<CheckBox
					checked={runAdContinuouslyPressed}
					color={customStyleProps.checkboxColor}
					style={styles.checkbox}
				/>
			</View>
			<View style={styles.separator} />
			<View style={styles.optionContainer}>
				<Text style={styles.lightColorText}>
					{getText('ad.management.budget.start.text')}
				</Text>
				<View style={styles.datePickerContainer}>
					<TouchableOpacity
						style={styles.datePickerButton}
						onPress={showDatePicker}
					>
						<Text style={styles.datePickerDefaultText}>{defaultDate}</Text>
					</TouchableOpacity>
					<DateTimePicker
						isVisible={isStartDatePickerVisible}
						titleIOS={getText('ad.management.budget.start.datePicker')}
						confirmTextStyle={styles.datePickerConfirmAndCancelBtnColor}
						cancelTextStyle={styles.datePickerConfirmAndCancelBtnColor}
						onConfirm={confirmDatePicker}
						onCancel={cancelDatePicker}
					/>
				</View>
			</View>
			<View style={styles.separator} />
			<View style={styles.optionContainer}>
				<Text style={styles.lightColorText}>
					{getText('ad.management.budget.stop.text')}
				</Text>
				<View style={styles.datePickerContainer}>
					<TouchableOpacity
						style={styles.datePickerButton}
						onPress={showDatePicker}
					>
						<Text style={styles.datePickerDefaultText}>{defaultDate}</Text>
					</TouchableOpacity>
					<DateTimePicker
						isVisible={isStopDatePickerVisible}
						titleIOS={getText('ad.management.budget.stop.datePicker')}
						confirmTextStyle={styles.datePickerConfirmAndCancelBtnColor}
						cancelTextStyle={styles.datePickerConfirmAndCancelBtnColor}
						onConfirm={confirmDatePicker}
						onCancel={cancelDatePicker}
					/>
				</View>
			</View>
		</View>
		<View style={styles.buttonContainer}>
			<PrimaryButton
				label={getText('button.next')}
				onPress={nextButtonPressed}
				containerStyle={styles.button}
			/>
		</View>
	</View>
);
