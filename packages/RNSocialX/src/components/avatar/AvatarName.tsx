import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './AvatarName.style';

interface IAvatarNameProps {
	fullName: string;
	alias: string;
}

export const AvatarName: React.SFC<IAvatarNameProps> = ({ fullName, alias }) => (
	<View style={styles.container}>
		<Text style={styles.fullName}>{fullName}</Text>
		<Text style={styles.alias}>{'@' + alias}</Text>
	</View>
);
