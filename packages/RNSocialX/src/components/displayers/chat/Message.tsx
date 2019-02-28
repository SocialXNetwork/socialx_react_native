import moment from 'moment';
import React from 'react';
import { Animated, Clipboard, Platform, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { AnimatedValue } from 'react-navigation';

import {
	IWithMessageEnhancedActions,
	IWithMessageEnhancedData,
	WithMessage,
} from '../../../enhancers/components';

import { OS_TYPES } from '../../../environment/consts';
import { Colors, Icons } from '../../../environment/theme';
import { IMessage } from '../../../store/data/messages';
import { AvatarImage } from '../../avatar/AvatarImage';
import { leftStyles, rightStyles, styles } from './Message.style';

interface IMessageProps {
	message: IMessage;
	previousMessage: IMessage | null;
	nextMessage: IMessage | null;
	alias: string;
	avatar: string;
	selected: boolean;
	translateY: boolean;
	onMessagePress: () => void;
	onAvatarPress: () => void;
}

interface IProps extends IMessageProps, IWithMessageEnhancedData, IWithMessageEnhancedActions {}

interface IState {
	translateY: AnimatedValue;
}

class Component extends React.Component<IProps, IState> {
	public state = {
		translateY: new Animated.Value(0),
	};

	public shouldComponentUpdate(prevProps: IProps) {
		return (
			prevProps.message.consecutive !== this.props.message.consecutive ||
			prevProps.selected !== this.props.selected ||
			prevProps.translateY !== this.props.translateY
		);
	}

	public componentDidUpdate(prevProps: IProps) {
		if (Platform.OS === OS_TYPES.IOS) {
			if (!prevProps.translateY && this.props.translateY) {
				Animated.timing(this.state.translateY, {
					toValue: 25,
					duration: 250,
					useNativeDriver: true,
				}).start();
			}
			if (prevProps.translateY && !this.props.translateY) {
				Animated.timing(this.state.translateY, {
					toValue: 0,
					duration: 250,
					useNativeDriver: true,
				}).start();
			}
		}
	}

	public render() {
		const { selected, message, avatar, dictionary, onAvatarPress, onMessagePress } = this.props;
		const { content, self, consecutive, seen, sent } = message;
		const wrapperStyles = this.getWrapperStyles();
		const date = this.getDate();

		if (self) {
			return (
				<React.Fragment>
					{selected && (
						<View style={styles.row}>
							<View style={styles.spacer} />
							<View style={styles.timestamp}>
								<Text style={styles.grayText}>{date}</Text>
							</View>
							<View style={[styles.status, { justifyContent: 'flex-end' }]}>
								{sent && !seen && (
									<React.Fragment>
										<Text style={[styles.smallText, styles.grayText]}>
											{dictionary.components.displayers.message.delivered}
										</Text>
										<Icon name={Icons.check} style={styles.check} />
									</React.Fragment>
								)}
								{sent && seen && (
									<React.Fragment>
										<Text style={[styles.smallText, styles.grayText]}>
											{dictionary.components.displayers.message.seen}
										</Text>
										<AvatarImage image={avatar} style={styles.seen} />
									</React.Fragment>
								)}
							</View>
						</View>
					)}
					<Animated.View
						style={[
							rightStyles.container,
							{
								transform: [{ translateY: this.state.translateY }],
							},
						]}
					>
						<TouchableOpacity
							style={[styles.overflow, wrapperStyles]}
							activeOpacity={1}
							onPress={onMessagePress}
							onLongPress={this.showOptions}
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

		let showAvatar = false;
		if (consecutive) {
			if (consecutive.last) {
				showAvatar = true;
			} else if (!consecutive.first && !consecutive.middle && !consecutive.last) {
				showAvatar = true;
			}
		}

		return (
			<React.Fragment>
				{selected && (
					<View style={styles.row}>
						<View style={styles.status}>
							{sent && !seen && (
								<React.Fragment>
									<View style={leftStyles.spacer} />
									<Text style={[styles.smallText, styles.grayText]}>
										{dictionary.components.displayers.message.delivered}
									</Text>
									<Icon name={Icons.check} style={styles.check} />
								</React.Fragment>
							)}
							{sent && seen && (
								<React.Fragment>
									<View style={leftStyles.spacer} />
									<Text style={[styles.smallText, styles.grayText]}>
										{dictionary.components.displayers.message.seen}
									</Text>
									<AvatarImage image={avatar} style={styles.seen} />
								</React.Fragment>
							)}
						</View>
						<View style={styles.timestamp}>
							<Text style={styles.grayText}>{date}</Text>
						</View>
						<View style={styles.spacer} />
					</View>
				)}
				<Animated.View
					style={[
						leftStyles.container,
						{
							transform: [{ translateY: this.state.translateY }],
						},
					]}
				>
					<View style={leftStyles.row}>
						{showAvatar ? (
							<TouchableOpacity
								style={leftStyles.avatarContainer}
								activeOpacity={1}
								onPress={onAvatarPress}
							>
								<AvatarImage image={avatar} style={leftStyles.avatar} />
							</TouchableOpacity>
						) : (
							<View style={leftStyles.spacer} />
						)}
						<TouchableOpacity
							style={[
								styles.background,
								wrapperStyles,
								{
									backgroundColor: selected ? Colors.alto : Colors.gallery,
								},
							]}
							activeOpacity={1}
							onPress={onMessagePress}
							onLongPress={this.showOptions}
						>
							<Text style={styles.text}>{content}</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</React.Fragment>
		);
	}

	private showOptions = () => {
		const { message, dictionary, showOptionsMenu } = this.props;

		const copy = {
			label: dictionary.components.modals.options.copy,
			icon: Icons.copy,
			actionHandler: () => Clipboard.setString(message.content),
		};
		const remove = {
			label: dictionary.components.modals.options.delete,
			icon: Icons.delete,
			actionHandler: this.deleteMessageHandler,
		};

		const items = message.self ? [copy, remove] : [copy];
		showOptionsMenu(items);
	};

	private deleteMessageHandler = () => {
		const {
			message,
			previousMessage,
			nextMessage,
			alias,
			deleteMessage,
			updateMessage,
		} = this.props;

		if (message.consecutive.first && nextMessage && nextMessage.self) {
			if (nextMessage.consecutive.middle) {
				updateMessage({ id: nextMessage.id, alias, consecutive: { first: true, middle: false } });
			} else {
				updateMessage({ id: nextMessage.id, alias, consecutive: { last: false, middle: false } });
			}
		} else if (message.consecutive.last && previousMessage && previousMessage.self) {
			if (previousMessage.consecutive.middle) {
				updateMessage({
					id: previousMessage.id,
					alias,
					consecutive: { last: true, middle: false },
				});
			} else {
				updateMessage({
					id: previousMessage.id,
					alias,
					consecutive: { first: false, middle: false },
				});
			}
		}

		deleteMessage({ id: message.id, alias });
	};

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

	private getDate = () => {
		const { timestamp } = this.props.message;
		let date;

		const startOfWeek = moment().startOf('isoWeek');
		const endOfWeek = moment().endOf('isoWeek');
		const messageDate = moment(timestamp);
		const messageDay = moment(timestamp).day();
		const messageYear = moment(timestamp).year();
		const currentDay = moment().day();
		const currentWeek = messageDate.isBetween(startOfWeek, endOfWeek);
		const currentYear = moment().year();

		if (currentDay === messageDay && messageYear === currentYear) {
			date = moment(timestamp).format('H:mm');
		} else if (currentWeek && messageYear === currentYear) {
			date = moment(timestamp).format('dddd, H:mm');
		} else if (!currentWeek && messageYear === currentYear) {
			date = moment(timestamp).format('DD MMM, H:mm');
		} else if (!currentWeek && messageYear < currentYear) {
			date = moment(timestamp).format('DD MMM YYYY, H:mm');
		}

		return date;
	};
}

export const Message: React.SFC<IMessageProps> = (props) => (
	<WithMessage>
		{({ data, actions }) => <Component {...props} {...data} {...actions} />}
	</WithMessage>
);
