import { Formik, FormikErrors, FormikProps } from 'formik';
import * as React from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-navigation';

import {
	Header,
	HeaderButton,
	PrimaryButton,
	PrimaryTextInput,
	TKeyboardKeys,
	TRKeyboardKeys,
} from '../../components';
import { KeyboardContext } from '../../environment/consts';
import { IError, ITranslatedProps } from '../../types';

import style, { customStyleProps } from './LoginScreen.style';

const passwordRef: React.RefObject<PrimaryTextInput> = React.createRef();
const usernameRef: React.RefObject<PrimaryTextInput> = React.createRef();

interface ILoginFormProps extends ITranslatedProps {
	authErrors: IError[];
	onStartLogin: (userName: string, password: string) => void;
}

interface ILoginScreenData {
	userName: string;
	password: string;
}

const LoginForm: React.SFC<ILoginFormProps> = ({
	getText,
	onStartLogin,
	authErrors,
}) => (
	<KeyboardContext.Consumer>
		{({ safeRunAfterKeyboardHide }) => (
			<Formik
				initialValues={{
					userName: 'alexsirbu',
					password: 'password',
				}}
				validate={({ userName, password }: ILoginScreenData) => {
					const errors: FormikErrors<ILoginScreenData> = {};
					if (!userName) {
						errors.userName = getText('login.username.required');
					}
					if (!password) {
						errors.password = getText('login.password.required');
					}
					return errors;
				}}
				onSubmit={(values: ILoginScreenData) => {
					safeRunAfterKeyboardHide(() =>
						onStartLogin(values.userName, values.password),
					);
					Keyboard.dismiss();
				}}
				render={({
					values: { userName, password },
					errors,
					handleSubmit,
					isValid,
					touched,
					setFieldValue,
					setFieldTouched,
				}: FormikProps<ILoginScreenData>) => (
					<React.Fragment>
						<PrimaryTextInput
							icon="md-person"
							placeholder={getText('login.username.input')}
							placeholderColor={customStyleProps.inputPlaceholderColor}
							returnKeyType={TRKeyboardKeys.next}
							keyboardType={TKeyboardKeys.emailAddress}
							value={userName}
							onChangeText={(value: string) => {
								setFieldValue('userName', value);
								setFieldTouched('userName');
							}}
							focusUpdateHandler={(hasFocus) =>
								!hasFocus && setFieldTouched('userName')
							}
							onSubmitPressed={() =>
								passwordRef.current && passwordRef.current.focusInput()
							}
							ref={usernameRef}
						/>
						{touched.userName &&
							errors.userName && (
								<Text style={style.errorText}>{errors.userName}</Text>
							)}
						<View style={style.passwordContainer}>
							<PrimaryTextInput
								icon="ios-lock"
								placeholder={getText('login.password.input')}
								placeholderColor={customStyleProps.inputPlaceholderColor}
								returnKeyType={TRKeyboardKeys.go}
								onSubmitPressed={handleSubmit}
								isPassword={true}
								blurOnSubmit={true}
								value={password}
								onChangeText={(value: string) => {
									setFieldValue('password', value);
									setFieldTouched('password');
								}}
								focusUpdateHandler={(hasFocus) =>
									!hasFocus && setFieldTouched('password')
								}
								ref={passwordRef}
							/>
							{touched.password &&
								errors.password && (
									<Text style={style.errorText}>{errors.password}</Text>
								)}
						</View>
						<View style={style.authErrorContainer}>
							{authErrors.map((error) => (
								<Text style={style.authError} key={error.uuid}>
									{getText(`error.${error.type}`)}
								</Text>
							))}
						</View>
						<View style={style.fullWidth}>
							<PrimaryButton
								label={getText('login.login.button')}
								onPress={handleSubmit}
								// disabled={!isValid}
								borderColor={customStyleProps.borderTransparent}
							/>
						</View>
					</React.Fragment>
				)}
			/>
		)}
	</KeyboardContext.Consumer>
);

interface ILoginScreenViewProps extends ITranslatedProps {
	errors: IError[];
	onStartLogin: (userName: string, password: string) => void;
	onNavigateToPasswordForgot: () => void;
	onNavigateToRegister: () => void;
	onNavigateToUploadKey: () => void;
	onGoBack: () => void;
}

export const LoginScreenView: React.SFC<ILoginScreenViewProps> = ({
	errors,
	onStartLogin,
	onNavigateToPasswordForgot,
	onNavigateToRegister,
	onNavigateToUploadKey,
	onGoBack,
	getText,
}) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={style.screenContainer}>
		<Header
			title={getText('login.screen.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<KeyboardAwareScrollView
			style={style.keyboardView}
			contentContainerStyle={style.container}
			alwaysBounceVertical={false}
			keyboardDismissMode="interactive"
			keyboardShouldPersistTaps="handled"
		>
			<Text style={style.welcomeText}>{getText('login.welcome.message')}</Text>
			<LoginForm
				authErrors={errors}
				getText={getText}
				onStartLogin={onStartLogin}
			/>
			<TouchableOpacity
				onPress={onNavigateToPasswordForgot}
				style={style.forgotPassword}
			>
				<Text style={style.forgotPasswordText}>
					{getText('login.forgot.password')}
				</Text>
			</TouchableOpacity>
			<PrimaryButton
				label={getText('login.use.unlock.file')}
				onPress={onNavigateToUploadKey}
				borderColor={customStyleProps.borderTransparent}
				disabled={false}
			/>
			<View style={style.noAccountContainer}>
				<Text style={style.noAccountQuestion}>
					{getText('login.no.account.text')}
				</Text>
				<TouchableOpacity onPress={onNavigateToRegister}>
					<Text style={style.signUpText}>{getText('login.signUp.button')}</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAwareScrollView>
	</SafeAreaView>
);
