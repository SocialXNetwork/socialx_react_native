/**
 * TODO list:
 * 1. @Serkan, check password validation. Did not import the old helper because you mentioned it will be handled different.
 * 2. Decide where how prop marginBottom for InputSMSCodeModal should be implemented.
 */

import {Formik, FormikErrors, FormikProps} from 'formik';
import {PhoneNumberFormat, PhoneNumberUtil} from 'google-libphonenumber';
import {CheckBox} from 'native-base';
import * as React from 'react';
import {ImageSourcePropType, Keyboard, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal';
import DeviceInfo from 'react-native-device-info';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {string} from 'yup';

import {
	AvatarPicker,
	InputSMSCodeModal,
	PrimaryButton,
	PrimaryTextInput,
	TKeyboardKeys,
	TRKeyboardKeys,
} from '../../components';
import {KeyboardContext} from '../../environment/consts';
import {Colors} from '../../environment/theme'; // TODO: remove here
import {ITranslatedProps} from '../../types';
import style, {customStyleProps} from './RegisterScreen.style';

const phoneUtil = PhoneNumberUtil.getInstance();

export interface RegisterData {
	email: string;
	name: string;
	username: string;
	phoneNumber: string;
	password: string;
	avatarImage: ImageSourcePropType;
}

interface RegisterFormData extends RegisterData {
	confirmPassword: string;
	termsAccepted: boolean;
	countryCCA2: string;
	countryCallingCode: string;
}

interface IRegisterScreenViewProps extends ITranslatedProps {
	showModalForSMSCode: boolean;
	smsCodeErrorMessage: string | null;
	resendingCode: boolean;
	onSmsCodeConfirmed: (code: string) => void;
	onSmsCodeDeclined: () => void;
	onSmsCodeResend: () => void;
	onStartRegister: (userData: RegisterData) => void;
	onAlreadyHaveCode: () => void;
	onNavigateToTermsAndConditions: () => void;
}

interface ICountryData {
	cca2: string;
	callingCode: string;
}

const nameRef: React.RefObject<PrimaryTextInput> = React.createRef();
const usernameRef: React.RefObject<PrimaryTextInput> = React.createRef();
const phoneNumberRef: React.RefObject<TextInput> = React.createRef();
const passwordRef: React.RefObject<PrimaryTextInput> = React.createRef();
const confirmPasswordRef: React.RefObject<PrimaryTextInput> = React.createRef();

const EMAIL_SCHEMA = string().email();

const DEVICE_COUNTRY = DeviceInfo.getDeviceCountry();
const ALL_COUNTRIES = getAllCountries();
const COUNTRY_LIST = ALL_COUNTRIES.map((country: ICountryData) => country.cca2);
const DEVICE_COUNTRY_CALLING_CODE = ALL_COUNTRIES.reduce(
	(value: string, country: ICountryData) => (country.cca2 === DEVICE_COUNTRY ? country.callingCode : value),
	'',
);

const ErrorMessage: React.SFC<{text: any; visible: boolean}> = ({text, visible}) => (
	<React.Fragment>
		{visible && (
			<View style={style.errorContainer}>
				<Text style={style.errorText}>{text}</Text>
			</View>
		)}
	</React.Fragment>
);

export const RegisterScreenView: React.SFC<IRegisterScreenViewProps> = ({
	showModalForSMSCode,
	smsCodeErrorMessage,
	resendingCode,
	onSmsCodeConfirmed,
	onSmsCodeDeclined,
	onSmsCodeResend,
	onStartRegister,
	onAlreadyHaveCode,
	onNavigateToTermsAndConditions,
	getText,
}) => (
	<KeyboardContext.Consumer>
		{({safeRunAfterKeyboardHide}) => (
			<KeyboardAwareScrollView
				style={style.keyboardView}
				contentContainerStyle={style.container}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
				enableOnAndroid={true}
			>
				<Formik
					initialValues={{
						email: '',
						name: '',
						username: '',
						phoneNumber: '',
						password: '',
						confirmPassword: '',
						avatarImage: customStyleProps.defaultAvatarImage,
						termsAccepted: false,
						countryCCA2: DEVICE_COUNTRY,
						countryCallingCode: DEVICE_COUNTRY_CALLING_CODE,
					}}
					validate={({
						email,
						name,
						username,
						phoneNumber,
						password,
						confirmPassword,
						countryCallingCode,
						countryCCA2,
					}: RegisterFormData) => {
						const errors: FormikErrors<RegisterFormData> = {};
						if (!email) {
							errors.email = getText('register.screen.email.required');
						} else if (!EMAIL_SCHEMA.isValidSync(email)) {
							errors.email = getText('register.screen.email.invalid');
						}
						if (!name) {
							errors.name = getText('register.screen.name.required');
						}
						if (!username) {
							errors.username = getText('register.screen.username.required');
						}
						if (!phoneNumber) {
							errors.phoneNumber = getText('register.screen.phone.number.required');
						} else {
							try {
								const rawPhoneNumber = phoneUtil.parse(`+${countryCallingCode}${phoneNumber}`, countryCCA2);
								const isPhoneNumberValid = phoneUtil.isValidNumberForRegion(rawPhoneNumber, countryCCA2);
								if (!isPhoneNumberValid) {
									errors.phoneNumber = getText('register.screen.phone.number.invalid');
								}
							} catch (e) {
								errors.phoneNumber = getText('register.screen.phone.number.invalid');
							}
						}
						if (!password) {
							errors.password = getText('register.screen.confirm.password.required');
						} else {
							// const passwordErrors = PASSWORD_VALIDATOR_SCHEMA.validate(password, {list: true});
							// if (passwordErrors.length > 0) {
							// 	// @ts-ignore
							// 	errors.password = (
							// 		<React.Fragment>
							// 			<Text style={style.boldText}>{`${getText('register.password.invalid.policy')}: `}</Text>
							// 			{passwordErrors.map((error: string) => getText(PASSWORD_ERROR_MESSAGES[error])).join(', ')}
							// 		</React.Fragment>
							// 	);
							// }
						}
						if (!confirmPassword) {
							errors.confirmPassword = getText('register.screen.confirm.password.required');
						} else if (!errors.password && confirmPassword !== password) {
							errors.confirmPassword = getText('register.screen.confirm.password.mismatch');
						}
						return errors;
					}}
					onSubmit={({
						email,
						name,
						username,
						phoneNumber,
						countryCallingCode,
						password,
						avatarImage,
						countryCCA2,
					}: RegisterFormData) => {
						safeRunAfterKeyboardHide(() => {
							const rawPhoneNumber = phoneUtil.parse(`+${countryCallingCode}${phoneNumber}`, countryCCA2);
							onStartRegister({
								email,
								name,
								username,
								phoneNumber: phoneUtil.format(rawPhoneNumber, PhoneNumberFormat.E164),
								password,
								avatarImage,
							});
						});
						Keyboard.dismiss();
					}}
					render={({
						values: {
							email,
							name,
							username,
							phoneNumber,
							password,
							confirmPassword,
							termsAccepted,
							avatarImage,
							countryCCA2,
							countryCallingCode,
						},
						errors,
						handleBlur,
						handleSubmit,
						isValid,
						touched,
						setFieldValue,
						setFieldTouched,
					}: FormikProps<RegisterFormData>) => (
						<React.Fragment>
							<InputSMSCodeModal
								errorMessage={smsCodeErrorMessage}
								visible={showModalForSMSCode}
								confirmHandler={onSmsCodeConfirmed}
								declineHandler={onSmsCodeDeclined}
								resendHandler={onSmsCodeResend}
								phoneNumber={phoneNumber}
								resendingCode={resendingCode}
								getText={getText}
								marginBottom={0}
							/>
							<View style={style.avatarPickerContainer}>
								// @ts-ignore
								<AvatarPicker
									getText={getText}
									avatarImage={avatarImage}
									afterImagePick={(localPhotoPath: string) =>
										setFieldValue('avatarImage', {uri: localPhotoPath}, false)
									}
								/>
							</View>
							<View style={[style.textInputContainer, style.textInputContainerFirst]}>
								<ErrorMessage text={errors.email} visible={!!touched.email && !!errors.email} />
								<PrimaryTextInput
									iconColor={Colors.iron}
									icon={'envelope'}
									placeholder={getText('register.email')}
									placeholderColor={Colors.postText}
									borderColor={Colors.transparent}
									returnKeyType={TRKeyboardKeys.next}
									value={email}
									onChangeText={(value: string) => {
										setFieldValue('email', value);
										setFieldTouched('email');
									}}
									onSubmitPressed={() => nameRef.current && nameRef.current.focusInput()}
									keyboardType={TKeyboardKeys.emailAddress}
								/>
							</View>
							<View style={style.textInputContainer}>
								<ErrorMessage text={errors.name} visible={!!touched.name && !!errors.name} />
								<PrimaryTextInput
									autoCapitalize={'words'}
									autoCorrect={true}
									iconColor={Colors.iron}
									icon={'user'}
									placeholder={getText('register.name')}
									placeholderColor={Colors.postText}
									borderColor={Colors.transparent}
									returnKeyType={TRKeyboardKeys.next}
									value={name}
									ref={nameRef}
									onChangeText={(value: string) => {
										setFieldValue('name', value);
										setFieldTouched('name');
									}}
									onSubmitPressed={() => usernameRef.current && usernameRef.current.focusInput()}
								/>
							</View>
							<View style={style.textInputContainer}>
								<ErrorMessage text={errors.username} visible={!!touched.username && !!errors.username} />
								<PrimaryTextInput
									iconColor={Colors.iron}
									icon={'user'}
									placeholder={getText('register.username')}
									placeholderColor={Colors.postText}
									borderColor={Colors.transparent}
									returnKeyType={TRKeyboardKeys.next}
									value={username}
									ref={usernameRef}
									onChangeText={(value: string) => {
										setFieldValue('username', value);
										setFieldTouched('username');
									}}
									onSubmitPressed={() => phoneNumberRef.current && phoneNumberRef.current.focus()}
								/>
							</View>
							<View style={style.textInputContainer}>
								<ErrorMessage text={errors.phoneNumber} visible={!!touched.phoneNumber && !!errors.phoneNumber} />
								<View style={style.directionRow}>
									<View style={style.phoneInputIconContainer}>
										<Icon name={'phone'} style={style.phoneIcon} />
									</View>
									<View style={style.countryPickerContainer}>
										<CountryPicker
											countryList={COUNTRY_LIST}
											translation={'eng'}
											cca2={countryCCA2}
											onChange={(country: ICountryData) => {
												setFieldValue('countryCCA2', country.cca2);
												setFieldValue('countryCallingCode', country.callingCode);
											}}
											closeable={true}
											filterable={true}
											filterPlaceholder={getText('register.country.select')}
										/>
										<Text style={style.countryCode}>{`(+${countryCallingCode})`}</Text>
									</View>
									<TextInput
										placeholder={getText('register.phone.number')}
										placeholderTextColor={Colors.postText}
										style={style.phoneNumberInput}
										returnKeyType={TRKeyboardKeys.next}
										keyboardType={TKeyboardKeys.phonePad}
										autoCorrect={false}
										underlineColorAndroid={Colors.transparent}
										autoCapitalize={'none'}
										clearButtonMode={'while-editing'}
										value={phoneNumber}
										ref={phoneNumberRef}
										onChangeText={(value: string) => {
											setFieldValue('phoneNumber', value);
											setFieldTouched('phoneNumber');
										}}
										onSubmitEditing={() => passwordRef.current && passwordRef.current.focusInput()}
									/>
								</View>
							</View>
							<View style={style.textInputContainer}>
								<ErrorMessage text={errors.password} visible={!!touched.password && !!errors.password} />
								<PrimaryTextInput
									isPassword={true}
									iconColor={Colors.iron}
									icon={'lock'}
									placeholder={getText('register.password')}
									placeholderColor={Colors.postText}
									borderColor={Colors.transparent}
									returnKeyType={TRKeyboardKeys.next}
									value={password}
									ref={passwordRef}
									onChangeText={(value: string) => {
										setFieldValue('password', value);
										setFieldTouched('password');
									}}
									onSubmitPressed={() => confirmPasswordRef.current && confirmPasswordRef.current.focusInput()}
								/>
							</View>
							<View style={style.textInputContainer}>
								<ErrorMessage
									text={errors.confirmPassword}
									visible={!!touched.confirmPassword && !!errors.confirmPassword}
								/>
								<PrimaryTextInput
									isPassword={true}
									iconColor={Colors.iron}
									icon={'lock'}
									placeholder={getText('register.confirm.password')}
									placeholderColor={Colors.postText}
									borderColor={Colors.transparent}
									returnKeyType={TRKeyboardKeys.go}
									value={confirmPassword}
									ref={confirmPasswordRef}
									onChangeText={(value: string) => {
										setFieldValue('confirmPassword', value);
										setFieldTouched('confirmPassword');
									}}
									onSubmitPressed={handleSubmit}
									blurOnSubmit={true}
								/>
							</View>
							<View style={style.termsContainer}>
								<Text style={style.acceptText}>{getText('register.accept.part1')}</Text>
								<TouchableOpacity onPress={onNavigateToTermsAndConditions}>
									<Text style={style.acceptTextLink}>{getText('register.accept.part2')}</Text>
								</TouchableOpacity>
								<CheckBox
									checked={termsAccepted}
									onPress={() => setFieldValue('termsAccepted', !termsAccepted)}
									color={Colors.pink}
									style={style.acceptCheckbox}
								/>
							</View>
							<View style={style.buttonContainer}>
								// @ts-ignore
								<PrimaryButton
									label={getText('register.button.label')}
									onPress={handleSubmit}
									disabled={!(isValid && termsAccepted)}
									borderColor={Colors.transparent}
								/>
							</View>
							<View style={style.buttonContainer}>
								// @ts-ignore
								<PrimaryButton
									label={getText('register.button.have.code')}
									onPress={onAlreadyHaveCode}
									disabled={username === '' || !!errors.username}
									borderColor={Colors.transparent}
								/>
							</View>
						</React.Fragment>
					)}
				/>
			</KeyboardAwareScrollView>
		)}
	</KeyboardContext.Consumer>
);
