import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './Statistics.style';

interface IStatisticsProps {
	text: string;
	value: number;
}

export const Statistics: React.SFC<IStatisticsProps> = ({ text, value }) => (
	<View style={styles.container}>
		<Text style={styles.value}>{value}</Text>
		<Text style={styles.text}>{text}</Text>
	</View>
);
