import moment from 'moment';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { shapeComment } from '../../../enhancers/helpers';
import { WithNavigationHandlers } from '../../../enhancers/intermediary';

import { IApplicationState, selectComment, selectProfile } from '../../../store/selectors';

import { AvatarImage, RichText } from '../../';
import { IComment, IDictionary, INavigationProps } from '../../../types';
import { CommentLikes } from './';

import styles from './CommentCard.style';
const TEXT_LENGTH_TRESHOLD = 15;

interface ICommentCardProps extends INavigationProps, IDictionary {
	commentId: string;
	alias: string;
	pub: string;
	onLikeComment: (alias: string, pub: string, liked: boolean, commentId: string) => void;
	onUserPress: (alias: string) => void;
	onShowOptionsMenu: (comment: IComment) => void;
}

interface IProps extends ICommentCardProps {
	comment: IComment;
	onViewLikes: (likeIds: string[]) => void;
}

class Component extends React.Component<IProps> {
	public render() {
		if (this.props.comment) {
			const { comment, onUserPress, onViewLikes, onShowOptionsMenu, dictionary } = this.props;
			const { text, owner, timestamp, likeIds, likedByCurrentUser, posting } = comment;
			const commentTimestamp = moment(timestamp).fromNow();

			return (
				<View style={styles.container}>
					<TouchableOpacity onPress={() => onUserPress(owner.alias)}>
						<AvatarImage image={owner.avatar} style={styles.avatarImage} />
					</TouchableOpacity>
					<View style={styles.rightContainer}>
						<View>
							<TouchableOpacity
								style={styles.commentBackground}
								onPress={() => onShowOptionsMenu(comment)}
							>
								<Text style={styles.userFullName} suppressHighlighting={true}>
									{owner.fullName}
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
									altPosition={text.length < TEXT_LENGTH_TRESHOLD}
									onViewLikes={() => onViewLikes(likeIds)}
								/>
							)}
						</View>
						{posting ? (
							<Text style={styles.timestamp}>
								{dictionary.components.displayers.wallPost.creating}
							</Text>
						) : (
							<View style={styles.actionsContainer}>
								<Text style={styles.timestamp}>{commentTimestamp}</Text>
								<TouchableOpacity onPress={this.onCommentLikeHandler}>
									<Text style={styles.actionButtonText}>
										{likedByCurrentUser
											? dictionary.components.displayers.wallPost.unlike
											: dictionary.components.displayers.wallPost.like}
									</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
				</View>
			);
		}

		return null;
	}

	private onCommentLikeHandler = () => {
		const { comment, alias, pub, onLikeComment } = this.props;
		const { commentId, likedByCurrentUser } = comment;

		onLikeComment(alias, pub, likedByCurrentUser, commentId);
	};
}

const EnhancedComponent: React.SFC<IProps> = (props) => (
	<WithNavigationHandlers>
		{({ actions }) => <Component {...props} onViewLikes={actions.onViewLikes} />}
	</WithNavigationHandlers>
);

const mapStateToProps = (state: IApplicationState, props: ICommentCardProps) => {
	const storeComment = selectComment(state.data.comments, props.commentId);

	if (storeComment) {
		const profile = selectProfile(state.data.profiles, storeComment.owner.alias);
		const currentUserAlias = state.auth.database.gun!.alias!;

		return {
			comment: shapeComment(storeComment, profile, currentUserAlias),
		};
	}

	return {
		comment: undefined,
	};
};

export const CommentCard = connect(mapStateToProps)(EnhancedComponent as any);
