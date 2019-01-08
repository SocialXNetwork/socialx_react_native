import { Formik, FormikErrors, FormikProps } from 'formik';
import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

import {
	Header,
	HeaderButton,
	PrimaryButton,
	PrimaryTextInput,
	TRKeyboardKeys,
} from '../../components';
import { ITranslatedProps } from '../../types';
import style, { customStyleProps } from './ForgotPasswordScreen.style';

interface IForgotPasswordScreenViewProps extends ITranslatedProps {
	onSendResetCode: (alias: string) => void;
	onGoBack: () => void;
}

interface IForgotPasswordData {
	alias: string;
}

export const ForgotPasswordScreenView: React.SFC<IForgotPasswordScreenViewProps> = ({
	onSendResetCode,
	onGoBack,
	getText,
}) => (
	<Formik
		initialValues={{
			alias: '',
		}}
		validate={({ alias }: IForgotPasswordData) => {
			const errors: FormikErrors<IForgotPasswordData> = {};
			if (!alias) {
				errors.alias = getText('forgot.password.userName.required');
			}
			return errors;
		}}
		onSubmit={(values: IForgotPasswordData) => onSendResetCode(values.alias)}
		render={({
			values: { alias },
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
					keyboardShouldPersistTaps="handled"
				>
					<Text style={style.descriptionText}>{getText('forgot.password.instructions')}</Text>
					<View style={style.usernameInputContainer}>
						<PrimaryTextInput
							placeholder={getText('forgot.password.userName')}
							iconColor={customStyleProps.usernameInputIconColor}
							icon="md-person"
							blurOnSubmit={true}
							returnKeyType={TRKeyboardKeys.go}
							value={alias}
							onSubmitPressed={handleSubmit}
							onChangeText={(value: string) => {
								setFieldValue('alias', value);
							}}
						/>
						{errors.alias && <Text style={style.errorText}>{errors.alias}</Text>}
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
