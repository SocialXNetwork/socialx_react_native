import moment from 'moment';
import * as React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { AvatarImage, RichText } from '../../';
import { IComment, ITranslatedProps } from '../../../types';
import { CommentLikes } from './';

import styles from './CommentCard.style';

const TEXT_LENGTH_TRESHOLD = 15;

interface ICommentCardProps extends ITranslatedProps {
	comment: IComment;
	onLikeComment: () => void;
	onViewUserProfile: (userId: string) => void;
	onShowOptionsMenu: () => void;
	likeCommentError: boolean;
}

interface ICommentCardState {
	likes: number;
	likedByCurrentUser: boolean;
	error: boolean;
	disabled: boolean;
	commentLikesPosition: StyleProp<ViewStyle>;
}

export class CommentCard extends React.Component<ICommentCardProps, ICommentCardState> {
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
		likes: this.props.comment.likes.length,
		likedByCurrentUser: this.props.comment.likedByCurrentUser,
		error: false,
		disabled: false,
		commentLikesPosition: {
			bottom: -18,
			right: 0,
		},
	};

	public componentDidMount() {
		if (this.props.comment.text.length < TEXT_LENGTH_TRESHOLD) {
			this.setState({
				commentLikesPosition: {
					bottom: 10,
					right: -30,
				},
			});
		}
	}

	public render() {
		const { comment, onViewUserProfile, onShowOptionsMenu, getText } = this.props;

		const { text, user, timestamp } = comment;
		const commentTimestamp = moment(timestamp).fromNow();

		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={() => onViewUserProfile(user.userId)}>
					<AvatarImage image={user.avatar} style={styles.avatarImage} />
				</TouchableOpacity>
				<View style={styles.rightContainer}>
					<View>
						<TouchableOpacity style={styles.commentBackground} onPress={onShowOptionsMenu}>
							<Text style={styles.userFullName} suppressHighlighting={true}>
								{user.fullName}
							</Text>
							<RichText
								style={styles.commentText}
								childrenProps={{
									suppressHighlighting: true,
								}}
								parse={[
									{
										type: 'hashtag',
										style: styles.hashtag,
										onPress: () => undefined,
									},
									{
										type: 'tags',
										style: styles.tag,
										onPress: () => undefined,
									},
									{
										type: 'url',
										style: styles.url,
										onPress: () => undefined,
									},
								]}
							>
								{text}
							</RichText>
						</TouchableOpacity>
						{this.state.likes > 0 && (
							<CommentLikes
								numberOfLikes={this.state.likes}
								commentLikesPosition={this.state.commentLikesPosition}
							/>
						)}
					</View>
					<View style={styles.actionsContainer}>
						<Text style={styles.timestamp}>{commentTimestamp}</Text>
						<TouchableOpacity onPress={this.onCommentLikeHandler} disabled={this.state.disabled}>
							<Text style={styles.actionButtonText}>
								{this.state.likedByCurrentUser
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
				likes: currentState.likedByCurrentUser ? currentState.likes - 1 : currentState.likes + 1,
				likedByCurrentUser: !currentState.likedByCurrentUser,
				error: false,
			};
		});

		await this.props.onLikeComment();

		if (this.state.error) {
			this.setState({
				disabled: false,
				likes: this.props.comment.likes.length,
				likedByCurrentUser: this.props.comment.likedByCurrentUser,
			});
		} else {
			this.setState({ disabled: false });
		}
	};
}
