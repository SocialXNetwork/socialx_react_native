import moment from 'moment';
import * as React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { connect } from 'react-redux';

import {
	IWithDataShapeEnhancedProps,
	WithDataShape,
	WithNavigationHandlers,
} from '../../../enhancers/intermediary';

import { IComment as IStateComment } from '../../../store/data/comments';
import { IApplicationState, selectComment } from '../../../store/selectors';

import { AvatarImage, RichText } from '../../';
import { IComment, INavigationProps, ITranslatedProps } from '../../../types';
import { CommentLikes } from './';

import styles from './CommentCard.style';

const TEXT_LENGTH_TRESHOLD = 15;

interface ICommentCardProps extends INavigationProps, ITranslatedProps {
	commentId: string;
	comment: IStateComment;
	alias: string;
	pub: string;
	onLikeComment: (alias: string, pub: string, liked: boolean, commentId: string) => void;
	onUserPress: (userId: string) => void;
	onViewLikes: (likeIds: string[]) => void;
	onShowOptionsMenu: (comment: IComment) => void;
}

type IProps = ICommentCardProps & IWithDataShapeEnhancedProps;

interface IState {
	commentLikesPosition: StyleProp<ViewStyle>;
}

class Component extends React.Component<IProps, IState> {
	public state = {
		commentLikesPosition: {
			bottom: -18,
			right: 0,
		},
	};

	public componentDidMount() {
		if (this.props.shapedComment && this.props.shapedComment.text.length < TEXT_LENGTH_TRESHOLD) {
			this.setState({
				commentLikesPosition: {
					bottom: 10,
					right: -30,
				},
			});
		}
	}

	public render() {
		const { shapedComment, onUserPress, onViewLikes, onShowOptionsMenu, getText } = this.props;

		if (shapedComment) {
			const { text, user, timestamp, likeIds, likedByCurrentUser } = shapedComment!;
			const commentTimestamp = moment(timestamp).fromNow();

			return (
				<View style={styles.container}>
					<TouchableOpacity onPress={() => onUserPress(user.userId)}>
						<AvatarImage image={user.avatar} style={styles.avatarImage} />
					</TouchableOpacity>
					<View style={styles.rightContainer}>
						<View>
							<TouchableOpacity
								style={styles.commentBackground}
								onPress={() => onShowOptionsMenu(shapedComment!)}
							>
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
							{likeIds.length > 0 && (
								<CommentLikes
									numberOfLikes={likeIds.length}
									commentLikesPosition={this.state.commentLikesPosition}
									onViewLikes={() => onViewLikes(likeIds)}
								/>
							)}
						</View>
						<View style={styles.actionsContainer}>
							<Text style={styles.timestamp}>{commentTimestamp}</Text>
							<TouchableOpacity onPress={this.onCommentLikeHandler}>
								<Text style={styles.actionButtonText}>
									{likedByCurrentUser
										? getText('comments.screen.actions.unlike')
										: getText('comments.screen.actions.like')}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			);
		}

		return null;
	}

	private onCommentLikeHandler = () => {
		const { shapedComment, alias, pub, onLikeComment } = this.props;
		const { commentId, likedByCurrentUser } = shapedComment!;

		onLikeComment(alias, pub, likedByCurrentUser, commentId);
	};
}

const EnhancedComponent: React.SFC<IProps> = (props) => (
	<WithNavigationHandlers navigation={props.navigation}>
		{({ actions }) => (
			<WithDataShape comment={props.comment}>
				{({ shapedComment }) => (
					<Component {...props} shapedComment={shapedComment} onViewLikes={actions.onViewLikes} />
				)}
			</WithDataShape>
		)}
	</WithNavigationHandlers>
);

const mapStateToProps = (state: IApplicationState, props: ICommentCardProps) => ({
	comment: selectComment(state, props),
});

export const CommentCard = connect(mapStateToProps)(EnhancedComponent as any) as any;
