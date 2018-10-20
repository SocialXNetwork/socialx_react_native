import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import {
	Header,
	HeaderButton,
	ReferralContainer,
	ReferralRow,
} from '../../components';
import { ITranslatedProps } from '../../types';

import styles, { shareIcon } from './ReferralScreen.style';

const HEADING = 'Lorem ipsum dolor';
const TEXT =
	'Lorem ipsum dolor sit amet, consectetur adipi elit, sed do eiusmod tempor incididunt ut labore';

interface IReferralScreenViewProps extends ITranslatedProps {
	referrals: string;
	socx: string;
	code: string;
	url: string;
	copyToClipboard: (value: string) => void;
	onShare: () => Promise<any>;
	onGoBack: () => void;
}

export const ReferralScreenView: React.SFC<IReferralScreenViewProps> = ({
	referrals,
	socx,
	code,
	url,
	copyToClipboard,
	onShare,
	onGoBack,
	getText,
}) => (
	<View style={styles.container}>
		<Header
			title={getText('referral.screen.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<ReferralContainer heading={HEADING} text={TEXT} />
		<ReferralRow
			title={getText('referral.screen.referrals')}
			value={referrals}
		/>
		<ReferralRow
			title={getText('referral.screen.socx')}
			value={socx}
			last={true}
		/>
		<ReferralContainer heading={getText('referral.screen.share')} text={TEXT} />
		<ReferralRow
			title={getText('referral.screen.url')}
			value={url}
			border={true}
			onCopyText={() => copyToClipboard(url)}
		/>
		<ReferralRow
			title={getText('referral.screen.code')}
			value={code}
			border={true}
			onCopyText={() => copyToClipboard(code)}
			last={true}
		/>
		<View style={styles.footer}>
			<Text style={styles.text}>
				{getText('referral.screen.invite').toUpperCase()}
			</Text>
			<TouchableOpacity onPress={onShare} style={styles.iconContainer}>
				<Image source={shareIcon} style={styles.icon} resizeMode="contain" />
			</TouchableOpacity>
		</View>
	</View>
);
