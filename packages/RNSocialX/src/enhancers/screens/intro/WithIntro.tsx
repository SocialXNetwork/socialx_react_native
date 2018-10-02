import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { resetNavigationToRoute } from '../../helpers';

const mock: IWithIntroEnhancedProps = {
	data: {},
	actions: {
		resetNavigationToRoute: (
			screenName: string,
			navigation: NavigationScreenProp<any>,
		) => {
			/**/
		},
		// This is now implemented with the WithI18n connector enhancer
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithIntroEnhancedData {}

export interface IWithIntroEnhancedActions extends ITranslatedProps {
	resetNavigationToRoute: (
		screenName: string,
		navigation: NavigationScreenProp<any>,
	) => void;
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
						actions: {
							...mock.actions,
							getText: i18nProps.getText,
							resetNavigationToRoute,
						},
					})
				}
			</WithI18n>
		);
	}
}
