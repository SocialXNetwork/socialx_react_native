import moment from 'moment';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

import { CoinIcons } from '../../../environment/consts';
import { Colors, Sizes } from '../../../environment/theme';
import { IBounty } from '../../../store/data/bounties';

import { ILocaleDictionary } from '../../../store/app/i18n/Types';
import { styles } from './Bounty.style';

interface IBountyProps {
	dictionary: ILocaleDictionary;
	bounty: IBounty;
	onClaimBounty: (index: string) => void;
}

const PulsatingIcon = Animatable.createAnimatableComponent(Image);

export const Bounty: React.SFC<IBountyProps> = (props) => {
	const { bounty, dictionary, onClaimBounty } = props;
	const {
		id,
		content,
		expiryDate,
		reward,
		claimed,
		coin,
		title,
		submissionMin,
		submissionMax,
	} = bounty;
	const days = getDate(expiryDate);

	return (
		<React.Fragment>
			<View style={styles.container}>
				{coin && (
					<React.Fragment>
						<View style={styles.imageContainer}>
							<TouchableOpacity onPress={() => onClaimBounty(id)}>
								{claimed ? (
									<Image source={CoinIcons[coin]} style={styles.coinIcon} resizeMode={'contain'} />
								) : (
									<PulsatingIcon
										source={CoinIcons[coin]}
										animation="pulse"
										easing="ease-out"
										iterationCount={'infinite'}
										style={styles.coinIcon}
										resizeMode={'contain'}
										useNativeDriver={true}
									/>
								)}
							</TouchableOpacity>
							<Text style={styles.coinNumber}>{reward}</Text>
							<Text style={styles.coinTitle}>{coin}</Text>
						</View>
						<View style={styles.contentContainer}>
							<Text style={styles.title}>{title}</Text>
							<Text style={styles.textContent}>{content}</Text>
							{claimed ? (
								<View style={styles.row}>
									<Icon name="md-checkmark-circle-outline" size={17.5} color={Colors.sushi} />
									<Text style={styles.claimedText}>{dictionary.screens.bounties.claimed}</Text>
								</View>
							) : (
								<View style={styles.row}>
									<Icon name="md-calendar" size={17.5} color={Colors.pink} />
									<Text
										style={[styles.textIcon, { marginRight: Sizes.smartVerticalScale(10) }]}
									>{`${days} days left`}</Text>
									<Icon name="ios-create" size={17.5} color={Colors.cerulean} />
									<Text
										style={[styles.textIcon, { color: Colors.cerulean }]}
									>{`${submissionMin}/${submissionMax}`}</Text>
								</View>
							)}
						</View>
					</React.Fragment>
				)}
			</View>
			<View style={styles.separator} />
		</React.Fragment>
	);
};

const getDate = (expiryDate: Date) => {
	let days;

	const bountyExpirationDate = moment(expiryDate);
	const todayDate = moment();

	days = bountyExpirationDate.diff(todayDate, 'days');

	return days;
};
