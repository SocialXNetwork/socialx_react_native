import React from 'react';
import {Text, View} from 'react-native';

import styles, {defaultColor} from './Container.style';

interface IContainerProps {
	heading: string;
	text: string;
	color: string;
}

export const Container: React.SFC<IContainerProps> = ({heading, text, color = defaultColor}) => (
	<View style={[styles.container, {backgroundColor: color}]}>
		<Text style={styles.heading}>{heading}</Text>
		<Text style={styles.text}>{text}</Text>
	</View>
);
