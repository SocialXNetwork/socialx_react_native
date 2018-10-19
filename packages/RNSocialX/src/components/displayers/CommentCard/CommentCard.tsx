import moment from 'moment';
import * as React from 'react';
import {
	StyleProp,
	Text,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';

import { AvatarImage } from '../../';
import { ITranslatedProps, IWallPostComment } from '../../../types';
import { CommentLikes } from './';

import styles from './CommentCard.style';

interface ICommentCardProps extends ITranslatedProps {
	comment: IWallPostComment;
	onCommentLike: () => void;
	onViewUserProfile: (userId: string) => void;
	onShowOptionsMenu: () => void;
	onCommentContainerWidthChange: (value: number) => void;
	commentLikesPosition: StyleProp<ViewStyle>;
	likeCommentError: boolean;
}

interface ICommentCardState {
	likes: number;
	likedByMe: boolean;
	error: boolean;
	disabled: boolean;
}

export class CommentCard extends React.Component<
	ICommentCardProps,
	ICommentCardState
> {
	public static getDerivedStateFromProps(
		nextProps: ICommentCardProps,
		currentState: ICommentCardState,
	) {
		if (nextProps.likeCommentError !== currentState.error) {
			return {
				error: true,
			};
		}

		return null;
	}

	public state = {
		likes: this.props.comment.numberOfLikes,
		likedByMe: this.props.comment.likedByMe,
		error: false,
		disabled: false,
	};

	public render() {
		const {
			comment,
			onViewUserProfile,
			onShowOptionsMenu,
			onCommentContainerWidthChange,
			commentLikesPosition,
			getText,
		} = this.props;

		const { text, user, timestamp } = comment;
		const commentTimestamp = moment(timestamp).fromNow();

		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={() => onViewUserProfile(user.userId)}>
					<AvatarImage image={user.avatarURL} style={styles.avatarImage} />
				</TouchableOpacity>
				<View style={styles.rightContainer}>
					<View>
						<TouchableOpacity
							style={styles.commentBackground}
							onLongPress={onShowOptionsMenu}
						>
							<Text
								style={styles.userFullName}
								onPress={() => onViewUserProfile(user.userId)}
							>
								{user.fullName}
							</Text>
							<Text style={styles.commentText}>{text}</Text>
						</TouchableOpacity>
						{this.state.likes > 0 && (
							<CommentLikes
								numberOfLikes={this.state.likes}
								commentLikesPosition={commentLikesPosition}
							/>
						)}
					</View>
					<View
						style={styles.actionsContainer}
						onLayout={(event) =>
							onCommentContainerWidthChange(event.nativeEvent.layout.width)
						}
					>
						<Text style={styles.timestamp}>{commentTimestamp}</Text>
						<TouchableOpacity onPress={this.onCommentLikeHandler}>
							<Text style={styles.actionButtonText}>
								{this.state.likedByMe
									? getText('comments.screen.actions.unlike')
									: getText('comments.screen.actions.like')}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}

	private onCommentLikeHandler = async () => {
		this.setState((currentState) => {
			return {
				disabled: true,
				likes: currentState.likedByMe
					? currentState.likes - 1
					: currentState.likes + 1,
				likedByMe: !currentState.likedByMe,
				error: false,
			};
		});

		await this.props.onCommentLike();

		if (this.state.error) {
			this.setState({
				disabled: false,
				likes: this.props.comment.numberOfLikes,
				likedByMe: this.props.comment.likedByMe,
			});
		} else {
			this.setState({ disabled: false });
		}
	};
}
