import moment from 'moment';
import * as React from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
		const { content, timestamp, self, consecutive } = message;
		const wrapperStyles = this.getWrapperStyles();
		const date = moment
			.unix(timestamp)
			.format('LT')
			.toString();

		const opacity = this.translateY.interpolate({
			inputRange: [0, 20, 25],
			outputRange: [0, 0.8, 1],
		});

		if (self) {
			return (
				<React.Fragment>
					{selected && <Text style={styles.timestamp}>{date}</Text>}
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
				{selected && <Text style={styles.timestamp}>{date}</Text>}
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
