import { Formik, FormikErrors, FormikProps } from 'formik';
import * as React from 'react';
import { Keyboard, Platform, Text, TouchableOpacity, View } from 'react-native';
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
import { ITranslatedProps } from '../../types';

import style, { customStyleProps } from './LoginScreen.style';

const passwordRef: React.RefObject<PrimaryTextInput> = React.createRef();
const aliasRef: React.RefObject<PrimaryTextInput> = React.createRef();

interface ILoginFormProps extends ITranslatedProps {
	onLogin: (alias: string, password: string) => void;
}

interface ILoginScreenData {
	alias: string;
	password: string;
}

const LoginForm: React.SFC<ILoginFormProps> = ({ getText, onLogin }) => (
	<Formik
		initialValues={{
			alias: '',
			password: '',
		}}
		validate={({ alias, password }: ILoginScreenData) => {
			const errors: FormikErrors<ILoginScreenData> = {};
			if (!alias) {
				errors.alias = getText('login.alias.required');
			}
			if (!password) {
				errors.password = getText('login.password.required');
			}
			return errors;
		}}
		onSubmit={(values: ILoginScreenData) => {
			onLogin(values.alias, values.password);
			Keyboard.dismiss();
		}}
		render={({
			values: { alias, password },
			errors,
			handleSubmit,
			touched,
			isValid,
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
					value={alias}
					persistKeyboard={true}
					onChangeText={(value: string) => {
						setFieldValue('alias', value);
						setFieldTouched('alias');
					}}
					onSetFocus={(hasFocus) => !hasFocus && setFieldTouched('alias')}
					onSubmitPressed={() => passwordRef.current && passwordRef.current.focusInput()}
					ref={aliasRef}
				/>
				{touched.alias && errors.alias && <Text style={style.errorText}>{errors.alias}</Text>}
				<View style={style.passwordContainer}>
					<PrimaryTextInput
						icon="ios-lock"
						placeholder={getText('login.password.input')}
						placeholderColor={customStyleProps.inputPlaceholderColor}
						returnKeyType={TRKeyboardKeys.go}
						isPassword={true}
						blurOnSubmit={true}
						value={password}
						onChangeText={(value: string) => {
							setFieldValue('password', value);
							setFieldTouched('password');
						}}
						onSetFocus={(hasFocus) => !hasFocus && setFieldTouched('password')}
						onSubmitPressed={handleSubmit}
						ref={passwordRef}
					/>
					{touched.password && errors.password && (
						<Text style={style.errorText}>{errors.password}</Text>
					)}
				</View>
				<View style={style.fullWidth}>
					<PrimaryButton
						label={getText('login.login.button')}
						onPress={handleSubmit}
						disabled={!isValid}
						borderColor={customStyleProps.borderTransparent}
					/>
				</View>
			</React.Fragment>
		)}
	/>
);

interface ILoginScreenViewProps extends ITranslatedProps {
	onLogin: (alias: string, password: string) => void;
	onNavigateToPasswordForgot: () => void;
	onNavigateToRegister: () => void;
	onNavigateToUploadKey: () => void;
	onGoBack: () => void;
}

export const LoginScreenView: React.SFC<ILoginScreenViewProps> = ({
	onLogin,
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
			contentContainerStyle={Platform.select({
				ios: [style.container, style.containerIOS],
				android: [style.container],
			})}
			alwaysBounceVertical={false}
			keyboardDismissMode="interactive"
			keyboardShouldPersistTaps="handled"
		>
			<Text style={style.welcomeText}>{getText('login.welcome.message')}</Text>
			<LoginForm onLogin={onLogin} getText={getText} />
			<TouchableOpacity onPress={onNavigateToPasswordForgot} style={style.forgotPassword}>
				<Text style={style.forgotPasswordText}>{getText('login.forgot.password')}</Text>
			</TouchableOpacity>
			<PrimaryButton
				label={getText('login.use.unlock.file')}
				onPress={onNavigateToUploadKey}
				borderColor={customStyleProps.borderTransparent}
				disabled={false}
			/>
			<View
				style={Platform.select({
					ios: [style.noAccountContainer, style.noAccountContainerIOS],
					android: [style.noAccountContainer, style.noAccountContainerAndroid],
				})}
			>
				<Text style={style.noAccountQuestion}>{getText('login.no.account.text')}</Text>
				<TouchableOpacity onPress={onNavigateToRegister}>
					<Text style={style.signUpText}>{getText('login.signUp.button')}</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAwareScrollView>
	</SafeAreaView>
);
