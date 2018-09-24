/**
 * TODO list:
 * 1. Props data: notifications
 * 2. Props actions: getText
 */

import * as React from 'react';

import {ITranslatedProps} from '../../types';

const mock: IWithNavigationEnhancedProps = {
	notifications: 15,
	getText: (value: string, ...args: any[]) => value,
};

interface IWithNavigationEnhancedProps extends ITranslatedProps {
	notifications: number;
}

interface IWithNavigationProps {
	children(props: IWithNavigationEnhancedProps): JSX.Element;
}

interface IWithNavigationState {}

export class WithNavigation extends React.Component<IWithNavigationProps, IWithNavigationState> {
	render() {
		const {children} = this.props;
		return children({
			notifications: mock.notifications,
			getText: mock.getText,
		});
	}
}
