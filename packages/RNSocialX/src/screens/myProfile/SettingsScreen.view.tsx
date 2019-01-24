import { Formik, FormikErrors } from 'formik';
import * as React from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { string } from 'yup';

import {
	AvatarName,
	AvatarPicker,
	Checkbox,
	Header,
	HeaderButton,
	InputSizes,
	PrimaryTextInput,
	TKeyboardKeys,
	TRKeyboardKeys,
} from '../../components';
import { Colors } from '../../environment/theme';
import { ICurrentUser, IDictionary, IOptionsMenuProps } from '../../types';

import styles from './SettingsScreen.style';
const EMAIL_SCHEMA = string().email();

export interface ISettingsData {
	description: string;
	fullName: string;
	email: string;
	miningEnabled: boolean;
	shareDataEnabled: boolean;
	avatar: string;
}

interface ISettingsScreenViewProps extends IDictionary, IOptionsMenuProps {
	currentUser: ICurrentUser;
	onSaveChanges: (values: ISettingsData) => void;
	onGoBack: () => void;
}

export const SettingsScreenView: React.SFC<ISettingsScreenViewProps> = ({
	currentUser,
	showOptionsMenu,
	onSaveChanges,
	onGoBack,
	dictionary,
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
				errors.email = dictionary.components.inputs.email.required;
			} else if (!EMAIL_SCHEMA.isValidSync(email)) {
				errors.email = dictionary.components.inputs.email.invalid;
			}
			if (!fullName) {
				errors.fullName = dictionary.components.inputs.name.required;
			}
			if (!description) {
				errors.description = dictionary.components.inputs.description.required;
			} else if (description.length < 10) {
				errors.description = dictionary.components.inputs.description.length;
			}
			return errors;
		}}
		onSubmit={(values: ISettingsData) => onSaveChanges(values)}
		render={({ values, errors, handleBlur, handleSubmit, isValid, setFieldValue }) => (
			<View style={{ flex: 1 }}>
				{isValid ? (
					<Header
						title={dictionary.screens.settings.title}
						back={true}
						right={<HeaderButton iconName="ios-checkmark-circle" onPress={handleSubmit} />}
						onPressBack={onGoBack}
					/>
				) : (
					<Header title={dictionary.screens.settings.title} back={true} onPressBack={onGoBack} />
				)}
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
							dictionary={dictionary}
						/>
					</View>
					<AvatarName fullName={currentUser.fullName} alias={currentUser.alias} />
					<View style={[styles.input, styles.firstInput]}>
						<View style={styles.row}>
							<View style={{ flex: 1 }}>
								<Text>{dictionary.components.inputs.placeholder.name}</Text>
							</View>
							<View style={{ flex: 5 }}>
								<PrimaryTextInput
									autoCapitalize="words"
									value={values.fullName}
									placeholder={dictionary.components.inputs.placeholder.name}
									placeholderColor={Colors.paleSky}
									size={InputSizes.Small}
									borderColor={Colors.transparent}
									blurOnSubmit={true}
									returnKeyType={TRKeyboardKeys.done}
									onChangeText={(value: string) => setFieldValue('fullName', value)}
									onSetFocus={(value) => !value && handleBlur('fullName')}
								/>
							</View>
						</View>
						{errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
					</View>
					<View style={styles.input}>
						<View style={styles.row}>
							<View style={{ flex: 1 }}>
								<Text>{dictionary.components.inputs.placeholder.email}</Text>
							</View>
							<View style={{ flex: 5 }}>
								<PrimaryTextInput
									autoCapitalize="words"
									value={values.email}
									placeholder={dictionary.components.inputs.placeholder.email}
									placeholderColor={Colors.paleSky}
									borderColor={Colors.transparent}
									size={InputSizes.Small}
									keyboardType={TKeyboardKeys.emailAddress}
									blurOnSubmit={true}
									returnKeyType={TRKeyboardKeys.done}
									onChangeText={(value: string) => setFieldValue('email', value)}
									onSetFocus={(value) => !value && handleBlur('email')}
								/>
							</View>
						</View>
						{errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
					</View>
					<View style={styles.input}>
						<View style={styles.row}>
							<View style={{ flex: 1 }}>
								<Text>{dictionary.components.inputs.placeholder.description}</Text>
							</View>
							<View style={{ flex: 5 }}>
								<PrimaryTextInput
									autoCapitalize="sentences"
									value={values.description}
									placeholder={dictionary.components.inputs.placeholder.description}
									placeholderColor={Colors.paleSky}
									borderColor={Colors.transparent}
									multiline={true}
									blurOnSubmit={true}
									returnKeyType={TRKeyboardKeys.done}
									onChangeText={(value: string) => setFieldValue('description', value)}
									onSetFocus={(value) => !value && handleBlur('description')}
								/>
							</View>
						</View>
						{errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
					</View>
					<View style={styles.mining}>
						<Checkbox
							title={dictionary.screens.settings.mining.title}
							description={dictionary.screens.settings.mining.description}
							value={values.miningEnabled}
							onValueUpdated={() => setFieldValue('miningEnabled', !values.miningEnabled, false)}
						/>
						<Checkbox
							title={dictionary.screens.settings.share.title}
							description={dictionary.screens.settings.share.description}
							value={values.shareDataEnabled}
							onValueUpdated={() =>
								setFieldValue('shareDataEnabled', !values.shareDataEnabled, false)
							}
						/>
					</View>
				</KeyboardAwareScrollView>
			</View>
		)}
	/>
);
