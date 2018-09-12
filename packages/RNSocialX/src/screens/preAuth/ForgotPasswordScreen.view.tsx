import {Formik, FormikErrors, FormikProps} from 'formik';
import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';

import {PrimaryButton, PrimaryTextInput, TRKeyboardKeys} from '../../components';
import {ITranslatedProps} from '../../types';
import style, {customStyleProps} from './ForgotPasswordScreen.style';

interface IForgotPasswordScreenViewProps extends ITranslatedProps {
	onSendResetCode: (username: string) => void;
}

interface ForgotPasswordData {
	username: string;
}

export const ForgotPasswordScreenView: React.SFC<IForgotPasswordScreenViewProps> = ({onSendResetCode, getText}) => (
	<Formik
		initialValues={{
			username: '',
		}}
		validate={({username}: ForgotPasswordData) => {
			const errors: FormikErrors<ForgotPasswordData> = {};
			if (!username) {
				errors.username = getText('forgot.password.username.required');
			}
			return errors;
		}}
		onSubmit={(values: ForgotPasswordData) => onSendResetCode(values.username)}
		render={({
			values: {username},
			errors,
			handleBlur,
			handleSubmit,
			isValid,
			setFieldValue,
		}: FormikProps<ForgotPasswordData>) => (
			<ScrollView
				contentContainerStyle={style.container}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
			>
				<Text style={style.descriptionText}>{getText('forgot.password.instructions')}</Text>
				<View style={style.usernameInputContainer}>
					<PrimaryTextInput
						placeholder={getText('forgot.password.username')}
						iconColor={customStyleProps.usernameInputIconColor}
						icon={'user'}
						blurOnSubmit={true}
						returnKeyType={TRKeyboardKeys.go}
						value={username}
						onSubmitPressed={handleSubmit}
						onChangeText={(value: string) => {
							setFieldValue('username', value);
						}}
					/>
					{errors.username && <Text style={style.errorText}>{errors.username}</Text>}
				</View>
				// @ts-ignore
				<PrimaryButton
					disabled={!isValid}
					label={getText('forgot.password.send.button')}
					autoWidth={true}
					borderColor={customStyleProps.transparentBorder}
					onPress={handleSubmit}
				/>
			</ScrollView>
		)}
	/>
);
