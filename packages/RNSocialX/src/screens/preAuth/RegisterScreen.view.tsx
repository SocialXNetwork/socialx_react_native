import { Formik, FormikErrors, FormikProps } from 'formik';
import { CheckBox } from 'native-base';
import * as React from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { string } from 'yup';

import {
	AvatarPicker,
	Header,
	PrimaryButton,
	PrimaryTextInput,
	TKeyboardKeys,
	TRKeyboardKeys,
} from '../../components';
import { Colors } from '../../environment/theme';
import { IDictionary, IOptionsMenuProps } from '../../types';

import styles from './RegisterScreen.style';

export interface IRegisterData {
	email: string;
	name: string;
	alias: string;
	password: string;
	avatar: {
		uri: string;
	};
}

interface IRegisterFormData extends IRegisterData {
	confirmPassword: string;
	termsAccepted: boolean;
}

interface IRegisterScreenViewProps extends IDictionary, IOptionsMenuProps {
	onRegister: (user: IRegisterData) => void;
	onNavigateToTermsAndConditions: () => void;
	onGoBack: () => void;
}

const nameRef: React.RefObject<PrimaryTextInput> = React.createRef();
const aliasRef: React.RefObject<PrimaryTextInput> = React.createRef();
const passwordRef: React.RefObject<PrimaryTextInput> = React.createRef();
const confirmPasswordRef: React.RefObject<PrimaryTextInput> = React.createRef();

const EMAIL_SCHEMA = string().email();

const ErrorMessage: React.SFC<{ text: any; visible: boolean }> = ({ text, visible }) => (
	<React.Fragment>
		{visible && (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>{text}</Text>
			</View>
		)}
	</React.Fragment>
);

