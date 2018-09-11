import React from 'react';
import {Text, View} from 'react-native';

import styles from './GrayContainer.style';

interface IGrayContainerProps {
	heading: string;
	text: string;
}

export const GrayContainer: React.SFC<IGrayContainerProps> = ({heading, text}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>{heading}</Text>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};
