import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ITranslatedProps } from '../../types';
import styles from './NoPhotos.style';

export const NoPhotos: React.SFC<ITranslatedProps> = ({ getText }) => (
	<View style={styles.container}>
		<Icon name="th" style={styles.icon} />
		<Text style={styles.text}>
			{getText('user.profile.screen.empty.gallery')}
		</Text>
	</View>
);
