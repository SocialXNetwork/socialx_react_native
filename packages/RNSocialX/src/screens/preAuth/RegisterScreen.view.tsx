/**
 * TODO list:
 * 1. @Serkan, check password validation. Did not import the old helper because you mentioned it will be handled different.
 * 2. Decide where how prop marginBottom for InputSMSCodeModal should be implemented.
 * 3. Add validation for passwords (> 6), fullName (> 4), userName (> 6)
 */

import { Formik, FormikErrors, FormikProps } from 'formik';
import { CheckBox } from 'native-base';
import * as React from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import CountryPicker, {
	getAllCountries,
} from 'react-native-country-picker-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { string } from 'yup';

import {
	AvatarPicker,
	Header,
	HeaderButton,
	PrimaryButton,
	PrimaryTextInput,
	TKeyboardKeys,
	TRKeyboardKeys,
} from '../../components';
import { KeyboardContext } from '../../environment/consts';
import { ITranslatedProps } from '../../types';
import style, { colors } from './RegisterScreen.style';

export interface IRegisterData {
	email: string;
	name: string;
	userName: string;
	password: string;
	avatar: {
		uri: string;
	};
}

interface IRegisterFormData extends IRegisterData {
	confirmPassword: string;
	termsAccepted: boolean;
}

interface IRegisterScreenViewProps extends ITranslatedProps {
	onStartRegister: (userData: IRegisterData) => void;
	onNavigateToTermsAndConditions: () => void;
	onGoBack: () => void;
}

const nameRef: React.RefObject<PrimaryTextInput> = React.createRef();
const usernameRef: React.RefObject<PrimaryTextInput> = React.createRef();
const passwordRef: React.RefObject<PrimaryTextInput> = React.createRef();
const confirmPasswordRef: React.RefObject<PrimaryTextInput> = React.createRef();

const EMAIL_SCHEMA = string().email();

const ErrorMessage: React.SFC<{ text: any; visible: boolean }> = ({
	text,
	visible,
}) => (
	<React.Fragment>
		{visible && (
			<View style={style.errorContainer}>
				<Text style={style.errorText}>{text}</Text>
			</View>
		)}
	</React.Fragment>
);

