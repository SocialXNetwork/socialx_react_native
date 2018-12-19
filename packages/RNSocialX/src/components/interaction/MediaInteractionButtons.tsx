import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import {
	IApplicationState,
	selectNumberOfPostComments,
	selectNumberOfPostLikes,
} from '../../store/selectors';

import { LikeAnimatingButton } from './LikeAnimatingButton';
import styles from './MediaInteractionButtons.style';

interface IMediaInteractionButtonsProps {
	postId: string;
	likedByCurrentUser: boolean;
	disabled?: boolean;
	onCommentPress: () => void;
	onLikePress: () => void;
}

interface IProps extends IMediaInteractionButtonsProps {
	likes: number;
	comments: number;
}

const Component: React.SFC<IProps> = ({
	likes,
	comments,
	likedByCurrentUser,
	disabled,
	onLikePress,
	onCommentPress,
}) => (
	<View style={styles.container}>
		<View style={styles.likes}>
			<LikeAnimatingButton
				likedByCurrentUser={likedByCurrentUser}
				secondary={true}
				disabled={disabled}
				onLikePost={onLikePress}
			/>
			{likes > 0 && <Text style={styles.text}>{likes}</Text>}
		</View>
		<TouchableOpacity disabled={disabled} onPress={onCommentPress} style={styles.comments}>
			<Icon name="comment-o" style={styles.icon} />
			{comments > 0 && <Text style={styles.text}>{comments}</Text>}
		</TouchableOpacity>
	</View>
);

const mapStateToProps = (state: IApplicationState, props: IMediaInteractionButtonsProps) => ({
	likes: selectNumberOfPostLikes(state, props),
	comments: selectNumberOfPostComments(state, props),
});

export const MediaInteractionButtons = connect(mapStateToProps)(Component as any);
