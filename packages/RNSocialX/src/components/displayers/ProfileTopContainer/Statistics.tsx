import * as React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './Statistics.style';

interface IStatisticsProps {
	icon: string;
	value: number;
}

export const Statistics: React.SFC<IStatisticsProps> = ({ icon, value }) => (
	<View style={styles.container}>
		<Icon name={icon} style={styles.icon} />
		<Text style={styles.value}>{value}</Text>
	</View>
);