export const RegisterScreenView: React.SFC<IRegisterScreenViewProps> = ({
	onRegister,
	onNavigateToTermsAndConditions,
	onGoBack,
	showOptionsMenu,
	dictionary,
}) => (
	<View style={{ flex: 1 }}>
		<Header title={dictionary.screens.register.title} back={true} onPressBack={onGoBack} />
		<KeyboardAwareScrollView
			style={styles.keyboardView}
			contentContainerStyle={styles.container}
			alwaysBounceVertical={false}
			keyboardShouldPersistTaps="handled"
			enableOnAndroid={true}
		>
			<Formik
				initialValues={{
					email: '',
					name: '',
					alias: '',
					password: '',
					confirmPassword: '',
					avatar: {
						uri: '',
					},
					termsAccepted: false,
				}}
				validate={({ email, name, alias, password, confirmPassword }: IRegisterFormData) => {
					const errors: FormikErrors<IRegisterFormData> = {};

					if (!email) {
						errors.email = dictionary.components.inputs.email.required;
					} else if (!EMAIL_SCHEMA.isValidSync(email)) {
						errors.email = dictionary.components.inputs.email.invalid;
					}

					if (!name) {
						errors.name = dictionary.components.inputs.name.required;
					} else if (name.length < 4) {
						errors.name = dictionary.components.inputs.name.length;
					}

					if (!alias) {
						errors.alias = dictionary.components.inputs.alias.required;
					} else if (alias.length < 6) {
						errors.alias = dictionary.components.inputs.alias.length;
					}

					if (!password) {
						errors.password = dictionary.components.inputs.password.required;
					} else if (password.length < 6) {
						errors.password = dictionary.components.inputs.password.length;
					}

					if (!confirmPassword) {
						errors.confirmPassword = dictionary.components.inputs.password.required;
					} else if (!errors.password && confirmPassword !== password) {
						errors.confirmPassword = dictionary.components.inputs.password.mismatch;
					}

					return errors;
				}}
				onSubmit={({ termsAccepted, ...data }: IRegisterFormData) => {
					onRegister(data);
					Keyboard.dismiss();
				}}
				render={({
					values: { email, name, alias, password, confirmPassword, termsAccepted, avatar },
					errors,
					handleSubmit,
					isValid,
					touched,
					setFieldValue,
					setFieldTouched,
				}: FormikProps<IRegisterFormData>) => (
					<React.Fragment>
						<View style={styles.avatarPickerContainer}>
							<AvatarPicker
								image={avatar.uri}
								afterImagePick={(path: string) => setFieldValue('avatar', { uri: path }, false)}
								showOptionsMenu={showOptionsMenu}
								dictionary={dictionary}
							/>
						</View>
						<View style={[styles.textInputContainer, styles.textInputContainerFirst]}>
							<PrimaryTextInput
								icon="ios-mail"
								placeholder={dictionary.components.inputs.placeholder.email}
								placeholderColor={Colors.paleSky}
								borderColor={Colors.transparent}
								returnKeyType={TRKeyboardKeys.next}
								keyboardType={TKeyboardKeys.emailAddress}
								value={email}
								persistKeyboard={true}
								onChangeText={(value: string) => {
									setFieldValue('email', value);
									setFieldTouched('email');
								}}
								onSubmitPressed={() => nameRef.current && nameRef.current.focusInput()}
							/>
							<ErrorMessage text={errors.email} visible={!!touched.email && !!errors.email} />
						</View>
						<View style={styles.textInputContainer}>
							<PrimaryTextInput
								autoCapitalize="words"
								icon="md-person"
								placeholder={dictionary.components.inputs.placeholder.name}
								placeholderColor={Colors.paleSky}
								borderColor={Colors.transparent}
								returnKeyType={TRKeyboardKeys.next}
								value={name}
								ref={nameRef}
								persistKeyboard={true}
								onChangeText={(value: string) => {
									setFieldValue('name', value);
									setFieldTouched('name');
								}}
								onSubmitPressed={() => aliasRef.current && aliasRef.current.focusInput()}
							/>
							<ErrorMessage text={errors.name} visible={!!touched.name && !!errors.name} />
						</View>
						<View style={styles.textInputContainer}>
							<PrimaryTextInput
								icon="md-person"
								placeholder={dictionary.components.inputs.placeholder.alias}
								placeholderColor={Colors.paleSky}
								borderColor={Colors.transparent}
								returnKeyType={TRKeyboardKeys.next}
								value={alias}
								ref={aliasRef}
								persistKeyboard={true}
								onChangeText={(value: string) => {
									setFieldValue('alias', value);
									setFieldTouched('alias');
								}}
								onSubmitPressed={() => passwordRef.current && passwordRef.current.focusInput()}
							/>
							<ErrorMessage text={errors.alias} visible={!!touched.alias && !!errors.alias} />
						</View>
						<View style={styles.textInputContainer}>
							<PrimaryTextInput
								isPassword={true}
								icon="ios-lock"
								placeholder={dictionary.components.inputs.placeholder.password}
								placeholderColor={Colors.paleSky}
								borderColor={Colors.transparent}
								returnKeyType={TRKeyboardKeys.next}
								value={password}
								ref={passwordRef}
								persistKeyboard={true}
								onChangeText={(value: string) => {
									setFieldValue('password', value);
									setFieldTouched('password');
								}}
								onSubmitPressed={() =>
									confirmPasswordRef.current && confirmPasswordRef.current.focusInput()
								}
							/>
							<ErrorMessage
								text={errors.password}
								visible={!!touched.password && !!errors.password}
							/>
						</View>
						<View style={styles.textInputContainer}>
							<PrimaryTextInput
								isPassword={true}
								icon="ios-lock"
								placeholder={dictionary.components.inputs.placeholder.confirm}
								placeholderColor={Colors.paleSky}
								borderColor={Colors.transparent}
								returnKeyType={TRKeyboardKeys.done}
								value={confirmPassword}
								ref={confirmPasswordRef}
								blurOnSubmit={true}
								onChangeText={(value: string) => {
									setFieldValue('confirmPassword', value);
									setFieldTouched('confirmPassword');
								}}
							/>
							<ErrorMessage
								text={errors.confirmPassword}
								visible={!!touched.confirmPassword && !!errors.confirmPassword}
							/>
						</View>
						<View style={styles.termsContainer}>
							<Text style={styles.acceptText}>{dictionary.screens.register.accept}</Text>
							<TouchableOpacity onPress={onNavigateToTermsAndConditions}>
								<Text style={styles.acceptTextLink}>{dictionary.screens.register.terms}</Text>
							</TouchableOpacity>
							<CheckBox
								checked={termsAccepted}
								onPress={() => setFieldValue('termsAccepted', !termsAccepted)}
								color={Colors.pink}
								style={styles.acceptCheckbox}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<PrimaryButton
								label={dictionary.components.buttons.register}
								onPress={handleSubmit}
								disabled={!(isValid && termsAccepted)}
								borderColor={Colors.transparent}
							/>
						</View>
					</React.Fragment>
				)}
			/>
		</KeyboardAwareScrollView>
	</View>
);
