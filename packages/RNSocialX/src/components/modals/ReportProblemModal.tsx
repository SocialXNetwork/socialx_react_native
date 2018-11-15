import * as React from 'react';
import { Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { BlurView } from 'react-native-blur';
import Modal from 'react-native-modal';

import { FormikBag, FormikErrors, FormikProps, withFormik } from 'formik';
import { PrimaryTextInput } from '..';
import { OS_TYPES } from '../../environment/consts';
import { ApplicationStyles, Colors, Icons } from '../../environment/theme';
import { IResizeProps, ITranslatedProps } from '../../types';
import { WithManagedTransitions } from '../managedTransitions';
import style from './ReportProblemModal.style';

interface IReportProblemModalProps extends IResizeProps, ITranslatedProps {
	visible: boolean;
	confirmHandler: (subject: string, description: string) => void;
	declineHandler: () => void;
}

interface IReportProblemModalComponentProps extends IReportProblemModalProps {
	subject: string;
	description: string;
}

const ReportProblemModalComponent: React.SFC<FormikProps<IReportProblemModalComponentProps>> = ({
	values: { visible, declineHandler, marginBottom, getText, description, subject },
	isValid,
	handleSubmit,
	errors,
	touched,
	setFieldTouched,
	setFieldValue,
}) => (
	<WithManagedTransitions modalVisible={visible}>
		{({ onDismiss, onModalHide }) => (
			<Modal
				onDismiss={onDismiss}
				onModalHide={onModalHide}
				isVisible={visible}
				backdropOpacity={Platform.select({ ios: 0, android: 0.7 })}
				animationIn="slideInDown"
				animationOut="slideOutUp"
				style={style.container}
			>
				{Platform.OS === OS_TYPES.IOS && (
					<TouchableWithoutFeedback onPress={declineHandler}>
						<BlurView style={style.blurView} blurType="dark" blurAmount={2} />
					</TouchableWithoutFeedback>
				)}
				<View style={[style.keyboardView, Platform.OS === OS_TYPES.IOS ? { marginBottom } : {}]}>
					<View style={style.boxContainer}>
						<View style={style.titleContainer}>
							<Text style={style.title}>{getText('modal.report.title')}</Text>
						</View>
						<View style={style.inputContainer}>
							<View style={style.subjectContainer}>
								<PrimaryTextInput
									autoCapitalize="sentences"
									autoCorrect={true}
									numberOfLines={2}
									borderColor={Colors.dustWhite}
									placeholder={getText('modal.report.subject.placeholder')}
									onChangeText={(value: string) => {
										setFieldValue('subject', value);
										setFieldTouched('subject');
									}}
									value={subject}
									blurOnSubmit={false}
								/>
								{touched.subject && errors.subject && (
									<Text style={ApplicationStyles.inputErrorText}>{getText(errors.subject)}</Text>
								)}
							</View>
							<View style={style.descriptionContainer}>
								<PrimaryTextInput
									autoCapitalize="sentences"
									autoCorrect={true}
									multiline={true}
									borderColor={Colors.dustWhite}
									placeholder={getText('modal.report.description.placeholder')}
									onChangeText={(value: string) => {
										setFieldValue('description', value);
										setFieldTouched('description');
									}}
									value={description}
									blurOnSubmit={false}
								/>
								{touched.description && errors.description && (
									<Text style={ApplicationStyles.inputErrorText}>
										{getText(errors.description)}
									</Text>
								)}
							</View>
						</View>
						<View style={style.buttonsContainer}>
							<TouchableOpacity style={[style.button, style.leftButton]} onPress={declineHandler}>
								<Text style={[style.buttonText, style.buttonTextCancel]}>
									{getText('button.cancel')}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[style.button, !isValid ? ApplicationStyles.buttonDisabled : {}]}
								disabled={!isValid}
								onPress={handleSubmit}
							>
								<Text style={[style.buttonText, style.buttonTextConfirm]}>
									{getText('button.send')}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);

const formikSettings = {
	mapPropsToValues: (props: IReportProblemModalProps) => ({
		...props,
		subject: '',
		description: '',
	}),
	validate: ({ subject, description }: IReportProblemModalComponentProps) => {
		const errors: FormikErrors<IReportProblemModalComponentProps> = {};
		if (!subject) {
			errors.subject = 'modal.report.subject.required';
		}
		if (!description) {
			errors.description = 'modal.report.description.required';
		}

		return errors;
	},
	handleSubmit: (
		{ subject, description }: IReportProblemModalComponentProps,
		{ props }: FormikBag<IReportProblemModalProps, IReportProblemModalComponentProps>,
	) => props.confirmHandler(subject, description),
	enableReinitialize: true,
};

export const ReportProblemModal = withFormik(formikSettings)(ReportProblemModalComponent as any);
