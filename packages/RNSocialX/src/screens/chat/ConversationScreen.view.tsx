import * as React from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';

import { Header, InputSizes, PrimaryTextInput } from '../../components';
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
			title={profile.alias}
			avatar={profile.avatar}
			back={true}
			onPressAvatar={showProfileOptions}
			onPressBack={onGoBack}
		/>
		<ScrollView style={styles.messages}>
			<Text>{profile.alias}</Text>
			<Text>{profile.aboutMeText}</Text>
		</ScrollView>
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={4}
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
						borderWidth={0}
						multiline={true}
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
