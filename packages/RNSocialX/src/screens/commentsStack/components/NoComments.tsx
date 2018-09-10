import * as React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import style, {customStyleProps} from './NoComments.style';

interface INoCommentsProps {
	text: string;
}

export const NoComments: React.SFC<INoCommentsProps> = ({text}) => (
	<View style={style.noCommentsContainer}>
		<Icon name={'md-list'} size={customStyleProps.noCommentsIconSize} color={customStyleProps.noCommentsIconColor} />
		<Text style={style.noCommentsText}>{text}</Text>
	</View>
);
