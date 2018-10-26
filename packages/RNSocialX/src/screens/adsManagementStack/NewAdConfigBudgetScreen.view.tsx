import { CheckBox } from 'native-base';
import * as React from 'react';
import {
	Keyboard,
	ScrollView,
	Text,
	TextInput,
	TouchableHighlight,
	View,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import { Header, HeaderButton, PrimaryButton } from '../../components';
import { IHeaderProps, ITranslatedProps } from '../../types';

import styles, { defaultStyles } from './NewAdConfigBudgetScreen.style';

interface INewAdConfigBudgetScreenViewProps
	extends ITranslatedProps,
		IHeaderProps {
	currencyButtonPressed: () => void;
	selectedCurrencyValue: string;
	budgetValue: string;
	submitBudget: (text: string) => void;
	perDayPressed: boolean;
	lifetimePressed: boolean;
	runAdContinuouslyPressed: boolean;
	handleCheckboxChange: (
		text: 'perday' | 'lifetime' | 'runAdContinuously',
	) => void;
	isStartDatePickerVisible: boolean;
	isStopDatePickerVisible: boolean;
	handleDatePicker: (
		text: 'startDatePicker' | 'stopDatePicker' | 'hidePicker',
	) => void;
	currentDate: Date;
	nextDayFromStartDate: Date;
	handleStartDatePicked: (date: Date) => void;
	handleStopDatePicked: (date: Date) => void;
	selectedStartDate: string;
	selectedStopDate: string;
	nextButtonPressed: () => void;
}

export const NewAdConfigBudgetScreenView: React.SFC<
	INewAdConfigBudgetScreenViewProps
> = ({
	onGoBack,
	getText,
	currencyButtonPressed,
	selectedCurrencyValue,
	budgetValue,
	submitBudget,
	perDayPressed,
	lifetimePressed,
	runAdContinuouslyPressed,
	handleCheckboxChange,
	isStartDatePickerVisible,
	isStopDatePickerVisible,
	handleDatePicker,
	currentDate,
	nextDayFromStartDate,
	handleStartDatePicked,
	handleStopDatePicked,
	selectedStartDate,
	selectedStopDate,
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
		<View style={styles.marginBetweenTitleAndCurrency} />
		<ScrollView
			alwaysBounceVertical={false}
			keyboardShouldPersistTaps="handled"
		>
			<TouchableHighlight
				underlayColor={defaultStyles.checkboxColor}
				onPress={currencyButtonPressed}
			>
				<View style={styles.currencyContainer}>
					<Text style={styles.darkColorText}>
						{getText('ad.management.budget.currency.text')}
					</Text>
					<View style={styles.currencyButton}>
						<Text style={styles.currencyText}>{selectedCurrencyValue}</Text>
						<Icon
							size={20}
							name="md-arrow-dropdown"
							style={styles.caretDownIcon}
						/>
					</View>
				</View>
			</TouchableHighlight>
			<View style={styles.budgetContainer}>
				<View style={styles.optionContainer}>
					<Text style={styles.darkColorText}>
						{getText('ad.management.budget.budget.text')}
					</Text>
					<TextInput
						style={styles.inputBudget}
						placeholder={getText(
							'ad.management.budget.budget.textinput.placeholder',
						)}
						autoCorrect={false}
						value={budgetValue}
						defaultValue={getText(
							'ad.management.budget.budget.textinput.initialvalue',
						)}
						clearTextOnFocus={true}
						keyboardType="numeric"
						onChangeText={submitBudget}
						onSubmitEditing={Keyboard.dismiss}
						blurOnSubmit={true}
						underlineColorAndroid="transparent"
					/>
				</View>
				<View style={styles.separator} />
				<TouchableHighlight
					underlayColor={defaultStyles.highlightButton}
					onPress={() => handleCheckboxChange('perday')}
				>
					<View style={styles.optionContainer}>
						<Text style={styles.lightColorText}>
							{getText('ad.management.budget.perday')}
						</Text>
						<CheckBox
							checked={perDayPressed}
							color={defaultStyles.checkboxColor}
							style={styles.checkbox}
							onPress={() => handleCheckboxChange('perday')}
						/>
					</View>
				</TouchableHighlight>
				<View style={styles.separator} />
				<TouchableHighlight
					underlayColor={defaultStyles.highlightButton}
					onPress={() => handleCheckboxChange('lifetime')}
				>
					<View style={styles.optionContainer}>
						<Text style={styles.lightColorText}>
							{getText('ad.management.budget.lifetime')}
						</Text>
						<CheckBox
							checked={lifetimePressed}
							color={defaultStyles.checkboxColor}
							style={styles.checkbox}
							onPress={() => handleCheckboxChange('lifetime')}
						/>
					</View>
				</TouchableHighlight>
			</View>
			<View style={styles.separator} />
			<View style={styles.scheduleContainer}>
				<View style={styles.optionContainer}>
					<Text style={styles.darkColorText}>
						{getText('ad.management.budget.schedule')}
					</Text>
				</View>
				<View style={styles.separator} />
				<TouchableHighlight
					underlayColor={defaultStyles.highlightButton}
					onPress={() => handleCheckboxChange('runAdContinuously')}
				>
					<View style={styles.optionContainer}>
						<Text style={styles.lightColorText}>
							{getText('ad.management.budget.runadcontinuously')}
						</Text>
						<CheckBox
							checked={runAdContinuouslyPressed}
							color={defaultStyles.checkboxColor}
							style={styles.checkbox}
							onPress={() => handleCheckboxChange('runAdContinuously')}
						/>
					</View>
				</TouchableHighlight>
				<View style={styles.separator} />
				<TouchableHighlight
					underlayColor={defaultStyles.highlightButton}
					onPress={() => handleDatePicker('startDatePicker')}
					disabled={runAdContinuouslyPressed}
				>
					<View style={styles.optionContainer}>
						<Text style={styles.lightColorText}>
							{getText('ad.management.budget.start.text')}
						</Text>
						<View style={styles.datePickerContainer}>
							<Text style={styles.datePickerDefaultText}>
								{selectedStartDate}
							</Text>
							<DateTimePicker
								isVisible={isStartDatePickerVisible}
								minimumDate={currentDate}
								titleIOS={getText('ad.management.budget.start.datePicker')}
								confirmTextStyle={
									defaultStyles.datePickerConfirmAndCancelBtnColor
								}
								cancelTextStyle={
									defaultStyles.datePickerConfirmAndCancelBtnColor
								}
								onConfirm={handleStartDatePicked}
								onCancel={() => handleDatePicker('hidePicker')}
							/>
						</View>
					</View>
				</TouchableHighlight>
				<View style={styles.separator} />
				<TouchableHighlight
					underlayColor={defaultStyles.highlightButton}
					onPress={() => handleDatePicker('stopDatePicker')}
					disabled={runAdContinuouslyPressed}
				>
					<View style={styles.optionContainer}>
						<Text style={styles.lightColorText}>
							{getText('ad.management.budget.stop.text')}
						</Text>
						<View style={styles.datePickerContainer}>
							<Text style={styles.datePickerDefaultText}>
								{selectedStopDate}
							</Text>
							<DateTimePicker
								isVisible={isStopDatePickerVisible}
								minimumDate={nextDayFromStartDate}
								titleIOS={getText('ad.management.budget.stop.datePicker')}
								confirmTextStyle={
									defaultStyles.datePickerConfirmAndCancelBtnColor
								}
								cancelTextStyle={
									defaultStyles.datePickerConfirmAndCancelBtnColor
								}
								onConfirm={handleStopDatePicked}
								onCancel={() => handleDatePicker('hidePicker')}
							/>
						</View>
					</View>
				</TouchableHighlight>
			</View>
			<View style={styles.buttonContainer}>
				<PrimaryButton
					label={getText('button.next')}
					onPress={nextButtonPressed}
					containerStyle={styles.button}
				/>
			</View>
		</ScrollView>
	</View>
);
