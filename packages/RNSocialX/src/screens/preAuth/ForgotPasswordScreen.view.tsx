import {Formik, FormikErrors, FormikProps} from 'formik';
import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';

import {Header, HeaderButton, PrimaryButton, PrimaryTextInput, TRKeyboardKeys} from '../../components';
import {ITranslatedProps} from '../../types';
import style, {customStyleProps} from './ForgotPasswordScreen.style';

interface IForgotPasswordScreenViewProps extends ITranslatedProps {
	onSendResetCode: (userName: string) => void;
	onGoBack: () => void;
}

interface IForgotPasswordData {
	userName: string;
}

export const ForgotPasswordScreenView: React.SFC<IForgotPasswordScreenViewProps> = ({
	onSendResetCode,
	onGoBack,
	getText,
}) => (
	<Formik
		initialValues={{
			userName: '',
		}}
		validate={({userName}: IForgotPasswordData) => {
			const errors: FormikErrors<IForgotPasswordData> = {};
			if (!userName) {
				errors.userName = getText('forgot.password.userName.required');
			}
			return errors;
		}}
		onSubmit={(values: IForgotPasswordData) => onSendResetCode(values.userName)}
		render={({
			values: {userName},
			errors,
			handleBlur,
			handleSubmit,
			isValid,
			setFieldValue,
		}: FormikProps<IForgotPasswordData>) => (
			<View style={style.container}>
				<Header
					title={getText('forgot.password.screen.title')}
					left={<HeaderButton iconName={'ios-arrow-back'} onPress={onGoBack} />}
				/>
				<ScrollView
					contentContainerStyle={style.contentContainer}
					alwaysBounceVertical={false}
					keyboardShouldPersistTaps={'handled'}
				>
					<Text style={style.descriptionText}>{getText('forgot.password.instructions')}</Text>
					<View style={style.usernameInputContainer}>
						<PrimaryTextInput
							placeholder={getText('forgot.password.userName')}
							iconColor={customStyleProps.usernameInputIconColor}
							icon={'user'}
							blurOnSubmit={true}
							returnKeyType={TRKeyboardKeys.go}
							value={userName}
							onSubmitPressed={handleSubmit}
							onChangeText={(value: string) => {
								setFieldValue('userName', value);
							}}
						/>
						{errors.userName && <Text style={style.errorText}>{errors.userName}</Text>}
					</View>
					<PrimaryButton
						disabled={!isValid}
						label={getText('forgot.password.send.button')}
						autoWidth={true}
						borderColor={customStyleProps.transparentBorder}
						onPress={handleSubmit}
					/>
				</ScrollView>
			</View>
		)}
	/>
);
