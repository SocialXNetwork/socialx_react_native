import * as React from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';

import { Header, InputSizes, MessageList, PrimaryTextInput } from '../../components';
import { OS_TYPES } from '../../environment/consts';
import { ILocaleDictionary } from '../../store/app/i18n/Types';
import { IProfile } from '../../types';

import styles from './ConversationScreen.style';

interface IProps {
	profile: IProfile;
	dictionary: ILocaleDictionary;
	onGoBack: () => void;
	showProfileOptions: () => void;
	showAddOptions: () => void;
}

export const ConversationScreenView: React.SFC<IProps> = ({
	profile,
	dictionary,
	showProfileOptions,
	showAddOptions,
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
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={3}
			enabled={Platform.OS === OS_TYPES.IOS}
		>
			<View style={styles.footer}>
				<TouchableOpacity style={styles.iconContainer} onPress={showAddOptions}>
					<Icon name="ios-add-circle" style={styles.icon} />
				</TouchableOpacity>
				<View style={{ flex: 1 }}>
					<PrimaryTextInput
						placeholder={dictionary.components.inputs.placeholder.type}
						size={InputSizes.Small}
						multiline={true}
						borderWidth={0}
						style={styles.input}
					/>
				</View>
				<TouchableOpacity style={styles.iconContainer} onPress={() => undefined}>
					<Icon name="ios-paper-plane" style={styles.icon} />
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	</SafeAreaView>
);
