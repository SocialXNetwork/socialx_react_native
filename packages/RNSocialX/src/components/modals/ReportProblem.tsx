import * as React from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { BlurView } from 'react-native-blur';
import Modal from 'react-native-modal';

import { FormikBag, FormikErrors, FormikProps, withFormik } from 'formik';
import { PrimaryTextInput } from '..';
import { OS_TYPES } from '../../environment/consts';
import { ApplicationStyles, Colors } from '../../environment/theme';
import { IDictionary } from '../../types';
import { WithManagedTransitions } from '../managedTransitions';

import style from './ReportProblem.style';

interface IReportProblemProps extends IDictionary {
	visible: boolean;
	onConfirm: (subject: string, description: string) => void;
	onDecline: () => void;
}

interface IProps extends IReportProblemProps {
	subject: string;
	description: string;
}

const Component: React.SFC<FormikProps<IProps>> = ({
	values: { visible, onDecline, description, subject, dictionary },
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
					<TouchableWithoutFeedback onPress={onDecline}>
						<BlurView style={style.blurView} blurType="dark" blurAmount={2} />
					</TouchableWithoutFeedback>
				)}
				<KeyboardAvoidingView
					behavior="padding"
					keyboardVerticalOffset={100}
					enabled={Platform.OS === OS_TYPES.IOS}
					contentContainerStyle={style.keyboardView}
				>
					<View style={style.boxContainer}>
						<View style={style.titleContainer}>
							<Text style={style.title}>{dictionary.components.modals.report.title}</Text>
						</View>
						<View style={style.inputContainer}>
							<View style={style.subjectContainer}>
								<PrimaryTextInput
									autoCapitalize="sentences"
									autoCorrect={true}
									numberOfLines={2}
									borderColor={Colors.dustWhite}
									placeholder={dictionary.components.modals.report.subject.placeholder}
									onChangeText={(value: string) => {
										setFieldValue('subject', value);
										setFieldTouched('subject');
									}}
									value={subject}
									blurOnSubmit={false}
								/>
								{touched.subject && errors.subject && (
									<Text style={ApplicationStyles.inputErrorText}>
										{dictionary.components.modals.report.subject.required}
									</Text>
								)}
							</View>
							<View style={style.descriptionContainer}>
								<PrimaryTextInput
									autoCapitalize="sentences"
									autoCorrect={true}
									multiline={true}
									borderColor={Colors.dustWhite}
									placeholder={dictionary.components.modals.report.description.placeholder}
									onChangeText={(value: string) => {
										setFieldValue('description', value);
										setFieldTouched('description');
									}}
									value={description}
									blurOnSubmit={false}
								/>
								{touched.description && errors.description && (
									<Text style={ApplicationStyles.inputErrorText}>
										{dictionary.components.modals.report.description.required}
									</Text>
								)}
							</View>
						</View>
						<View style={style.buttonsContainer}>
							<TouchableOpacity style={[style.button, style.leftButton]} onPress={onDecline}>
								<Text style={[style.buttonText, style.buttonTextCancel]}>
									{dictionary.components.buttons.cancel}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[style.button, !isValid ? ApplicationStyles.buttonDisabled : {}]}
								disabled={!isValid}
								onPress={handleSubmit}
							>
								<Text style={[style.buttonText, style.buttonTextConfirm]}>
									{dictionary.components.buttons.send}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</KeyboardAvoidingView>
			</Modal>
		)}
	</WithManagedTransitions>
);

const formikSettings = {
	mapPropsToValues: (props: IReportProblemProps) => ({
		...props,
		subject: '',
		description: '',
	}),
	validate: ({ subject, description }: IProps) => {
		const errors: FormikErrors<IProps> = {};
		if (!subject) {
			errors.subject = 'modal.report.subject.required';
		}
		if (!description) {
			errors.description = 'modal.report.description.required';
		}

		return errors;
	},
	handleSubmit: (
		{ subject, description }: IProps,
		{ props }: FormikBag<IReportProblemProps, IProps>,
	) => props.onConfirm(subject, description),
	enableReinitialize: true,
};

export const ReportProblem = withFormik(formikSettings)(Component as any);
