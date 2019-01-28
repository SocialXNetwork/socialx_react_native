import moment from 'moment';
import * as React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../environment/theme';
import { IMessage } from '../../../store/data/messages';
import { AvatarImage } from '../../avatar/AvatarImage';
import { leftStyles, rightStyles, styles } from './Message.style';

interface IProps {
	message: IMessage;
	avatar: string;
	selected: boolean;
	translateY: boolean;
	onMessagePress: () => void;
	onAvatarPress: () => void;
}

export class Message extends React.Component<IProps> {
	private translateY = new Animated.Value(0);

	public shouldComponentUpdate(prevProps: IProps) {
		return (
			prevProps.selected !== this.props.selected || prevProps.translateY !== this.props.translateY
		);
	}

	public componentDidUpdate(prevProps: IProps) {
		if (!prevProps.translateY && this.props.translateY) {
			Animated.timing(this.translateY, {
				toValue: 25,
				duration: 250,
				useNativeDriver: true,
			}).start();
		}

		if (prevProps.translateY && !this.props.translateY) {
			Animated.timing(this.translateY, {
				toValue: 0,
				duration: 250,
				useNativeDriver: true,
			}).start();
		}
	}

	public render() {
		const { selected, message, onAvatarPress, onMessagePress } = this.props;
		const { content, timestamp, self, consecutive, seen, sent } = message;
		const wrapperStyles = this.getWrapperStyles();
		const date = moment
			.unix(timestamp)
			.format('LT')
			.toString();

		if (self) {
			return (
				<React.Fragment>
					{selected && (
						<React.Fragment>
							<Text style={styles.timestamp}>{date}</Text>
							{sent && seen && (
								<View>
									<Text style={[styles.status, { textAlign: 'right' }]}>Seen</Text>
									<AvatarImage image={this.props.avatar} style={styles.atomAvatar} />
								</View>
							)}
							{sent && !seen && (
								<View>
									<Text style={[styles.status, { textAlign: 'right' }]}>Delivered</Text>
									<Icon name="ios-checkmark-circle" style={styles.checkmark} />
								</View>
							)}
						</React.Fragment>
					)}
					<Animated.View
						style={[rightStyles.container, { transform: [{ translateY: this.translateY }] }]}
					>
						<TouchableOpacity
							style={[styles.overflow, wrapperStyles]}
							activeOpacity={1}
							onPress={onMessagePress}
						>
							<LinearGradient
								start={{ x: 0, y: 0.5 }}
								end={{ x: 1, y: 0.5 }}
								colors={selected ? [Colors.gigas, Colors.flirt] : [Colors.fuchsiaBlue, Colors.pink]}
								style={styles.gradient}
							>
								<Text style={[styles.text, styles.self]}>{content}</Text>
							</LinearGradient>
						</TouchableOpacity>
					</Animated.View>
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				{selected && (
					<React.Fragment>
						<Text style={styles.timestamp}>{date}</Text>
						{sent && seen && (
							<View>
								<Text style={[styles.status, { textAlign: 'left' }]}>Seen</Text>
								<Icon name="ios-checkmark-circle" style={styles.checkmark} />
							</View>
						)}
						{sent && !seen && <Text style={styles.status}>Delivered</Text>}
					</React.Fragment>
				)}
				<Animated.View
					style={[leftStyles.container, { transform: [{ translateY: this.translateY }] }]}
				>
					{consecutive && consecutive.last && (
						<TouchableOpacity
							style={styles.avatarContainer}
							activeOpacity={1}
							onPress={onAvatarPress}
						>
							<AvatarImage image={this.props.avatar} style={styles.avatar} />
						</TouchableOpacity>
					)}
					<TouchableOpacity
						style={[
							styles.background,
							wrapperStyles,
							{ backgroundColor: selected ? Colors.alto : Colors.gallery },
							consecutive && !consecutive.last
								? leftStyles.specialMargin
								: leftStyles.noSpecialMargin,
						]}
						activeOpacity={1}
						onPress={onMessagePress}
					>
						<Text style={styles.text}>{content}</Text>
					</TouchableOpacity>
				</Animated.View>
			</React.Fragment>
		);
	}

	private getWrapperStyles = () => {
		const { self, consecutive } = this.props.message;
		const wrapperStyles = [];
		const style = self ? rightStyles : leftStyles;

		if (consecutive) {
			const { first, middle, last } = consecutive;

			if (first) {
				wrapperStyles.push(style.first);
			} else if (middle) {
				wrapperStyles.push(style.middle);
			} else if (last) {
				wrapperStyles.push(style.last);
			}
		}

		return wrapperStyles;
	};
}
