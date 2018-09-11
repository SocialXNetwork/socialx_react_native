import * as React from 'react';
import {Text, View} from 'react-native';

import styles from './CommentsPostText.style';

interface IPostTextProps {
	text: string;
}

export const CommentsPostText: React.SFC<IPostTextProps> = ({text}) => (
	<View style={styles.container}>
		<Text style={styles.text}>{text}</Text>
	</View>
);
