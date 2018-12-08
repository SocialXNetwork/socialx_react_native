import { Formik, FormikErrors } from 'formik';
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
import { ICurrentUser, IOptionsMenuProps, ITranslatedProps } from '../../types';

import styles, { defaultStyles } from './SettingsScreen.style';

const EMAIL_SCHEMA = string().email();

export interface ISettingsData {
	description: string;
	fullName: string;
	email: string;
	miningEnabled: boolean;
	shareDataEnabled: boolean;
	avatar: string;
}

interface ISettingsScreenViewProps extends ITranslatedProps, IOptionsMenuProps {
	currentUser: ICurrentUser;
	onSaveChanges: (values: ISettingsData) => void;
	onEditNodes: () => void;
	onGoBack: () => void;
}

export const SettingsScreenView: React.SFC<ISettingsScreenViewProps> = ({
	currentUser,
	onSaveChanges,
	onGoBack,
	showOptionsMenu,
	onEditNodes,
	getText,
}) => (
	<Formik
		initialValues={{
			description: currentUser.description,
			fullName: currentUser.fullName,
			email: currentUser.email,
			avatar: currentUser.avatar,
			miningEnabled: currentUser.miningEnabled,
			shareDataEnabled: currentUser.shareDataEnabled,
		}}
		validate={({ fullName, email, description }: ISettingsData) => {
			const errors: FormikErrors<ISettingsData> = {};
			if (!email) {
				errors.email = getText('settings.screen.email.required');
			} else if (!EMAIL_SCHEMA.isValidSync(email)) {
				errors.email = getText('settings.screen.email.invalid');
			}
			if (!fullName) {
				errors.fullName = getText('settings.screen.name.required');
			}
			if (!description) {
				errors.description = getText('settings.screen.description.required');
			}
			return errors;
		}}
		onSubmit={(values: ISettingsData) => onSaveChanges(values)}
		render={({ values, errors, handleBlur, handleSubmit, isValid, setFieldValue }) => (
			<View style={{ flex: 1 }}>
				{
					<Header
						title={getText('settings.screen.title')}
						left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
					/>
				}
				<KeyboardAwareScrollView
					contentContainerStyle={styles.container}
					alwaysBounceVertical={false}
					enableOnAndroid={true}
					keyboardShouldPersistTaps="handled"
					style={styles.keyboard}
				>
					<View style={styles.picker}>
						<AvatarPicker
							image={values.avatar}
							hash={values.avatar === currentUser.avatar}
							afterImagePick={(path: string) => setFieldValue('avatar', path, false)}
							showOptionsMenu={showOptionsMenu}
							getText={getText}
						/>
					</View>
					<AvatarName fullName={currentUser.fullName} userName={currentUser.userName} />
					<View style={styles.editNodesButton}>
						<PrimaryButton
							label={getText('settings.screen.nodes.button')}
							size={ButtonSizes.Small}
							onPress={onEditNodes}
						/>
					</View>
					<View style={[styles.input, styles.firstInput]}>
						<View style={styles.row}>
							<View style={{ flex: 1 }}>
								<Text style={styles.label}>{getText('settings.screen.name.placeholder')}</Text>
							</View>
							<View style={{ flex: 5 }}>
								<PrimaryTextInput
									autoCapitalize="words"
									value={values.fullName}
									placeholder={getText('settings.screen.name.placeholder')}
									placeholderColor={defaultStyles.userDataInputPlaceholderColor}
									size={InputSizes.Small}
									borderColor={defaultStyles.userDataInputBorderColor}
									blurOnSubmit={true}
									returnKeyType={TRKeyboardKeys.done}
									onChangeText={(value: string) => setFieldValue('fullName', value)}
									focusUpdateHandler={(value) => !value && handleBlur('fullName')}
								/>
							</View>
						</View>
						{errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
					</View>
					<View style={styles.input}>
						<View style={styles.row}>
							<View style={{ flex: 1 }}>
								<Text style={styles.label}>{getText('settings.screen.email.placeholder')}</Text>
							</View>
							<View style={{ flex: 5 }}>
								<PrimaryTextInput
									autoCapitalize="words"
									value={values.email}
									placeholder={getText('settings.screen.email.placeholder')}
									placeholderColor={defaultStyles.userDataInputPlaceholderColor}
									borderColor={defaultStyles.userDataInputBorderColor}
									size={InputSizes.Small}
									keyboardType={TKeyboardKeys.emailAddress}
									blurOnSubmit={true}
									returnKeyType={TRKeyboardKeys.done}
									onChangeText={(value: string) => setFieldValue('email', value)}
									focusUpdateHandler={(value) => !value && handleBlur('email')}
								/>
							</View>
						</View>
						{errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
					</View>
					<View style={styles.input}>
						<View style={styles.row}>
							<View style={{ flex: 1 }}>
								<Text style={styles.label}>
									{getText('settings.screen.description.placeholder')}
								</Text>
							</View>
							<View style={{ flex: 5 }}>
								<PrimaryTextInput
									autoCapitalize="sentences"
									value={values.description}
									placeholder={getText('settings.screen.description.placeholder')}
									placeholderColor={defaultStyles.userDataInputPlaceholderColor}
									borderColor={defaultStyles.userDataInputBorderColor}
									multiline={true}
									blurOnSubmit={true}
									returnKeyType={TRKeyboardKeys.done}
									onChangeText={(value: string) => setFieldValue('description', value)}
									focusUpdateHandler={(value) => !value && handleBlur('description')}
								/>
							</View>
						</View>
						{errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
					</View>
					<View style={styles.mining}>
						<Checkbox
							title={getText('settings.screen.mining.title')}
							description={getText('settings.screen.mining.description')}
							value={values.miningEnabled}
							onValueUpdated={() => setFieldValue('miningEnabled', !values.miningEnabled, false)}
						/>
						<Checkbox
							title={getText('settings.screen.sharedata.title')}
							description={getText('settings.screen.sharedata.description')}
							value={values.shareDataEnabled}
							onValueUpdated={() =>
								setFieldValue('shareDataEnabled', !values.shareDataEnabled, false)
							}
						/>
					</View>
					{isValid && (
						<View style={styles.button}>
							<PrimaryButton
								label={getText('button.save.changes')}
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
