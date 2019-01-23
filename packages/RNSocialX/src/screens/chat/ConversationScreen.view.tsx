import * as React from 'react';
import { Text, View } from 'react-native';

import { Header } from '../../components';
import { IProfile } from '../../types';

import styles from './ConversationScreen.style';

interface IProps {
	profile: IProfile;
	onGoBack: () => void;
}

export const ConversationScreenView: React.SFC<IProps> = ({ profile, onGoBack }) => (
	<View style={styles.container}>
		<Header title={profile.alias} back={true} onPressBack={onGoBack} />
		<Text>{profile.alias}</Text>
		<Text>{profile.aboutMeText}</Text>
	</View>
);
