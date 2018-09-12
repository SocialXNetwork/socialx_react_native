import React, {Component} from 'react';
import {Clipboard, Platform, Share, ShareOptions} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import {OS_TYPES} from '../../environment/consts';
import {ReferralScreenView} from './ReferralScreen.view';

interface IReferralScreenProps {
	navigation: NavigationScreenProp<any>;
}

export class ReferralScreen extends Component<IReferralScreenProps> {
	static navigationOptions = {
		title: 'REFERRAL SYSTEM',
	};

	public render() {
		return <ReferralScreenView copyToClipboard={this.copyToClipboardHandler} onShare={this.onShareHandler} />;
	}

	private onShareHandler = async () => {
		const iOSContent = {
			title: 'Shared message from SocialX',
			url: 'http://www.lorem.ipsum.com',
		};
		const androidContent = {
			title: 'Shared message from SocialX',
			message: 'http://www.lorem.ipsum.com',
		};
		const iOSOptions = {
			subject: 'Shared message from SocialX',
		};
		const androidOptions = {
			dialogTitle: 'Shared message from SocialX',
		};

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
