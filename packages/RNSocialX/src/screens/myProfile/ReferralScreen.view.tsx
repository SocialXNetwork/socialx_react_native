import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {Container, Header, Row, ScreenHeaderButton} from '../../components';
import styles, {shareIcon} from './ReferralScreen.style';

const HEADING = 'Lorem ipsum dolor';
const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipi elit, sed do eiusmod tempor incididunt ut labore';

interface IReferralScreenViewProps {
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
}) => (
	<View style={styles.container}>
		{
			// @ts-ignore
			<Header title={'referral system'} left={<ScreenHeaderButton iconName={'ios-arrow-back'} onPress={onGoBack} />} />
		}
		{
			// @ts-ignore
			<Container heading={HEADING} text={TEXT} />
		}
		{
			// @ts-ignore
			<Row title={'Total referrals'} value={referrals} />
		}
		{
			// @ts-ignore
			<Row title={'SOCX earned through referrals'} value={socx} last={true} />
		}
		{
			// @ts-ignore
			<Container heading={'Share'} text={TEXT} />
		}
		{
			// @ts-ignore
			<Row title={'Invite URL'} value={url} border={true} onCopyText={() => copyToClipboard(url)} />
		}
		<Row title={'Invite Code'} value={code} border={true} onCopyText={() => copyToClipboard(code)} last={true} />
		<View style={styles.footer}>
			<Text style={styles.text}>INVITE FRIENDS VIA SOCIAL</Text>
			<TouchableOpacity onPress={onShare} style={styles.iconContainer}>
				<Image source={shareIcon} style={styles.icon} resizeMode={'contain'} />
			</TouchableOpacity>
		</View>
	</View>
);
