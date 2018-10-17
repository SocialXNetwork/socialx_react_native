import * as React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import style, { defaultStyles } from './NoComments.style';

interface INoCommentsProps {
	text: string;
}

export const NoComments: React.SFC<INoCommentsProps> = ({ text }) => (
	<View style={style.noCommentsContainer}>
		<Icon
			name="md-list"
			size={defaultStyles.noCommentsIconSize}
			color={defaultStyles.noCommentsIconColor}
		/>
		<Text style={style.noCommentsText}>{text}</Text>
	</View>
);
