/**
 * TODO list:
 * 1. Discuss about a schema library for all validations @Serkan
 */

import { Formik, FormikErrors, FormikProps } from 'formik';
import * as React from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
	Header,
	PrimaryButton,
	PrimaryTextInput,
	TKeyboardKeys,
	TRKeyboardKeys,
} from '../../components';
import { ITranslatedProps } from '../../types';
import styles, { defaultColors } from './ResetPasswordScreen.style';

interface IResetPasswordScreenViewProps extends ITranslatedProps {
	onSetNewPassword: (resetCode: string, password: string) => void;
	onGoBack: () => void;
}

interface IResetPasswordForm {
	resetCode: string;
	password: string;
	confirmPassword: string;
}

const passwordRef: React.RefObject<PrimaryTextInput> = React.createRef();
const confirmPasswordRef: React.RefObject<PrimaryTextInput> = React.createRef();

const ErrorMessage: React.SFC<{ text: any; visible: boolean }> = ({ text, visible }) => (
	<React.Fragment>{visible && <Text style={styles.errorText}>{text}</Text>}</React.Fragment>
);

export const ResetPasswordScreenView: React.SFC<IResetPasswordScreenViewProps> = ({
	onSetNewPassword,
	onGoBack,
	getText,
}) => (
	<Formik
		initialValues={{
			resetCode: '',
			password: '',
			confirmPassword: '',
		}}
		validate={({ resetCode, password, confirmPassword }: IResetPasswordForm) => {
			const errors: FormikErrors<IResetPasswordForm> = {};
			if (!resetCode) {
				errors.resetCode = getText('reset.password.code.required');
			}

			if (!password) {
				errors.password = getText('reset.password.password.required');
			} else {
				// const passwordErrors = PASSWORD_VALIDATOR_SCHEMA.validate(password, {list: true});
				// if (passwordErrors.length > 0) {
				// 	errors.password = (
				// 		<React.Fragment>
				// 			<Text style={styles.boldText}>{`${getText('register.password.invalid.policy')}: `}</Text>
				// 			{passwordErrors.map((error: string) => getText(PASSWORD_ERROR_MESSAGES[error])).join(', ')}
				// 		</React.Fragment>
				// 	);
				// }
			}

			if (!confirmPassword) {
				errors.confirmPassword = getText('reset.password.confirm.password.required');
			} else if (!errors.password && confirmPassword !== password) {
				errors.confirmPassword = getText('reset.password.error.mismatch');
			}
			return errors;
		}}
		onSubmit={(values: IResetPasswordForm) => onSetNewPassword(values.resetCode, values.password)}
		render={({
			values: { resetCode, password, confirmPassword },
			isValid,
			handleSubmit,
			errors,
			touched,
			setFieldValue,
			setFieldTouched,
		}: FormikProps<IResetPasswordForm>) => (
			<View style={styles.container}>
				<Header title={getText('reset.password.screen.title')} back={true} onPressBack={onGoBack} />
				<KeyboardAwareScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scrollContent}
					alwaysBounceVertical={false}
					keyboardShouldPersistTaps="handled"
					enableOnAndroid={true}
				>
					<Text style={styles.descriptionText}>{getText('reset.password.description')}</Text>
					<View style={styles.inputContainer}>
						<PrimaryTextInput
							placeholder={getText('reset.password.reset.code')}
							iconColor={defaultColors.iron}
							icon="key"
							keyboardType={TKeyboardKeys.numeric}
							blurOnSubmit={false}
							returnKeyType={TRKeyboardKeys.next}
							value={resetCode}
							onChangeText={(value: string) => {
								setFieldValue('resetCode', value);
								setFieldTouched('resetCode');
							}}
							onSubmitPressed={() => passwordRef.current && passwordRef.current.focusInput()}
						/>
						<ErrorMessage
							text={errors.resetCode}
							visible={!!errors.resetCode && !!touched.resetCode}
						/>
					</View>
					<View style={styles.inputContainer}>
						<PrimaryTextInput
							placeholder={getText('reset.password.new.password')}
							iconColor={defaultColors.iron}
							icon="eye-slash"
							blurOnSubmit={false}
							isPassword={true}
							returnKeyType={TRKeyboardKeys.next}
							value={password}
							onChangeText={(value: string) => {
								setFieldValue('password', value);
								setFieldTouched('password');
							}}
							onSubmitPressed={() =>
								confirmPasswordRef.current && confirmPasswordRef.current.focusInput()
							}
							ref={passwordRef}
						/>
						<ErrorMessage
							text={errors.password}
							visible={!!errors.password && !!touched.password}
						/>
					</View>
					<View style={styles.inputContainer}>
						<PrimaryTextInput
							placeholder={getText('reset.password.confirm.password')}
							iconColor={defaultColors.iron}
							icon="eye-slash"
							blurOnSubmit={true}
							isPassword={true}
							returnKeyType={TRKeyboardKeys.go}
							value={confirmPassword}
							onChangeText={(value: string) => {
								setFieldValue('confirmPassword', value);
								setFieldTouched('confirmPassword');
							}}
							onSubmitPressed={handleSubmit}
							ref={confirmPasswordRef}
						/>
						<ErrorMessage
							text={errors.confirmPassword}
							visible={!!errors.confirmPassword && !!touched.confirmPassword}
						/>
					</View>
					<PrimaryButton
						disabled={!isValid}
						label={getText('reset.password.set.button')}
						autoWidth={true}
						borderColor={defaultColors.transparent}
						onPress={handleSubmit}
					/>
				</KeyboardAwareScrollView>
			</View>
		)}
	/>
);
