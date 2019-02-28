import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';

import {
	Header,
	InputSizes,
	MessageList,
	PrimaryTextInput,
	TRKeyboardKeys,
} from '../../components';
import { OS_TYPES } from '../../environment/consts';
import { IDictionary, IProfile } from '../../types';

import { Icons } from '../../environment/theme';
import styles from './ConversationScreen.style';

interface IProps extends IDictionary {
	profile: IProfile;
	value: string;
	showProfileOptions: () => void;
	showAddOptions: () => void;
	onChangeText: (value: string) => void;
	onSendMessage: () => void;
	onGoBack: () => void;
}

export const ConversationScreenView: React.SFC<IProps> = ({
	profile,
	value,
	dictionary,
	showProfileOptions,
	showAddOptions,
	onChangeText,
	onSendMessage,
	onGoBack,
}) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
		<Header
			back={true}
			name={profile.fullName}
			avatar={profile.avatar}
			onPressAvatar={showProfileOptions}
			onPressBack={onGoBack}
		/>
		<MessageList alias={profile.alias} avatar={profile.avatar} onAvatarPress={showProfileOptions} />
		<KeyboardAvoidingView behavior="padding" enabled={Platform.OS === OS_TYPES.IOS}>
			<View style={styles.footer}>
				<TouchableOpacity
					style={styles.iconContainer}
					onPress={() => {
						Keyboard.dismiss();
						showAddOptions();
					}}
				>
					<Icon name={Icons.plus} style={styles.icon} />
				</TouchableOpacity>
				<View style={{ flex: 1 }}>
					<PrimaryTextInput
						value={value}
						placeholder={dictionary.components.inputs.placeholder.type}
						size={InputSizes.Small}
						multiline={true}
						borderWidth={0}
						autoCorrect={false}
						returnKeyType={TRKeyboardKeys.send}
						blurOnSubmit={true}
						onChangeText={onChangeText}
						style={styles.input}
					/>
				</View>
				<TouchableOpacity style={styles.iconContainer} onPress={onSendMessage}>
					<Icon name={Icons.send} style={styles.icon} />
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	</SafeAreaView>
);
