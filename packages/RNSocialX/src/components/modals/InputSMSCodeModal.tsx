import { FormikBag, FormikErrors, FormikProps, withFormik } from 'formik';
import * as React from 'react';
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import Modal from 'react-native-modal';

import { TKeyboardKeys, WithManagedTransitions } from '..';
import { ITranslatedProps } from '../../types';
import style, { customStyleProps } from './InputSMSCodeModal.style';

const NUMBER_OF_DIGITS = 6;

interface IInputSMSCodeModalComponentProps extends ITranslatedProps {
	visible: boolean;
	phoneNumber: string;
	errorMessage: string | null;
	resendingCode: boolean;
	confirmHandler: (code: string) => void;
	declineHandler: () => void;
	resendHandler: () => void;
}

interface IWithSMSCodeProps extends IInputSMSCodeModalComponentProps, ITranslatedProps {
	smsCode: string;
}

const InputSMSCodeModalComponent: React.SFC<FormikProps<IWithSMSCodeProps>> = ({
	values: {
		visible,
		phoneNumber,
		errorMessage = null,
		declineHandler,
		resendHandler,
		smsCode,
		resendingCode,
		getText,
	},
	isValid,
	handleSubmit,
	setFieldTouched,
	setFieldValue,
}) => (
	<WithManagedTransitions modalVisible={visible}>
		{({ onDismiss, onModalHide }) => (
			<Modal
				onModalHide={onModalHide}
				onDismiss={onDismiss}
				isVisible={visible}
				backdropOpacity={0.5}
				animationIn="zoomIn"
				animationOut="zoomOut"
				onBackdropPress={declineHandler}
				style={style.container}
			>
				<View style={style.boxContainer}>
					<Text style={style.title}>{getText('modal.sms.code.title')}</Text>
					<View style={style.borderContainer}>
						<Text style={style.message}>{`${getText(
							'modal.sms.code.type.code.message',
						)} ${phoneNumber}`}</Text>
						<View style={style.inputCellsContainer}>
							<TextInput
								style={[style.codeInput, style.inputText]}
								placeholder={'123456'}
								keyboardType={TKeyboardKeys.numeric}
								maxLength={6}
								autoFocus={true}
								onChangeText={(value: string) => {
									setFieldValue('smsCode', value);
									setFieldTouched('smsCode');
								}}
								underlineColorAndroid={customStyleProps.underlineColorAndroid}
							>
								<Text style={style.inputText}>{smsCode}</Text>
							</TextInput>
						</View>
					</View>
					{errorMessage && <Text style={style.errorMessage}>{errorMessage}</Text>}
					<View style={style.buttonsContainer}>
						<TouchableOpacity
							style={[style.button, resendingCode ? style.disabledButton : {}]}
							onPress={resendHandler}
							disabled={resendingCode}
						>
							<Text style={[style.buttonText, style.buttonTextConfirm]}>
								{getText('modal.sms.code.resend.button')}
							</Text>
						</TouchableOpacity>
						{resendingCode && (
							<ActivityIndicator
								size={'small'}
								color={customStyleProps.activityIndicatorColor}
								style={style.activityResend}
							/>
						)}
					</View>
					<View style={style.buttonsContainer}>
						<TouchableOpacity
							style={[style.button, style.leftButton, style.flexButton]}
							onPress={declineHandler}
						>
							<Text style={[style.buttonText, style.buttonTextCancel]}>
								{getText('button.cancel')}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[style.button, style.flexButton, !isValid ? style.disabledButton : {}]}
							onPress={handleSubmit}
							disabled={!isValid}
						>
							<Text style={[style.buttonText, style.buttonTextConfirm]}>
								{getText('button.OK')}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);

const formikSettings = {
	mapPropsToValues: (props: IInputSMSCodeModalComponentProps) => ({
		...props,
		smsCode: '',
	}),
	validate: ({ smsCode }: IWithSMSCodeProps) => {
		const errors: FormikErrors<IWithSMSCodeProps> = {};
		if (!smsCode || smsCode.length < NUMBER_OF_DIGITS) {
			errors.smsCode = 'dummy';
		}
		return errors;
	},
	handleSubmit: async (
		{ smsCode }: IWithSMSCodeProps,
		{ props }: FormikBag<IInputSMSCodeModalComponentProps, IInputSMSCodeModalComponentProps>,
	) => props.confirmHandler(smsCode),
	enableReinitialize: true,
};

export const InputSMSCodeModal = withFormik(formikSettings)(InputSMSCodeModalComponent as any);
