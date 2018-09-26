import * as React from 'react';
import { Text } from 'react-native';

interface IFooProps {
	message: string;
	style: any;
}

export const Foo: React.SFC<IFooProps> = ({ message, style }) => (
	<Text style={style}>{message}</Text>
);
