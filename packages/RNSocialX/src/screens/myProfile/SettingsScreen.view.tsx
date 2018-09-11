import {Formik, FormikActions, FormikErrors, FormikProps} from 'formik';
import * as React from 'react';
import {ImageURISource, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {string} from 'yup';

import {
	AvatarName,
	AvatarPicker,
	InputSizes,
	PrimaryTextInput,
	SettingCheckbox,
	TKeyboardKeys,
	TRKeyboardKeys,
	WithInlineLoader,
} from '../../components';
import {IWithLoaderProps} from '../../components/inlineLoader';
import {ITranslatedProps} from '../../types';
import style, {customStyleProps} from './SettingsScreen.style';

const EMAIL_SCHEMA = string().email();

export interface SettingsData {
	aboutText: string;
	firstName: string;
	lastName: string;
	email: string;
	miningEnabled: boolean;
	avatarImage: ImageURISource;
	username: string;
}

interface ISettingsFormProps extends SettingsData, ITranslatedProps {
	onSaveChanges: (values: SettingsData) => void;
}

interface ISettingsScreenViewProps extends ISettingsFormProps, IWithLoaderProps {}

const SettingsForm: React.SFC<ISettingsFormProps> = ({
	aboutText,
	firstName,
	lastName,
	email,
	avatarImage,
	username,
	miningEnabled,
	getText,
	onSaveChanges,
}) => (
	<Formik
		initialValues={{
			aboutText,
			firstName,
			lastName,
			email,
			avatarImage,
			username,
			miningEnabled,
		}}
		validate={({firstName: firstNameValue, lastName: lastNameValue, email: emailValue}: SettingsData) => {
			const errors: FormikErrors<SettingsData> = {};
			if (!emailValue) {
				errors.email = getText('settings.screen.email.required');
			} else if (!EMAIL_SCHEMA.isValidSync(email)) {
				errors.email = getText('settings.screen.email.invalid');
			}
			if (!firstNameValue) {
				errors.firstName = getText('settings.screen.first.name.required');
			}
			if (!lastNameValue) {
				errors.lastName = getText('settings.screen.last.name.required');
			}
			return errors;
		}}
		onSubmit={async (values: SettingsData, {resetForm, setErrors}: FormikActions<SettingsData>) => {
			await onSaveChanges(values);
			resetForm(values);
		}}
		render={({
			values: {
				aboutText: aboutTextValue,
				firstName: firstNameValue,
				lastName: lastNameValue,
				email: emailValue,
				avatarImage: avatarImageValue,
				username: usernameValue,
				miningEnabled: miningEnabledValue,
			},
			errors,
			handleBlur,
			handleSubmit,
			isValid,
			setFieldValue,
		}: FormikProps<SettingsData>) => (
			<View style={{flex: 1}}>
				<KeyboardAwareScrollView
					style={style.keyboardView}
					contentContainerStyle={style.container}
					alwaysBounceVertical={false}
					enableOnAndroid={true}
					keyboardShouldPersistTaps={'handled'}
				>
					<View style={style.pickerContainer}>
						<AvatarPicker
							avatarImage={avatarImageValue}
							afterImagePick={(localPhotoPath: string) => setFieldValue('avatarImage', {uri: localPhotoPath}, false)}
							avatarSize={customStyleProps.avatarPickerSize}
							getText={getText}
						/>
					</View>
					<AvatarName
						fullName={firstNameValue + ' ' + lastNameValue}
						username={usernameValue}
						fullNameColor={customStyleProps.avatarFullNameColor}
						userNameColor={customStyleProps.avatarUserNameColor}
					/>
					<View style={style.aboutContainer}>
						<PrimaryTextInput
							autoCapitalize={'sentences'}
							autoCorrect={true}
							value={aboutTextValue}
							placeholder={getText('settings.screen.about.text.placeholder')}
							borderColor={customStyleProps.aboutTextBorderColor}
							multiline={true}
							onChangeText={(value: string) => setFieldValue('aboutText', value)}
							focusUpdateHandler={(value) => !value && handleBlur('aboutText')}
						/>
					</View>
					<Text style={style.personalDetails}>{getText('settings.screen.personal.details')}</Text>
					<View style={[style.textInputContainer, style.textInputContainerFirst]}>
						<PrimaryTextInput
							autoCapitalize={'words'}
							autoCorrect={true}
							value={firstNameValue}
							iconColor={customStyleProps.userDataInputIconColor}
							placeholder={getText('settings.screen.first.name.placeholder')}
							placeholderColor={customStyleProps.userDataInputPlaceholderColor}
							size={InputSizes.Small}
							borderColor={customStyleProps.userDataInputBorderColor}
							blurOnSubmit={true}
							returnKeyType={TRKeyboardKeys.done}
							onChangeText={(value: string) => setFieldValue('firstName', value)}
							focusUpdateHandler={(value) => !value && handleBlur('firstName')}
						/>
						{errors.firstName && <Text style={style.errorText}>{errors.firstName}</Text>}
					</View>
					<View style={[style.textInputContainer]}>
						<PrimaryTextInput
							autoCapitalize={'words'}
							autoCorrect={true}
							value={lastNameValue}
							iconColor={customStyleProps.userDataInputIconColor}
							placeholder={getText('settings.screen.last.name.placeholder')}
							placeholderColor={customStyleProps.userDataInputPlaceholderColor}
							borderColor={customStyleProps.userDataInputBorderColor}
							size={InputSizes.Small}
							blurOnSubmit={true}
							returnKeyType={TRKeyboardKeys.done}
							onChangeText={(value: string) => setFieldValue('lastName', value)}
							focusUpdateHandler={(value) => !value && handleBlur('lastName')}
						/>
						{errors.lastName && <Text style={style.errorText}>{errors.lastName}</Text>}
					</View>
					<View style={[style.textInputContainer]}>
						<PrimaryTextInput
							autoCapitalize={'words'}
							value={emailValue}
							iconColor={customStyleProps.userDataInputIconColor}
							placeholder={getText('settings.screen.email.placeholder')}
							placeholderColor={customStyleProps.userDataInputPlaceholderColor}
							borderColor={customStyleProps.userDataInputBorderColor}
							size={InputSizes.Small}
							keyboardType={TKeyboardKeys.emailAddress}
							blurOnSubmit={true}
							returnKeyType={TRKeyboardKeys.done}
							onChangeText={(value: string) => setFieldValue('email', value)}
							focusUpdateHandler={(value) => !value && handleBlur('email')}
						/>
						{errors.email && <Text style={style.errorText}>{errors.email}</Text>}
					</View>
					<View style={style.miningContainer}>
						<SettingCheckbox
							title={getText('settings.screen.mining.title')}
							description={getText('settings.screen.mining.description')}
							value={miningEnabledValue}
							onValueUpdated={() => setFieldValue('miningEnabled', !miningEnabledValue, false)}
						/>
					</View>
				</KeyboardAwareScrollView>
				{isValid && (
					<View style={style.bottomContainer}>
						<TouchableOpacity style={style.saveButton} onPress={handleSubmit}>
							<Text style={style.saveButtonText}>{getText('settings.screen.save.button')}</Text>
							<Icon name={'check'} style={style.checkIcon} />
						</TouchableOpacity>
					</View>
				)}
			</View>
		)}
	/>
);

export const SettingsScreenView: React.SFC<ISettingsScreenViewProps> = (props) => (
	<WithInlineLoader isLoading={props.isLoading}>
		<SettingsForm {...props} />
	</WithInlineLoader>
);
