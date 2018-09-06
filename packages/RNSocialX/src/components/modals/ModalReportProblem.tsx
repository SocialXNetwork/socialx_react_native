import * as React from 'react';
import {Image, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';
import ModalDropdown from 'react-native-modal-dropdown';

import {FormikBag, FormikErrors, FormikProps, withFormik} from 'formik';
import {SXTextInput} from '../';
import {OS_TYPES} from '../../environment/consts';
import {ApplicationStyles, Colors, Icons} from '../../environment/theme';
import {IResizeProps, ITranslatedProps} from '../../types';
import {WithManagedTransitions} from '../managedTransitions';
import style from './ModalReportProblem.style';

export interface IReportData {
	reason: string;
	description: string;
}

interface IModalReportProblemProps extends IResizeProps, ITranslatedProps {
	visible: boolean;
	confirmHandler: (data: IReportData) => void;
	declineHandler: () => void;
}

interface IModalReportProblemComponentProps extends IReportData, IModalReportProblemProps {}

const REPORT_REASONS = [
	'modal.report.problem.reason.sample1',
	'modal.report.problem.reason.sample2',
	'modal.report.problem.reason.sample3',
	'modal.report.problem.reason.sample4',
];

const ModalReportProblemComponent: React.SFC<FormikProps<IModalReportProblemComponentProps>> = ({
	values: {visible, declineHandler, marginBottom, getText, description},
	isValid,
	handleSubmit,
	errors,
	touched,
	setFieldTouched,
	setFieldValue,
}) => (
	<WithManagedTransitions modalVisible={visible}>
		{({onDismiss, onModalHide}) => (
			<Modal
				// @ts-ignore
				onDismiss={onDismiss}
				onModalHide={onModalHide}
				isVisible={visible}
				backdropOpacity={Platform.select({ios: 0, android: 0.7})}
				animationIn={'slideInDown'}
				animationOut={'slideOutUp'}
				style={style.container}
			>
				{Platform.OS === OS_TYPES.IOS && (
					<TouchableWithoutFeedback onPress={declineHandler}>
						<BlurView style={style.blurView} blurType={'dark'} blurAmount={2} />
					</TouchableWithoutFeedback>
				)}
				<View style={[style.keyboardView, Platform.OS === OS_TYPES.IOS ? {marginBottom} : {}]}>
					<View style={style.boxContainer}>
						<View style={style.titleContainer}>
							<Text style={style.title}>{getText('modal.report.problem.title')}</Text>
						</View>

						<View style={style.inputContainer}>
							<View style={style.pickerContainer}>
								<View style={style.iconContainer}>
									<Image source={Icons.iconDropDown} style={style.icon} resizeMode={'contain'} />
								</View>
								<ModalDropdown
									keyboardShouldPersistTaps={'handled'}
									style={style.pickerStyle}
									dropdownStyle={style.dropdownStyle}
									dropdownTextStyle={style.dropdownTextStyle}
									textStyle={style.dropdownTextStyle}
									options={REPORT_REASONS.map((reason) => getText(reason))}
									defaultValue={getText(REPORT_REASONS[0])}
									onSelect={(index: number, value: string) => {
										setFieldValue('reason', value);
										setFieldTouched('reason');
									}}
								/>
							</View>
							<View style={style.descriptionContainer}>
								<SXTextInput
									autoCapitalize={'sentences'}
									autoCorrect={true}
									numberOfLines={3}
									borderColor={Colors.dustWhite}
									placeholder={getText('modal.report.problem.report.description.placeholder')}
									onChangeText={(value: string) => {
										setFieldValue('description', value);
										setFieldTouched('description');
									}}
									value={description}
									blurOnSubmit={false}
								/>
								{touched.description &&
									errors.description && (
										<Text style={ApplicationStyles.inputErrorText}>{getText(errors.description)}</Text>
									)}
							</View>
						</View>

						<View style={style.buttonsContainer}>
							<TouchableOpacity style={[style.button, style.leftButton]} onPress={declineHandler}>
								<Text style={[style.buttonText, style.buttonTextCancel]}>{getText('button.CANCEL')}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[style.button, !isValid ? ApplicationStyles.buttonDisabled : {}]}
								disabled={!isValid}
								onPress={handleSubmit}
							>
								<Text style={[style.buttonText, style.buttonTextConfirm]}>{getText('button.send')}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);

const formikSettings = {
	mapPropsToValues: (props: IModalReportProblemProps) => ({...props, reason: REPORT_REASONS[0], description: ''}),
	validate: ({reason, description}: IModalReportProblemComponentProps) => {
		const errors: FormikErrors<IModalReportProblemComponentProps> = {};
		if (!description) {
			errors.description = 'modal.report.problem.description.required';
		}
		return errors;
	},
	handleSubmit: (
		{reason, description}: IModalReportProblemComponentProps,
		{props}: FormikBag<IModalReportProblemProps, IModalReportProblemComponentProps>,
	) => props.confirmHandler({reason, description}),
	enableReinitialize: true,
};

export const ModalReportProblem = withFormik(formikSettings)(ModalReportProblemComponent as any);
