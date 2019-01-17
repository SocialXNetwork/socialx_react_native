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
import { Colors } from '../../environment/theme';
import { IDictionary } from '../../types';
import style from './LoginScreen.style';

const passwordRef: React.RefObject<PrimaryTextInput> = React.createRef();
const aliasRef: React.RefObject<PrimaryTextInput> = React.createRef();

interface ILoginFormProps extends IDictionary {
	onLogin: (alias: string, password: string) => void;
}

interface ILoginScreenData {
	alias: string;
	password: string;
}

const LoginForm: React.SFC<ILoginFormProps> = ({ dictionary, onLogin }) => (
	<Formik
		initialValues={{
			alias: '',
			password: '',
		}}
		validate={({ alias, password }: ILoginScreenData) => {
			const errors: FormikErrors<ILoginScreenData> = {};

			if (!alias) {
				errors.alias = dictionary.screens.login.alias.required;
			}

			if (!password) {
				errors.password = dictionary.screens.login.password.required;
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
					placeholder={dictionary.components.inputs.alias}
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
				{touched.alias && errors.alias && <Text style={style.errorText}>{errors.alias}</Text>}
				<View style={style.passwordContainer}>
					<PrimaryTextInput
						icon="ios-lock"
						placeholder={dictionary.components.inputs.password}
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
						ref={passwordRef}
					/>
					{touched.password && errors.password && (
						<Text style={style.errorText}>{errors.password}</Text>
					)}
				</View>
				<View style={style.fullWidth}>
					<PrimaryButton
						label={dictionary.components.buttons.login}
						onPress={handleSubmit}
						disabled={!isValid}
						borderColor={Colors.transparent}
					/>
				</View>
			</React.Fragment>
		)}
	/>
);

interface ILoginScreenViewProps extends IDictionary {
	onLogin: (alias: string, password: string) => void;
	onNavigateToPasswordForgot: () => void;
	onNavigateToRegister: () => void;
	onGoBack: () => void;
}

export const LoginScreenView: React.SFC<ILoginScreenViewProps> = ({
	onLogin,
	onNavigateToPasswordForgot,
	onNavigateToRegister,
	onGoBack,
	dictionary,
}) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={style.screenContainer}>
		<Header
			title={dictionary.screens.login.title}
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
			<Text style={style.welcomeText}>{dictionary.screens.login.welcome}</Text>
			<LoginForm onLogin={onLogin} dictionary={dictionary} />
			<TouchableOpacity onPress={onNavigateToPasswordForgot} style={style.forgotPassword}>
				<Text style={style.forgotPasswordText}>{dictionary.screens.login.forgot}</Text>
			</TouchableOpacity>
			{/* <PrimaryButton
				label={getText('login.use.unlock.file')}
				onPress={onNavigateToUploadKey}
				borderColor={Colors.transparent}
				disabled={false}
			/> */}
			<View
				style={Platform.select({
					ios: [style.noAccountContainer, style.noAccountContainerIOS],
					android: [style.noAccountContainer, style.noAccountContainerAndroid],
				})}
			>
				<Text style={style.noAccountQuestion}>{dictionary.screens.login.account}</Text>
				<TouchableOpacity onPress={onNavigateToRegister}>
					<Text style={style.signUpText}>{dictionary.components.buttons.signUp}</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAwareScrollView>
	</SafeAreaView>
);
