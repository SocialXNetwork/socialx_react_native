import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import { IPost } from '../../store/data/posts';
import { IApplicationState, selectPost } from '../../store/selectors';

import { LikeAnimatingButton } from './LikeAnimatingButton';
import styles from './MediaInteractionButtons.style';

interface IMediaInteractionButtonsProps {
	postId: string;
	likedByCurrentUser: boolean;
	onCommentPress: () => void;
	onLikePress: () => void;
}

interface IProps extends IMediaInteractionButtonsProps {
	post: IPost;
}

const Component: React.SFC<IProps> = ({
	post,
	likedByCurrentUser,
	onLikePress,
	onCommentPress,
}) => {
	const numberOfLikes = post.likes.ids.length || 0;
	const numberOfComments = post.comments.length || 0;
	const hasLikesOrComments = numberOfComments > 0 || numberOfLikes > 0;

	return (
		<View style={styles.actionButtons}>
			<View style={styles.likesContainer}>
				<LikeAnimatingButton
					likedByCurrentUser={likedByCurrentUser}
					secondary={true}
					onLikePost={onLikePress}
				/>
				{hasLikesOrComments && numberOfLikes > 0 && (
					<Text style={styles.infoText}>{numberOfLikes}</Text>
				)}
			</View>
			<TouchableOpacity style={styles.commentsContainer} onPress={onCommentPress}>
				<View style={styles.commentsIconContainer}>
					<Icon name="comment-o" style={styles.iconStyle} />
				</View>
				{hasLikesOrComments && numberOfComments > 0 && (
					<Text style={styles.infoText}>{numberOfComments}</Text>
				)}
			</TouchableOpacity>
		</View>
	);
};

const mapStateToProps = (state: IApplicationState, props: IMediaInteractionButtonsProps) => ({
	post: selectPost(state, props),
});

export const MediaInteractionButtons = connect(mapStateToProps)(Component as any) as any;
