/**
 * TODO list:
 * 1. Props data: stats
 * 2. Props actions: getText
 */

import * as React from 'react';
import {cryptoStats} from '../../../mocks';
import {ICryptoStats, ITranslatedProps} from '../../../types';

const mock: IWithSocialXAccountEnhancedProps = {
	data: {
		stats: cryptoStats,
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithSocialXAccountEnhancedData {
	stats: ICryptoStats;
}

export interface IWithSocialXAccountEnhancedActions extends ITranslatedProps {}

interface IWithSocialXAccountEnhancedProps {
	data: IWithSocialXAccountEnhancedData;
	actions: IWithSocialXAccountEnhancedActions;
}

interface IWithSocialXAccountProps {
	children(props: IWithSocialXAccountEnhancedProps): JSX.Element;
}

interface IWithSocialXAccountState {}

export class WithSocialXAccount extends React.Component<IWithSocialXAccountProps, IWithSocialXAccountState> {
	render() {
		return this.props.children({data: mock.data, actions: mock.actions});
	}
}