export const RegisterScreenView: React.SFC<IRegisterScreenViewProps> = ({
	onStartRegister,
	onNavigateToTermsAndConditions,
	onGoBack,
	getText,
}) => (
	<KeyboardContext.Consumer>
		{({ safeRunAfterKeyboardHide }) => (
			<View style={{ flex: 1 }}>
				<Header
					title={getText('register.screen.title')}
					left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
				/>
				<KeyboardAwareScrollView
					style={style.keyboardView}
					contentContainerStyle={style.container}
					alwaysBounceVertical={false}
					keyboardShouldPersistTaps="handled"
					enableOnAndroid={true}
				>
					<Formik
						initialValues={{
							email: '',
							name: '',
							userName: '',
							password: '',
							confirmPassword: '',
							avatar: {
								uri: '',
							},
							termsAccepted: false,
						}}
						validate={({
							email,
							name,
							userName,
							password,
							confirmPassword,
							termsAccepted,
						}: IRegisterFormData) => {
							const errors: FormikErrors<IRegisterFormData> = {};
							if (!email) {
								errors.email = getText('register.screen.email.required');
							} else if (!EMAIL_SCHEMA.isValidSync(email)) {
								errors.email = getText('register.screen.email.invalid');
							}
							if (!name) {
								errors.name = getText('register.screen.name.required');
							}
							if (!userName) {
								errors.userName = getText('register.screen.userName.required');
							}
							if (!password) {
								errors.password = getText(
									'register.screen.confirm.password.required',
								);
							} else {
								// const passwordErrors = PASSWORD_VALIDATOR_SCHEMA.validate(password, {list: true});
								// if (passwordErrors.length > 0) {
								// 	errors.password = (
								// 		<React.Fragment>
								// 			<Text style={style.boldText}>{`${getText('register.password.invalid.policy')}: `}</Text>
								// 			{passwordErrors.map((error: string) => getText(PASSWORD_ERROR_MESSAGES[error])).join(', ')}
								// 		</React.Fragment>
								// 	);
								// }
							}
							if (!confirmPassword) {
								errors.confirmPassword = getText(
									'register.screen.confirm.password.required',
								);
							} else if (!errors.password && confirmPassword !== password) {
								errors.confirmPassword = getText(
									'register.screen.confirm.password.mismatch',
								);
							}
							if (!termsAccepted) {
								errors.termsAccepted = getText(
									'register.screen.terms.accepted',
								);
							}
							return errors;
						}}
						onSubmit={({
							termsAccepted,
							...registerData
						}: IRegisterFormData) => {
							safeRunAfterKeyboardHide(() => {
								onStartRegister(registerData);
							});
							Keyboard.dismiss();
						}}
						render={({
							values: {
								email,
								name,
								userName,
								password,
								confirmPassword,
								termsAccepted,
								avatar,
							},
							errors,
							handleSubmit,
							isValid,
							touched,
							setFieldValue,
							setFieldTouched,
						}: FormikProps<IRegisterFormData>) => (
							<React.Fragment>
								<View style={style.avatarPickerContainer}>
									<AvatarPicker
										getText={getText}
										avatarImage={avatar}
										afterImagePick={(localPhotoPath: string) =>
											setFieldValue('avatar', { uri: localPhotoPath }, false)
										}
									/>
								</View>
								<View
									style={[
										style.textInputContainer,
										style.textInputContainerFirst,
									]}
								>
									<ErrorMessage
										text={errors.email}
										visible={!!touched.email && !!errors.email}
									/>
									<PrimaryTextInput
										iconColor={colors.iron}
										icon="envelope"
										placeholder={getText('register.email')}
										placeholderColor={colors.postText}
										borderColor={colors.transparent}
										returnKeyType={TRKeyboardKeys.next}
										value={email}
										onChangeText={(value: string) => {
											setFieldValue('email', value);
											setFieldTouched('email');
										}}
										onSubmitPressed={() =>
											nameRef.current && nameRef.current.focusInput()
										}
										keyboardType={TKeyboardKeys.emailAddress}
									/>
								</View>
								<View style={style.textInputContainer}>
									<ErrorMessage
										text={errors.name}
										visible={!!touched.name && !!errors.name}
									/>
									<PrimaryTextInput
										autoCapitalize="words"
										autoCorrect={true}
										iconColor={colors.iron}
										icon="user"
										placeholder={getText('register.name')}
										placeholderColor={colors.postText}
										borderColor={colors.transparent}
										returnKeyType={TRKeyboardKeys.next}
										value={name}
										ref={nameRef}
										onChangeText={(value: string) => {
											setFieldValue('name', value);
											setFieldTouched('name');
										}}
										onSubmitPressed={() =>
											usernameRef.current && usernameRef.current.focusInput()
										}
									/>
								</View>
								<View style={style.textInputContainer}>
									<ErrorMessage
										text={errors.userName}
										visible={!!touched.userName && !!errors.userName}
									/>
									<PrimaryTextInput
										iconColor={colors.iron}
										icon="user"
										placeholder={getText('register.username')}
										placeholderColor={colors.postText}
										borderColor={colors.transparent}
										returnKeyType={TRKeyboardKeys.next}
										value={userName}
										ref={usernameRef}
										onChangeText={(value: string) => {
											setFieldValue('userName', value);
											setFieldTouched('userName');
										}}
										onSubmitPressed={() =>
											passwordRef.current && passwordRef.current.focusInput()
										}
									/>
								</View>
								<View style={style.textInputContainer}>
									<ErrorMessage
										text={errors.password}
										visible={!!touched.password && !!errors.password}
									/>
									<PrimaryTextInput
										isPassword={true}
										iconColor={colors.iron}
										icon="lock"
										placeholder={getText('register.password')}
										placeholderColor={colors.postText}
										borderColor={colors.transparent}
										returnKeyType={TRKeyboardKeys.next}
										value={password}
										ref={passwordRef}
										onChangeText={(value: string) => {
											setFieldValue('password', value);
											setFieldTouched('password');
										}}
										onSubmitPressed={() =>
											confirmPasswordRef.current &&
											confirmPasswordRef.current.focusInput()
										}
									/>
								</View>
								<View style={style.textInputContainer}>
									<ErrorMessage
										text={errors.confirmPassword}
										visible={
											!!touched.confirmPassword && !!errors.confirmPassword
										}
									/>
									<PrimaryTextInput
										isPassword={true}
										iconColor={colors.iron}
										icon="lock"
										placeholder={getText('register.confirm.password')}
										placeholderColor={colors.postText}
										borderColor={colors.transparent}
										returnKeyType={TRKeyboardKeys.done}
										value={confirmPassword}
										ref={confirmPasswordRef}
										onChangeText={(value: string) => {
											setFieldValue('confirmPassword', value);
											setFieldTouched('confirmPassword');
										}}
										blurOnSubmit={true}
									/>
								</View>
								<View style={style.termsContainer}>
									<Text style={style.acceptText}>
										{getText('register.accept.part1')}
									</Text>
									<TouchableOpacity onPress={onNavigateToTermsAndConditions}>
										<Text style={style.acceptTextLink}>
											{getText('register.accept.part2')}
										</Text>
									</TouchableOpacity>
									<CheckBox
										checked={termsAccepted}
										onPress={() =>
											setFieldValue('termsAccepted', !termsAccepted)
										}
										color={colors.pink}
										style={style.acceptCheckbox}
									/>
								</View>
								<View style={style.buttonContainer}>
									<PrimaryButton
										label={getText('register.button.label')}
										onPress={handleSubmit}
										disabled={!(isValid && termsAccepted)}
										borderColor={colors.transparent}
									/>
								</View>
							</React.Fragment>
						)}
					/>
				</KeyboardAwareScrollView>
			</View>
		)}
	</KeyboardContext.Consumer>
);
