import moment from 'moment';
import React from 'react';
import { Animated, Easing, Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
	IWithBountyEnhancedActions,
	IWithBountyEnhancedData,
	WithBounty,
} from '../../../enhancers/screens';

import { AnimatedValue } from 'react-navigation';
import { CoinIcons } from '../../../environment/consts';
import { Animations, Colors } from '../../../environment/theme';
import { IBounty } from '../../../store/data/bounties';
import { AvatarImage } from '../../avatar/AvatarImage';
import { styles } from './Bounty.style';

interface IBountyProps {
	bounty: IBounty;
	// previousMessage: IBounty | null;
	// nextMessage: IBounty | null;
	// selected: boolean;
	onClaimReward: () => void;
}

interface IProps extends IBountyProps, IWithBountyEnhancedData, IWithBountyEnhancedActions {}

interface IState {
	animatedValue: any;
}

class Component extends React.Component<IProps, IState> {
	public state = {
		animatedValue: new Animated.Value(1),
	};

	public render() {
		const { bounty, dictionary, onClaimReward } = this.props;
		const { id, content, reward, claimed, coin, title } = bounty;
		const days = this.getDate();

		// if (!this.props.bounty.claimed) {
		// 	setInterval(() => {
		// 		Animated.spring(this.state.animatedValue, {
		// 			toValue: 0.5,
		// 			friction: 1,
		// 			useNativeDriver: true,
		// 		}).start(() => {
		// 			this.state.animatedValue.setValue(1);
		// 			this.setState({ animatedValue: new Animated.Value(1) });
		// 		});
		// 	}, 5000);
		// }

		return (
			<React.Fragment>
				<View style={styles.container}>
					{coin && (
						<React.Fragment>
							<Animated.View style={styles.imageContainer}>
								<TouchableOpacity
									disabled={claimed}
									style={{ transform: [{ scale: this.state.animatedValue }] }}
									onPress={() => undefined}
								>
									<Image
										source={CoinIcons[coin]}
										style={[styles.coinIcon]}
										resizeMode={'contain'}
									/>
								</TouchableOpacity>
								<Text style={styles.coinNumber}>{reward}</Text>
								<Text style={styles.coinTitle}>{coin}</Text>
							</Animated.View>
							<View style={styles.contentContainer}>
								<Text style={styles.title}>{title}</Text>
								<Text style={styles.textContent}>{content}</Text>
								{claimed ? (
									<View style={styles.row}>
										<Icon name="md-checkmark-circle-outline" size={17.5} color={Colors.sushi} />
										<Text style={styles.claimedText}>Claimed</Text>
									</View>
								) : (
									<View style={styles.row}>
										<Icon name="md-calendar" size={17.5} color={Colors.pink} />
										<Text style={styles.textIcon}>{`${days} days left`}</Text>
									</View>
								)}
							</View>
						</React.Fragment>
					)}
				</View>
				<View style={styles.separator} />
			</React.Fragment>
		);
	}

	private getDate = () => {
		const { expiryDate } = this.props.bounty;
		let days;

		const bountyExpirationDate = moment(expiryDate);
		const todayDate = moment();

		days = bountyExpirationDate.diff(todayDate, 'days');

		return days;
	};
}

export const Bounty: React.SFC<IBountyProps> = (props) => (
	<WithBounty>{({ data, actions }) => <Component {...props} {...data} {...actions} />}</WithBounty>
);
