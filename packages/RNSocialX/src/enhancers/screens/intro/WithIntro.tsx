/**
 * TODO list:
 * 1. Props actions: navigateToMainScreen, getText
 */

import * as React from 'react';
import {ITranslatedProps} from '../../../types';

const mock: IWithIntroEnhancedProps = {
	data: {},
	actions: {
		navigateToMainScreen: () => {
			/**/
		},
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

export class WithIntro extends React.Component<IWithIntroProps, IWithIntroState> {
	render() {
		const {children} = this.props;
		return children({data: mock.data, actions: mock.actions});
	}
}
