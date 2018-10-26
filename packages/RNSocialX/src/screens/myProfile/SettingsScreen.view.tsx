import { Formik, FormikErrors, FormikProps } from 'formik';
import * as React from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { string } from 'yup';

import {
	AvatarName,
	AvatarPicker,
	ButtonSizes,
	Checkbox,
	Header,
	HeaderButton,
	InputSizes,
	PrimaryButton,
	PrimaryTextInput,
	TKeyboardKeys,
	TRKeyboardKeys,
} from '../../components';
import { IDotsMenuProps, ITranslatedProps } from '../../types';

import styles, { defaultStyles } from './SettingsScreen.style';

const EMAIL_SCHEMA = string().email();

export interface ISettingsData {
	bio: string;
	fullName: string;
	email: string;
	miningEnabled: boolean;
	shareDataEnabled: boolean;
	avatarURL: string;
	userName: string;
}

interface ISettingsScreenViewProps
	extends ISettingsData,
		ITranslatedProps,
		IDotsMenuProps {
	onSaveChanges: (values: ISettingsData) => void;
	onGoBack: () => void;
}

export const SettingsScreenView: React.SFC<ISettingsScreenViewProps> = ({
	bio,
	fullName,
	email,
	avatarURL,
	userName,
	miningEnabled,
	shareDataEnabled,
	onSaveChanges,
	onGoBack,
	showDotsMenuModal,
	getText,
}) => (
	<Formik
		initialValues={{
			bio,
			fullName,
			email,
			avatarURL,
			userName,
			miningEnabled,
			shareDataEnabled,
		}}
		validate={({
			fullName: nameValue,
			email: emailValue,
			bio: bioValue,
		}: ISettingsData) => {
			const errors: FormikErrors<ISettingsData> = {};
			if (!emailValue) {
				errors.email = getText('settings.screen.email.required');
			} else if (!EMAIL_SCHEMA.isValidSync(email)) {
				errors.email = getText('settings.screen.email.invalid');
			}
			if (!nameValue) {
				errors.fullName = getText('settings.screen.name.required');
			}
			if (!bioValue) {
				errors.bio = getText('settings.screen.bio.required');
			}
			return errors;
		}}
		onSubmit={(values: ISettingsData) => onSaveChanges(values)}
		render={({
			values: {
				bio: bioValue,
				fullName: nameValue,
				email: emailValue,
				avatarURL: avatarURLValue,
				userName: userNameValue,
				miningEnabled: miningEnabledValue,
				shareDataEnabled: shareDataEnabledValue,
			},
			errors,
			handleBlur,
			handleSubmit,
			isValid,
			setFieldValue,
		}: FormikProps<ISettingsData>) => (
			<View style={{ flex: 1 }}>
				{
					<Header
						title={getText('settings.screen.title')}
						left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
					/>
				}
				<KeyboardAwareScrollView
					style={styles.keyboard}
					contentContainerStyle={styles.container}
					alwaysBounceVertical={false}
					enableOnAndroid={true}
					keyboardShouldPersistTaps="handled"
				>
					<View style={styles.picker}>
						<AvatarPicker
							avatarImage={
								avatarURLValue !== null
									? { uri: avatarURLValue }
									: defaultStyles.avatarPlaceholderImg
							}
							afterImagePick={(localPhotoPath: string) =>
								setFieldValue('avatarURL', localPhotoPath, false)
							}
							avatarSize={defaultStyles.avatarPickerSize}
							getText={getText}
							showDotsMenuModal={showDotsMenuModal}
						/>
					</View>
					<AvatarName
						fullName={fullName}
						userName={userName}
						fullNameColor={defaultStyles.avatarFullNameColor}
						userNameColor={defaultStyles.avatarUserNameColor}
					/>
					<View style={[styles.input, styles.firstInput]}>
						<View style={styles.row}>
							<View style={{ flex: 1 }}>
								<Text style={styles.label}>
									{getText('settings.screen.name.placeholder')}
								</Text>
							</View>
							<View style={{ flex: 5 }}>
								<PrimaryTextInput
									autoCapitalize="words"
									value={nameValue}
									placeholder={getText('settings.screen.name.placeholder')}
									placeholderColor={defaultStyles.userDataInputPlaceholderColor}
									size={InputSizes.Small}
									borderColor={defaultStyles.userDataInputBorderColor}
									blurOnSubmit={true}
									returnKeyType={TRKeyboardKeys.done}
									onChangeText={(value: string) =>
										setFieldValue('fullName', value)
									}
									focusUpdateHandler={(value) =>
										!value && handleBlur('fullName')
									}
								/>
							</View>
						</View>
						{errors.fullName && (
							<Text style={styles.errorText}>{errors.fullName}</Text>
						)}
					</View>

					<View style={styles.input}>
						<View style={styles.row}>
							<View style={{ flex: 1 }}>
								<Text style={styles.label}>
									{getText('settings.screen.email.placeholder')}
								</Text>
							</View>
							<View style={{ flex: 5 }}>
								<PrimaryTextInput
									autoCapitalize="words"
									value={emailValue}
									placeholder={getText('settings.screen.email.placeholder')}
									placeholderColor={defaultStyles.userDataInputPlaceholderColor}
									borderColor={defaultStyles.userDataInputBorderColor}
									size={InputSizes.Small}
									keyboardType={TKeyboardKeys.emailAddress}
									blurOnSubmit={true}
									returnKeyType={TRKeyboardKeys.done}
									onChangeText={(value: string) =>
										setFieldValue('email', value)
									}
									focusUpdateHandler={(value) => !value && handleBlur('email')}
								/>
							</View>
						</View>
						{errors.email && (
							<Text style={styles.errorText}>{errors.email}</Text>
						)}
					</View>
					<View style={styles.input}>
						<View style={styles.row}>
							<View style={{ flex: 1 }}>
								<Text style={styles.label}>
									{getText('settings.screen.bio.placeholder')}
								</Text>
							</View>
							<View style={{ flex: 5 }}>
								<PrimaryTextInput
									autoCapitalize="sentences"
									value={bioValue}
									placeholder={getText('settings.screen.bio.placeholder')}
									placeholderColor={defaultStyles.userDataInputPlaceholderColor}
									borderColor={defaultStyles.userDataInputBorderColor}
									multiline={true}
									blurOnSubmit={true}
									returnKeyType={TRKeyboardKeys.done}
									onChangeText={(value: string) => setFieldValue('bio', value)}
									focusUpdateHandler={(value) => !value && handleBlur('bio')}
								/>
							</View>
						</View>
						{errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}
					</View>
					<View style={styles.mining}>
						<Checkbox
							title={getText('settings.screen.mining.title')}
							description={getText('settings.screen.mining.description')}
							value={miningEnabledValue}
							onValueUpdated={() =>
								setFieldValue('miningEnabled', !miningEnabledValue, false)
							}
						/>
						<Checkbox
							title={getText('settings.screen.sharedata.title')}
							description={getText('settings.screen.sharedata.description')}
							value={shareDataEnabledValue}
							onValueUpdated={() =>
								setFieldValue('shareDataEnabled', !shareDataEnabledValue, false)
							}
						/>
					</View>
					{isValid && (
						<View style={styles.button}>
							<PrimaryButton
								label={getText('settings.screen.save.button')}
								size={ButtonSizes.Small}
								onPress={handleSubmit}
							/>
						</View>
					)}
				</KeyboardAwareScrollView>
			</View>
		)}
	/>
);
