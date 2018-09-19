/**
 * TODO list:
 * 1. Props data: stats
 * 2. Props actions: getText
 */

import * as React from 'react';
import {cryptoStats} from '../../../mocks';
import {ICryptoStats, ITranslatedProps} from '../../../types';

const mock = {
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

interface ISocialXAccountEnhancedProps {
	data: IWithSocialXAccountEnhancedData;
	actions: IWithSocialXAccountEnhancedActions;
}

interface ISocialXAccountProps {
	children(props: ISocialXAccountEnhancedProps): JSX.Element;
}

interface ISocialXAccountState {}

export class WithSocialXAccount extends React.Component<ISocialXAccountProps, ISocialXAccountState> {
	render() {
		return this.props.children({data: mock.data, actions: mock.actions});
	}
}
