import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors, Fonts, Sizes } from '../../../environment/theme';
import { ITranslatedProps, IWallPostComment } from '../../../types';
import { CommentReply } from './';

interface ICommentRepliesProps extends ITranslatedProps {
	replies: IWallPostComment[];
	onCommentReply: (value: boolean) => void;
	onViewUserProfile: (userId: string) => void;
}

export const CommentReplies: React.SFC<ICommentRepliesProps> = ({
	replies,
	onCommentReply,
	onViewUserProfile,
	getText,
}) => {
	if (replies) {
		if (replies.length > 3) {
			const lastReply = replies[replies.length - 1];
			return (
				<View>
					<TouchableOpacity onPress={() => onCommentReply(false)}>
						<Text style={style.viewMoreReplies}>
							{getText(
								'comments.screen.comment.card.view.more',
								replies.length - 1,
							)}
						</Text>
					</TouchableOpacity>
					<CommentReply
						reply={lastReply}
						onCommentReply={onCommentReply}
						onViewUserProfile={onViewUserProfile}
					/>
				</View>
			);
		} else if (replies.length > 0) {
			return (
				<View>
					{replies.map((reply) => (
						<CommentReply
							key={reply.id}
							reply={reply}
							onCommentReply={onCommentReply}
							onViewUserProfile={onViewUserProfile}
						/>
					))}
				</View>
			);
		}
	}
	return null;
};

const style: any = {
	viewMoreReplies: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postFullName,
		paddingVertical: Sizes.smartHorizontalScale(5),
	},
};

const styles = StyleSheet.create(style);
