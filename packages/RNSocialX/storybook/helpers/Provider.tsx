import React from 'react';

import BugSnag from '../../src/app/BugSnag';
import Store from '../../src/app/Store';

export interface IProviderProps {
	children?: object;
}

export default function Provider(props: IProviderProps) {
	return <BugSnag>{(bugsnag: any) => <Store bugsnag={bugsnag}>{props.children}</Store>}</BugSnag>;
}
