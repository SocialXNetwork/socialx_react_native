import * as React from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/Ionicons';

import { Header, InputSizes, PrimaryTextInput } from '../../components';
import { OS_TYPES } from '../../environment/consts';
import { ILocaleDictionary } from '../../store/app/i18n/Types';
import { IProfile } from '../../types';

import styles, { customStyles, INPUT_SIZE } from './ConversationScreen.style';

interface IProps {
	profile: IProfile;
	dictionary: ILocaleDictionary;
	onGoBack: () => void;
	showProfileOptions: () => void;
	showAddOptions: () => void;
}

export const ConversationScreenView: React.SFC<IProps> = ({
	profile,
	onGoBack,
	dictionary,
	showProfileOptions,
	showAddOptions,
}) => (
	<View style={styles.container}>
		<Header
			avatar={profile.avatar}
			showProfileOptions={showProfileOptions}
			title={profile.alias}
			back={true}
			onPressBack={onGoBack}
		/>
		<ScrollView style={styles.messages}>
			<Text>{profile.alias}</Text>
			<Text>{profile.aboutMeText}</Text>
		</ScrollView>
		<KeyboardAvoidingView behavior="padding" enabled={Platform.OS === OS_TYPES.IOS}>
			<View style={styles.footer}>
				<TouchableOpacity style={styles.emojiContainer} onPress={() => undefined}>
					<Icon name="ios-happy" style={styles.emojiIcon} />
				</TouchableOpacity>

				<PrimaryTextInput
					placeholder={dictionary.screens.chat.conversation.inputPlaceholder}
					width={INPUT_SIZE}
					size={InputSizes.Small}
					borderColor={customStyles.inputBorderColor}
					borderWidth={0.3}
					multiline={true}
				/>
				<TouchableOpacity style={styles.addContainer} onPress={showAddOptions}>
					<Icon name="ios-add" style={styles.addIcon} />
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	</View>
);
