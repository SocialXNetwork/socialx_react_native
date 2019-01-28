import moment from 'moment';
import * as React from 'react';
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { truncate } from 'fs';
import { Colors } from '../../../environment/theme';
import { IMessage } from '../../../store/data/messages';
import { AvatarImage } from '../../avatar/AvatarImage';
import { leftStyles, rightStyles, styles } from './Message.style';

interface IMessageProps {
	message: IMessage;
	avatar: string;
	showProfileOptionsHandler: () => void;
}

export class Message extends React.Component<IMessageProps> {
	public state = {
		translateYValue: new Animated.Value(0),
	};

	public render() {
		const { content, timestamp, self, consecutive } = this.props.message;
		const wrapperStyles = this.getWrapperStyles();

		if (self) {
			return (
				<Animated.View
					style={[
						rightStyles.container,
						{ transform: [{ translateY: this.state.translateYValue }] },
					]}
				>
					<TouchableOpacity
						style={[styles.overflow, wrapperStyles]}
						onPress={() => {
							this.showMoreInformation();
						}}
					>
						<LinearGradient
							start={{ x: 0, y: 0.5 }}
							end={{ x: 1, y: 0.5 }}
							colors={[Colors.fuchsiaBlue, Colors.pink]}
							style={styles.gradient}
						>
							<Text style={[styles.text, styles.self]}>{content}</Text>
						</LinearGradient>
					</TouchableOpacity>
				</Animated.View>
			);
		}

		return (
			<Animated.View
				style={[leftStyles.container, { transform: [{ translateY: this.state.translateYValue }] }]}
			>
				{consecutive && consecutive.last && (
					<TouchableOpacity
						style={styles.avatarContainer}
						onPress={() => this.props.showProfileOptionsHandler()}
					>
						<AvatarImage image={this.props.avatar} style={styles.avatar} />
					</TouchableOpacity>
				)}
				<TouchableOpacity
					style={[
						styles.background,
						wrapperStyles,
						consecutive && !consecutive.last
							? leftStyles.specialMargin
							: leftStyles.noSpecialMargin,
					]}
					onPress={() => {
						this.showMoreInformation();
					}}
				>
					<Animated.Text style={styles.text}>{content}</Animated.Text>
				</TouchableOpacity>
			</Animated.View>
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

	private showMoreInformation = () => {
		Animated.timing(this.state.translateYValue, {
			toValue: 25,
			duration: 300,
			easing: Easing.ease,
			useNativeDriver: true,
		}).start();
	};
}
