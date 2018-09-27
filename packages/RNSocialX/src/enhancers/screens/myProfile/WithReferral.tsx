/**
 * TODO list:
 * 1. Data props: iOSContent, iOSOptions, androidContent, androidOptions, socx, referrals, code, url
 * 2. Action props: getText
 */

import * as React from 'react';
import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

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
		referrals: '18',
		socx: '13,048',
		url: 'http://www.lorem.ipsum.com',
		code: '5H91BGD34',
	},
	actions: { getText: (value: string, ...args: any[]) => value },
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
	referrals: string;
	socx: string;
	code: string;
	url: string;
}

export interface IWithReferralEnhancedActions extends ITranslatedProps {}

interface IWithReferralEnhancedProps {
	data: IWithReferralEnhancedData;
	actions: IWithReferralEnhancedActions;
}

interface IWithReferralProps {
	children(props: IWithReferralEnhancedProps): JSX.Element;
}

interface IWithReferralState {}

export class WithReferral extends React.Component<
	IWithReferralProps,
	IWithReferralState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) =>
					this.props.children({
						data: mock.data,
						actions: { ...mock.actions, getText: i18nProps.getText },
					})
				}
			</WithI18n>
		);
	}
}
