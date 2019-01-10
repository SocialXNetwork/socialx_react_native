import * as React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './Statistics.style';

interface IStatisticsProps {
	icon?: string;
	text?: string;
	value: number;
}

export const Statistics: React.SFC<IStatisticsProps> = ({ icon, text, value }) => (
	<View style={styles.container}>
		{icon && <Icon name={icon} style={styles.icon} />}
		{text && <Text style={styles.text}>{text}</Text>}
		<Text style={styles.value}>{value}</Text>
	</View>
);
