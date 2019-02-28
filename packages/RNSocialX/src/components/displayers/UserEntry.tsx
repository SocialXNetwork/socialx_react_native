import moment from 'moment';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { AvatarImage, ButtonSizes, PrimaryButton } from '../';
import { Colors } from '../../environment/theme';
import { FRIEND_TYPES, MODAL_TYPES } from '../../types';

import {
	IWithUserEntryEnhancedActions,
	IWithUserEntryEnhancedData,
	WithUserEntry,
} from '../../enhancers/components';
import { IWithFriendsEnhancedData, WithFriends } from '../../enhancers/intermediary';
import { IMessage } from '../../store/data/messages';
import { IProfile } from '../../store/data/profiles';
import { IApplicationState, selectLastMessage, selectProfile } from '../../store/selectors';

import styles from './UserEntry.style';

interface IUserEntryProps {
	alias: string;
	friends: boolean;
	chat: boolean;
	removable: boolean;
	first: boolean;
	last: boolean;
	space?: boolean;
	onPress: () => void;
}

interface IProps
	extends IUserEntryProps,
		IWithUserEntryEnhancedData,
		IWithUserEntryEnhancedActions,
		IWithFriendsEnhancedData {
	profile: IProfile;
	currentUserAlias: string;
	message: IMessage;
}

class Component extends React.Component<IProps> {
	public shouldComponentUpdate(nextProps: IProps) {
		return (
			this.props.message !== nextProps.message ||
			this.props.profile !== nextProps.profile ||
			this.props.relationship.action !== nextProps.relationship.action ||
			this.props.relationship.activity !== nextProps.relationship.activity ||
			this.props.request.accepting !== nextProps.request.accepting ||
			this.props.request.rejecting !== nextProps.request.rejecting
		);
	}

	public render() {
		const {
			friends,
			chat,
			removable,
			profile,
			message,
			currentUserAlias,
			relationship,
			request,
			first,
			last,
			space,
			onPress,
		} = this.props;

		const cardStyles = this.getCardStyles();

		if (profile) {
			const showMessage = chat && message;
			const showFriendshipButtons = currentUserAlias !== profile.alias && friends;

			if (removable) {
				return (
					<TouchableOpacity
						delayPressIn={50}
						onPress={onPress}
						onLongPress={this.onShowOptionsHandler}
						style={cardStyles}
					>
						<View style={styles.details}>
							<AvatarImage image={profile.avatar} style={styles.avatar} />
							<View style={styles.textContainer}>
								<Text style={styles.name}>{profile.fullName}</Text>
								{showMessage ? (
									<Text style={styles.message}>{message.content}</Text>
								) : (
									<Text style={styles.alias}>@{profile.alias}</Text>
								)}
							</View>
						</View>
						{showMessage && (
							<View style={styles.right}>
								<Text style={styles.timestamp}>{moment(message.timestamp).fromNow()}</Text>
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
										disabled={request.accepting || request.rejecting}
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
										disabled={request.accepting || request.rejecting}
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

			return (
				<TouchableOpacity onPress={onPress} style={cardStyles}>
					<View style={styles.details}>
						<AvatarImage image={profile.avatar} style={styles.avatar} />
						<View style={styles.textContainer}>
							<Text style={styles.name}>{profile.fullName}</Text>
							{showMessage ? (
								<Text style={styles.message}>{message.content}</Text>
							) : (
								<Text style={styles.alias}>@{profile.alias}</Text>
							)}
						</View>
					</View>
					{showMessage && (
						<View style={styles.right}>
							<Text style={styles.timestamp}>{moment(message.timestamp).fromNow()}</Text>
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
									disabled={request.accepting || request.rejecting}
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
									disabled={request.accepting || request.rejecting}
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

	private onShowOptionsHandler = () => {
		const { showModal, showOptionsMenu, dictionary, alias } = this.props;

		const items = [
			{
				label: dictionary.components.modals.options.delete,
				icon: 'ios-trash',
				actionHandler: () => showModal({ type: MODAL_TYPES.DELETE, payload: alias }),
			},
		];

		showOptionsMenu(items);
	};

	private getCardStyles = () => {
		const { first, last, space } = this.props;

		const style = [styles.card];

		if (first) {
			style.push(styles.first);
		} else if (space) {
			style.push(styles.space);
		} else if (last) {
			style.push(styles.last);
		}

		return style;
	};
}

const EnhancedComponent: React.SFC<IProps> = (props) => (
	<WithFriends status={props.profile.status}>
		{(friends) => (
			<WithUserEntry>
				{({ data, actions }) => <Component {...props} {...data} {...actions} {...friends.data} />}
			</WithUserEntry>
		)}
	</WithFriends>
);

const mapStateToProps = (state: IApplicationState, props: IUserEntryProps) => ({
	profile: selectProfile(state.data.profiles, props.alias),
	message: selectLastMessage(state.data.messages, props.alias),
});

export const UserEntry = connect(mapStateToProps)(EnhancedComponent as any);
