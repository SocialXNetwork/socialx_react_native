import * as React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { RichText } from '../..';

import { IComment } from '../../../store/data/comments';
import { IApplicationState, selectComment } from '../../../store/selectors';

import styles from './Comment.style';

interface ICommentProps {
	commentId: string;
	comment: IComment;
	onUserPress: (userId: string) => void;
	onCommentPress: () => void;
}

export const Component: React.SFC<ICommentProps> = ({ comment, onUserPress, onCommentPress }) => (
	<Text style={styles.container} numberOfLines={2}>
		<Text
			style={styles.user}
			onPress={() => onUserPress(comment.owner.alias)}
			suppressHighlighting={true}
		>
			{comment.owner.alias}
		</Text>
		<RichText
			style={styles.text}
			childrenProps={{
				onPress: onCommentPress,
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
			{'  ' + comment.text}
		</RichText>
	</Text>
);

const mapStateToProps = (state: IApplicationState, props: ICommentProps) => ({
	comment: selectComment(state, props),
});

export const Comment = connect(mapStateToProps)(Component as any) as any;
