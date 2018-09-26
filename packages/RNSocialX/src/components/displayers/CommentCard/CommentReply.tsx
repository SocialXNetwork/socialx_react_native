import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AvatarImage } from '../../';
import { IWallPostComment } from '../../../types';

import styles from './CommentReply.style';

interface ICommentReplyProps {
	reply: IWallPostComment;
	onCommentReply: (value: boolean) => void;
	onViewUserProfile: (userId: string) => void;
}

export const CommentReply: React.SFC<ICommentReplyProps> = ({
	reply,
	onViewUserProfile,
	onCommentReply,
}) => (
	<View style={styles.replyEntry}>
		<TouchableOpacity
			style={styles.replyUserContainer}
			onPress={() => onViewUserProfile(reply.user.id)}
		>
			<AvatarImage image={reply.user.avatarURL} style={styles.replyAvatar} />
			<Text numberOfLines={1} style={styles.replyUserFullName}>
				{reply.user.fullName}
			</Text>
		</TouchableOpacity>
		<Text
			numberOfLines={1}
			style={styles.replyText}
			onPress={() => onCommentReply(false)}
		>
			{reply.text}
		</Text>
	</View>
);
