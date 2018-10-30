import React from 'react';
import { Text, View } from 'react-native';

import styles from './Row.style';

interface IRowProps {
	title: string;
	value: string;
	border?: boolean;
	last?: boolean;
	onCopyText?: () => void;
}

export const Row: React.SFC<IRowProps> = ({
	title,
	value,
	border = false,
	last = false,
	onCopyText = () => {
		/**/
	},
}) => {
	const containerStyles = last ? [styles.container, { borderBottomWidth: 1 }] : styles.container;
	const rightStyles = border ? [styles.text, styles.border] : styles.text;

	return (
		<View style={containerStyles}>
			<Text style={styles.text}>{title}</Text>
			<Text onPress={onCopyText} style={rightStyles}>
				{value}
			</Text>
		</View>
	);
};
