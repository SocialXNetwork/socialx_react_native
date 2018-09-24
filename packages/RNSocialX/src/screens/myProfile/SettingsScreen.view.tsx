import {Formik, FormikErrors, FormikProps} from 'formik';
import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {string} from 'yup';

import {
	AvatarName,
	AvatarPicker,
	Header,
	HeaderButton,
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

export interface ISettingsData {
	aboutMeText: string;
	firstName: string;
	lastName: string;
	email: string;
	miningEnabled: boolean;
	avatarURL: string | null;
	userName: string;
}

interface ISettingsScreenViewProps extends ISettingsData, ITranslatedProps, IWithLoaderProps {
	onSaveChanges: (values: ISettingsData) => void;
	onLogout: () => void;
	onGoBack: () => void;
}

export const SettingsScreenView: React.SFC<ISettingsScreenViewProps> = ({
	aboutMeText,
	firstName,
	lastName,
	email,
	avatarURL,
	userName,
	miningEnabled,
	getText,
	onSaveChanges,
	isLoading,
	onLogout,
	onGoBack,
}) => (
	<WithInlineLoader isLoading={isLoading}>
		<Formik
			initialValues={{
				aboutMeText,
				firstName,
				lastName,
				email,
				avatarURL,
				userName,
				miningEnabled,
			}}
			validate={({firstName: firstNameValue, lastName: lastNameValue, email: emailValue}: ISettingsData) => {
				const errors: FormikErrors<ISettingsData> = {};
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
			onSubmit={(values: ISettingsData) => onSaveChanges(values)}
			render={({
				values: {
					aboutMeText: aboutMeTextValue,
					firstName: firstNameValue,
					lastName: lastNameValue,
					email: emailValue,
					avatarURL: avatarURLValue,
					userName: usernameValue,
					miningEnabled: miningEnabledValue,
				},
				errors,
				handleBlur,
				handleSubmit,
				isValid,
				setFieldValue,
			}: FormikProps<ISettingsData>) => (
				<View style={{flex: 1}}>
					{
						<Header
							title={getText('settings.screen.title')}
							left={<HeaderButton iconName={'ios-arrow-back'} onPress={onGoBack} />}
							right={<HeaderButton iconName={'ios-log-out'} onPress={onLogout} />}
						/>
					}
					<KeyboardAwareScrollView
						style={style.keyboardView}
						contentContainerStyle={style.container}
						alwaysBounceVertical={false}
						enableOnAndroid={true}
						keyboardShouldPersistTaps={'handled'}
					>
						<View style={style.pickerContainer}>
							<AvatarPicker
								avatarImage={avatarURLValue !== null ? {uri: avatarURLValue} : customStyleProps.avatarPlaceholderImg}
								afterImagePick={(localPhotoPath: string) => setFieldValue('avatarURL', localPhotoPath, false)}
								avatarSize={customStyleProps.avatarPickerSize}
								getText={getText}
							/>
						</View>
						<AvatarName
							fullName={firstNameValue + ' ' + lastNameValue}
							userName={usernameValue}
							fullNameColor={customStyleProps.avatarFullNameColor}
							userNameColor={customStyleProps.avatarUserNameColor}
						/>
						<View style={style.aboutContainer}>
							<PrimaryTextInput
								autoCapitalize={'sentences'}
								autoCorrect={true}
								value={aboutMeTextValue}
								placeholder={getText('settings.screen.about.text.placeholder')}
								borderColor={customStyleProps.aboutMeTextBorderColor}
								multiline={true}
								onChangeText={(value: string) => setFieldValue('aboutMeText', value)}
								focusUpdateHandler={(value) => !value && handleBlur('aboutMeText')}
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
	</WithInlineLoader>
);
