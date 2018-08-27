import * as React from 'react';
import {Foo} from '../components';
import {WithFooGreeter} from '../enhancers';

interface IFooProps {
	message: string;
	style: any;
}

export const HelloFoo: React.SFC<IFooProps> = ({message, style}) => (
	<WithFooGreeter>
		{({salute, from}) => <Foo style={style} message={`${salute} to ${message} from ${from}`} />}
	</WithFooGreeter>
);
