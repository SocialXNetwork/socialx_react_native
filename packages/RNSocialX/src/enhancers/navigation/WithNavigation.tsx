/**
 * TODO list:
 * 1. Props data: notifications
 */

import * as React from 'react';

import { WithI18n } from '../connectors/app/WithI18n';

import { ITranslatedProps } from '../../types';

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

export class WithNavigation extends React.Component<
	IWithNavigationProps,
	IWithNavigationState
> {
	render() {
		const { children } = this.props;
		return (
			<WithI18n>
				{(i18nProps) =>
					children({
						notifications: mock.notifications,
						getText: i18nProps.getText,
					})
				}
			</WithI18n>
		);
	}
}
