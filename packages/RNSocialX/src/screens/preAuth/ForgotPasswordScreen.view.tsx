import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Header, PrimaryButton, PrimaryTextInput, TRKeyboardKeys } from '../../components';
import { Colors } from '../../environment/theme';
import { IDictionary } from '../../types';
import styles from './ForgotPasswordScreen.style';

interface IProps extends IDictionary {
	onSendResetCode: (alias: string) => void;
	onGoBack: () => void;
}

interface IForgotPasswordData {
	alias: string;
}

export const ForgotPasswordScreenView: React.SFC<IProps> = ({
	dictionary,
	onSendResetCode,
	onGoBack,
}) => (
	<Formik
		initialValues={{
			alias: '',
		}}
		onSubmit={(values: IForgotPasswordData) => onSendResetCode(values.alias)}
		render={({
			values: { alias },
			errors,
			handleSubmit,
			isValid,
			setFieldValue,
		}: FormikProps<IForgotPasswordData>) => (
			<View style={styles.container}>
				<Header
					title={dictionary.screens.forgotPassword.title}
					back={true}
					onPressBack={onGoBack}
				/>
				<ScrollView
					contentContainerStyle={styles.contentContainer}
					alwaysBounceVertical={false}
					keyboardShouldPersistTaps="handled"
				>
					<Text style={styles.descriptionText}>
						{dictionary.screens.forgotPassword.instructions}
					</Text>
					<View style={styles.usernameInputContainer}>
						<PrimaryTextInput
							placeholder={dictionary.components.inputs.placeholder.alias}
							iconColor={Colors.iron}
							icon="md-person"
							blurOnSubmit={true}
							returnKeyType={TRKeyboardKeys.go}
							value={alias}
							onSubmitPressed={handleSubmit}
							onChangeText={(value: string) => setFieldValue('alias', value)}
						/>
						{errors.alias && <Text style={styles.errorText}>{errors.alias}</Text>}
					</View>
					<PrimaryButton
						disabled={!isValid}
						label={dictionary.components.buttons.resetCode}
						autoWidth={true}
						borderColor={Colors.transparent}
						onPress={handleSubmit}
					/>
				</ScrollView>
			</View>
		)}
	/>
);
