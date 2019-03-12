import { Formik, FormikErrors, FormikProps } from 'formik';
import * as React from 'react';
import { Keyboard, Platform, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-navigation';

import {
	Header,
	PrimaryButton,
	PrimaryTextInput,
	TKeyboardKeys,
	TRKeyboardKeys,
} from '../../components';
import { Colors } from '../../environment/theme';
import { IDictionary } from '../../types';
import styles from './LoginScreen.style';

const passwordRef: React.RefObject<PrimaryTextInput> = React.createRef();
const aliasRef: React.RefObject<PrimaryTextInput> = React.createRef();

interface ILoginFormProps extends IDictionary {
	onLogin: (alias: string, password: string) => void;
	loginDisabled?: boolean;
}

interface ILoginScreenData {
	alias: string;
	password: string;
}

const LoginForm: React.SFC<ILoginFormProps> = ({ dictionary, onLogin, loginDisabled }) => (
	<Formik
		initialValues={{
			alias: '',
			password: '',
		}}
		validate={({ alias, password }: ILoginScreenData) => {
			const errors: FormikErrors<ILoginScreenData> = {};

			if (!alias) {
				errors.alias = dictionary.components.inputs.alias.required;
			}

			if (!password) {
				errors.password = dictionary.components.inputs.password.required;
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
				<View style={styles.inputContainer}>
					<PrimaryTextInput
						icon="md-person"
						placeholder={dictionary.components.inputs.placeholder.alias}
						placeholderColor={Colors.paleSky}
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
					{touched.alias && errors.alias && <Text style={styles.errorText}>{errors.alias}</Text>}
				</View>
				<View style={styles.inputContainer}>
					<PrimaryTextInput
						ref={passwordRef}
						icon="ios-lock"
						placeholder={dictionary.components.inputs.placeholder.password}
						placeholderColor={Colors.paleSky}
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
					/>
					{touched.password && errors.password && (
						<Text style={styles.errorText}>{errors.password}</Text>
					)}
				</View>
				<View style={styles.fullWidth}>
					<PrimaryButton
						label={dictionary.components.buttons.login}
						onPress={handleSubmit}
						disabled={!isValid || loginDisabled}
						borderColor={Colors.transparent}
					/>
				</View>
			</React.Fragment>
		)}
	/>
);

interface IProps extends IDictionary {
	onLogin: (alias: string, password: string) => void;
	onNavigateToPasswordForgot: () => void;
	onNavigateToRegister: () => void;
	onGoBack: () => void;
	loginDisabled?: boolean;
}

export const LoginScreenView: React.SFC<IProps> = ({
	dictionary,
	onLogin,
	onNavigateToPasswordForgot,
	onNavigateToRegister,
	onGoBack,
	loginDisabled,
}) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={styles.screenContainer}>
		<Header title={dictionary.screens.login.title} back={true} onPressBack={onGoBack} />
		<KeyboardAwareScrollView
			style={styles.keyboardView}
			contentContainerStyle={Platform.select({
				ios: [styles.container, { flex: 1 }],
				android: [styles.container],
			})}
			alwaysBounceVertical={false}
			keyboardDismissMode="interactive"
			keyboardShouldPersistTaps="handled"
		>
			<Text style={styles.welcomeText}>{dictionary.screens.login.welcome}</Text>
			<LoginForm onLogin={onLogin} dictionary={dictionary} loginDisabled={loginDisabled} />
			<TouchableOpacity onPress={onNavigateToPasswordForgot} style={styles.forgotPassword}>
				<Text style={styles.forgotPasswordText}>{dictionary.screens.login.forgot}</Text>
			</TouchableOpacity>
			{/* <PrimaryButton
				label={getText('login.use.unlock.file')}
				onPress={onNavigateToUploadKey}
				borderColor={Colors.transparent}
				disabled={false}
			/> */}
			<View style={styles.noAccountContainer}>
				<Text style={styles.noAccountQuestion}>{dictionary.screens.login.account}</Text>
				<TouchableOpacity onPress={onNavigateToRegister}>
					<Text style={styles.signUpText}>{dictionary.components.buttons.signUp}</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAwareScrollView>
	</SafeAreaView>
);
