import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {Container, Row} from '../../../components';
import styles, {shareIcon} from './ReferralScreen.style';

const HEADING = 'Lorem ipsum dolor';
const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipi elit, sed do eiusmod tempor incididunt ut labore';
const URL = 'http://www.lorem.ipsum.com';
const CODE = '5H91BGD34';
const INVITE = 'INVITE FRIENDS VIA SOCIAL';

interface IReferralScreenViewProps {
	copyToClipboard: (value: string) => void;
	onShare: () => Promise<any>;
}

export const ReferralScreenView: React.SFC<IReferralScreenViewProps> = ({copyToClipboard, onShare}) => (
	<View style={styles.container}>
		// @ts-ignore
		<Container heading={HEADING} text={TEXT} />
		// @ts-ignore
		<Row title={'Total referrals'} value={'18'} />
		// @ts-ignore
		<Row title={'SOCX earned through referrals'} value={'13,048'} last={true} />
		// @ts-ignore
		<Container heading={'Share'} text={TEXT} />
		// @ts-ignore
		<Row title={'Invite URL'} value={URL} border={true} onCopyText={() => copyToClipboard(URL)} />
		<Row title={'Invite Code'} value={CODE} border={true} onCopyText={() => copyToClipboard(CODE)} last={true} />
		<View style={styles.footer}>
			<Text style={styles.text}>{INVITE}</Text>
			<TouchableOpacity onPress={onShare} style={styles.iconContainer}>
				<Image source={shareIcon} style={styles.icon} resizeMode={'contain'} />
			</TouchableOpacity>
		</View>
	</View>
);
