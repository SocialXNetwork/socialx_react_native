import moment from 'moment';
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { connect } from 'react-redux';

import { AvatarImage, ButtonSizes, PrimaryButton } from '../';
import { Colors } from '../../environment/theme';
import { FRIEND_TYPES } from '../../types';

import { IWithUserEntryEnhancedData, WithUserEntry } from '../../enhancers/components';
import { IMessage } from '../../store/data/messages';
import { IProfile } from '../../store/data/profiles';
import { IApplicationState, selectMessages, selectProfile } from '../../store/selectors';

import styles from './UserEntry.style';

interface IUserEntryProps {
	alias: string;
	friends: boolean;
	chat: boolean;
	removable: boolean;
	onPress: () => void;
	onRemove?: () => void;
}

interface IProps extends IUserEntryProps, IWithUserEntryEnhancedData {
	profile: IProfile;
	currentUserAlias: string;
	messages: IMessage[];
}

class Component extends React.Component<IProps> {
	private ref: React.RefObject<Swipeable> = React.createRef();

	public shouldComponentUpdate(nextProps: IProps) {
		return (
			this.props.messages !== nextProps.messages ||
			this.props.profile !== nextProps.profile ||
			this.props.relationship !== nextProps.relationship ||
			this.props.request !== nextProps.request
		);
	}

	public render() {
		const {
			friends,
			chat,
			removable,
			profile,
			messages,
			currentUserAlias,
			relationship,
			onPress,
		} = this.props;

		if (profile) {
			const latestMessage = messages && messages[0];
			const showMessage = chat && latestMessage;
			const showFriendshipButtons = currentUserAlias !== profile.alias && friends;

			if (removable) {
				return (
					<Swipeable
						ref={this.ref}
						overshootRight={false}
						renderRightActions={this.renderRightActionsHandler}
					>
						<React.Fragment>
							<TouchableOpacity
								activeOpacity={1}
								onPress={onPress}
								onLongPress={() => this.ref.current && this.ref.current.openRight()}
								style={[styles.card, styles.removable]}
							>
								<View style={styles.details}>
									<AvatarImage image={profile.avatar} style={styles.avatar} />
									<View style={styles.textContainer}>
										<Text style={styles.name}>{profile.fullName}</Text>
										{showMessage ? (
											<Text style={styles.message}>{latestMessage.content}</Text>
										) : (
											<Text style={styles.alias}>@{profile.alias}</Text>
										)}
									</View>
								</View>
								{showMessage && (
									<View style={styles.right}>
										<Text style={styles.timestamp}>
											{moment(latestMessage.timestamp).fromNow()}
										</Text>
									</View>
								)}
								{showFriendshipButtons && (
									<View style={styles.button}>
										{profile.status === FRIEND_TYPES.NOT_FRIEND ? (
											<PrimaryButton
												label={relationship.action}
												loading={
													relationship.activity !== null &&
													relationship.activity.payload === profile.alias
												}
												size={ButtonSizes.Small}
												borderColor={Colors.pink}
												textColor={Colors.white}
												containerStyle={styles.primary}
												onPress={() => relationship.onStatusAction(profile.alias)}
											/>
										) : (
											<PrimaryButton
												label={relationship.action}
												loading={
													relationship.activity !== null &&
													relationship.activity.payload === profile.alias
												}
												size={ButtonSizes.Small}
												borderColor={Colors.pink}
												textColor={Colors.pink}
												containerStyle={styles.secondary}
												onPress={() => relationship.onStatusAction(profile.alias)}
											/>
										)}
									</View>
								)}
							</TouchableOpacity>
						</React.Fragment>
					</Swipeable>
				);
			}

			return (
				<TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.card}>
					<View style={styles.details}>
						<AvatarImage image={profile.avatar} style={styles.avatar} />
						<View style={styles.textContainer}>
							<Text style={styles.name}>{profile.fullName}</Text>
							{showMessage ? (
								<Text style={styles.message}>{latestMessage.content}</Text>
							) : (
								<Text style={styles.alias}>@{profile.alias}</Text>
							)}
						</View>
					</View>
					{showMessage && (
						<View style={styles.right}>
							<Text style={styles.timestamp}>{moment(latestMessage.timestamp).fromNow()}</Text>
						</View>
					)}
					{showFriendshipButtons && (
						<View style={styles.button}>
							{profile.status === FRIEND_TYPES.NOT_FRIEND ? (
								<PrimaryButton
									label={relationship.action}
									loading={
										relationship.activity !== null &&
										relationship.activity.payload === profile.alias
									}
									size={ButtonSizes.Small}
									borderColor={Colors.pink}
									textColor={Colors.white}
									containerStyle={styles.primary}
									onPress={() => relationship.onStatusAction(profile.alias)}
								/>
							) : (
								<PrimaryButton
									label={relationship.action}
									loading={
										relationship.activity !== null &&
										relationship.activity.payload === profile.alias
									}
									size={ButtonSizes.Small}
									borderColor={Colors.pink}
									textColor={Colors.pink}
									containerStyle={styles.secondary}
									onPress={() => relationship.onStatusAction(profile.alias)}
								/>
							)}
						</View>
					)}
				</TouchableOpacity>
			);
		}

		return null;
	}

	public renderRightActionsHandler = (progress: Animated.Value) => {
		const translateX = progress.interpolate({
			inputRange: [0, 1],
			outputRange: [100, 2.5],
		});

		return (
			<RectButton style={styles.rightContainer} onPress={this.props.onRemove}>
				<Animated.Text style={[styles.action, { transform: [{ translateX }] }]}>
					{this.props.dictionary.components.buttons.delete}
				</Animated.Text>
			</RectButton>
		);
	};
}

const EnhancedComponent: React.SFC<IProps> = (props) => (
	<WithUserEntry>{({ data }) => <Component {...props} {...data} />}</WithUserEntry>
);

const mapStateToProps = (state: IApplicationState, props: IUserEntryProps) => ({
	profile: selectProfile(state.data.profiles, props.alias),
	messages: selectMessages(state.data.messages, props.alias),
});

export const UserEntry = connect(mapStateToProps)(EnhancedComponent as any);
