/**
 * TODO list:
 * 1. Props actions: navigateToMainScreen
 */

import * as React from 'react';
import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithIntroEnhancedProps = {
	data: {},
	actions: {
		navigateToMainScreen: () => {
			/**/
		},
		// This is now implemented with the WithI18n connector enhancer
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithIntroEnhancedData {}

export interface IWithIntroEnhancedActions extends ITranslatedProps {
	navigateToMainScreen: () => void;
}

interface IWithIntroEnhancedProps {
	data: IWithIntroEnhancedData;
	actions: IWithIntroEnhancedActions;
}

interface IWithIntroProps {
	children(props: IWithIntroEnhancedProps): JSX.Element;
}

interface IWithIntroState {}

export class WithIntro extends React.Component<
	IWithIntroProps,
	IWithIntroState
> {
	render() {
		const { children } = this.props;
		return (
			<WithI18n>
				{(i18nProps) =>
					children({
						data: mock.data,
						actions: { ...mock.actions, getText: i18nProps.getText },
					})
				}
			</WithI18n>
		);
	}
}
