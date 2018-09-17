/**
 * TODO list:
 * 1. Nothing showing from container with style actionsContainer?
 */

import moment from 'moment';
import * as React from 'react';
import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';

import {AvatarImage} from '../../';
import {AnimatedText} from '../../../environment/theme';
import {ITranslatedProps, IWallPostComment} from '../../../types';
import {CommentLikes, CommentReplies, ReplyButton} from './';
import styles from './CommentCard.style';

const PULSATE_PERIOD = 700;

interface ICommentCardProps extends ITranslatedProps {
	comment: IWallPostComment;
	onCommentLike: () => void;
	onCommentReply: (startReply: boolean) => void;
	isReply: boolean;
	onViewUserProfile: (userId: string) => void;
	requestingLike: boolean;
	onShowOptionsMenu: () => void;
	onCommentContainerWidthChange: (value: number) => void;
	commentLikesPosition: StyleProp<ViewStyle>;
}

export class CommentCard extends React.Component<ICommentCardProps> {
	public static defaultProps = {
		isReply: false,
	};

	public render() {
		const {
			comment,
			isReply,
			onViewUserProfile,
			onCommentReply,
			onCommentLike,
			requestingLike,
			onShowOptionsMenu,
			onCommentContainerWidthChange,
			commentLikesPosition,
			getText,
		} = this.props;

		const {likedByMe, numberOfLikes, replies, text, user, timestamp} = comment;
		const commentTimestamp = moment(timestamp).fromNow();

		const animatedText: React.RefObject<any> = React.createRef();

		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={() => onViewUserProfile(user.id)}>
					<AvatarImage image={user.avatarURL} style={styles.avatarImage} />
				</TouchableOpacity>
				<View style={styles.rightContainer}>
					<View>
						<TouchableOpacity style={styles.commentBackground} onLongPress={onShowOptionsMenu}>
							<Text style={styles.userFullName} onPress={() => onViewUserProfile(user.id)}>
								{user.fullName}
							</Text>
							<Text style={styles.commentText}>{text}</Text>
						</TouchableOpacity>
						{numberOfLikes > 0 && (
							<CommentLikes numberOfLikes={numberOfLikes} commentLikesPosition={commentLikesPosition} />
						)}
					</View>
					<View
						style={styles.actionsContainer}
						onLayout={(event) => onCommentContainerWidthChange(event.nativeEvent.layout.width)}
					>
						<Text style={styles.timestamp}>{commentTimestamp}</Text>
						<TouchableOpacity
							onPress={() => this.onCommentLikeHandler(onCommentLike, requestingLike, animatedText)}
							disabled={requestingLike}
						>
							<AnimatedText ref={animatedText} style={styles.actionButtonText}>
								{likedByMe ? getText('comments.screen.actions.unlike') : getText('comments.screen.actions.like')}
							</AnimatedText>
						</TouchableOpacity>
						{!isReply && (
							<ReplyButton onCommentReply={onCommentReply} label={getText('comments.screen.actions.reply')} />
						)}
					</View>
					{!isReply && (
						<CommentReplies
							replies={replies}
							onViewUserProfile={onViewUserProfile}
							onCommentReply={onCommentReply}
							getText={getText}
						/>
					)}
				</View>
			</View>
		);
	}

	private onCommentLikeHandler = async (
		onCommentLike: () => void,
		requestingLike: boolean,
		animatedText: React.RefObject<any>,
	) => {
		onCommentLike();
		await animatedText.current.animate('pulsate', PULSATE_PERIOD);
		this.onAnimationEndHandler(requestingLike, animatedText);
	};

	private onAnimationEndHandler = async (requestingLike: boolean, animatedText: React.RefObject<any>) => {
		if (requestingLike) {
			await animatedText.current.animate('pulsate', PULSATE_PERIOD);
			this.onAnimationEndHandler(requestingLike, animatedText);
		}
	};
}
