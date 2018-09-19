/**
 * TODO list:
 * 1. Data props: iOSContent, iOSOptions, androidContent, androidOptions
 */

import * as React from 'react';

const mock: IWithReferralEnhancedProps = {
	data: {
		iOSContent: {
			title: 'Shared message from SocialX',
			url: 'http://www.lorem.ipsum.com',
		},
		iOSOptions: {
			subject: 'Shared message from SocialX',
		},
		androidContent: {
			title: 'Shared message from SocialX',
			message: 'http://www.lorem.ipsum.com',
		},
		androidOptions: {
			dialogTitle: 'Shared message from SocialX',
		},
	},
	actions: {},
};

export interface IWithReferralEnhancedData {
	iOSContent: {
		title: string;
		url: string;
	};
	iOSOptions: {
		subject: string;
	};
	androidContent: {
		title: string;
		message: string;
	};
	androidOptions: {
		dialogTitle: string;
	};
}

export interface IWithReferralEnhancedActions {}

interface IWithReferralEnhancedProps {
	data: IWithReferralEnhancedData;
	actions: IWithReferralEnhancedActions;
}

interface IWithReferralProps {
	children(props: IWithReferralEnhancedProps): JSX.Element;
}

interface IWithReferralState {}

export class WithReferral extends React.Component<IWithReferralProps, IWithReferralState> {
	render() {
		return this.props.children({data: mock.data, actions: mock.actions});
	}
}
