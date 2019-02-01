import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';

import { Header } from '../../components';
import { IDictionary } from '../../types';

import { Icons } from '../../environment/theme';
import styles from './BountyScreen.style';

interface IProps extends IDictionary {
	onGoBack: () => void;
}

export const BountyScreenView: React.SFC<IProps> = ({ dictionary, onGoBack }) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
		<Header back={true} onPressBack={onGoBack} />
	</SafeAreaView>
);
