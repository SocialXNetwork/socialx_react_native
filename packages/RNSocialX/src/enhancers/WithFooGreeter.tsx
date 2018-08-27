import {foo} from '@socialx/api-data';
import * as React from 'react';
import {View} from 'react-native';

interface IGreeter {
	salute: string;
	from: string;
}

interface IWithFooGreeter {
	children(props: IGreeter): JSX.Element;
}

export const WithFooGreeter: React.SFC<IWithFooGreeter> = ({children}) => (
	<View>{children({salute: 'Hello ', from: foo()})}</View>
);
