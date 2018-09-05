import React from 'react';
import {LinearTextGradient} from 'react-native-text-gradient';

interface ITextGradientProps {
	text: string;
	style: any;
	colors: string[];
}

export const TextGradient: React.SFC<ITextGradientProps> = ({text, style, colors}) => (
	<LinearTextGradient style={style} locations={[0, 1]} colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
		{text}
	</LinearTextGradient>
);
