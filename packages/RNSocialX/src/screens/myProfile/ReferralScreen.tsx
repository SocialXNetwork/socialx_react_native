import React, {Component} from 'react';
import {Clipboard, Platform, Share, ShareOptions} from 'react-native';

import {OS_TYPES} from '../../environment/consts';
import {INavigationProps} from '../../types';
import {ReferralScreenView} from './ReferralScreen.view';

import {IWithReferralEnhancedActions, IWithReferralEnhancedData, WithReferral} from '../../enhancers/screens';

type IReferralScreenProps = INavigationProps & IWithReferralEnhancedActions & IWithReferralEnhancedData;

class Screen extends Component<IReferralScreenProps> {
	static navigationOptions = {
		title: 'REFERRAL SYSTEM',
	};

	public render() {
		return <ReferralScreenView copyToClipboard={this.copyToClipboardHandler} onShare={this.onShareHandler} />;
	}

	private onShareHandler = () => {
		const {iOSContent, iOSOptions, androidContent, androidOptions} = this.props;

		const content = Platform.OS === OS_TYPES.IOS ? iOSContent : androidContent;
		const options = Platform.OS === OS_TYPES.IOS ? iOSOptions : androidOptions;

		Share.share(content, options as ShareOptions)
			.then((result: any) => {
				console.log(result);
			})
			.catch((err: any) => {
				console.log(err);
			});
	};

	private copyToClipboardHandler = (value: string) => {
		Clipboard.setString(value);
	};
}

export const ReferralScreen = ({navigation}: INavigationProps) => (
	<WithReferral>{({data, actions}) => <Screen navigation={navigation} {...data} {...actions} />}</WithReferral>
);
