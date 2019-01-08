import * as React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { RichText } from '../..';

import { shapeComment } from '../../../enhancers/helpers';
import { IComment } from '../../../types';

import { IApplicationState, selectComment, selectProfile } from '../../../store/selectors';

import styles from './Comment.style';

interface ICommentProps {
	commentId: string;
	onUserPress: (alias: string) => void;
	onCommentPress: () => void;
}

interface IProps extends ICommentProps {
	comment: IComment;
}

export const Component: React.SFC<IProps> = ({ comment, onUserPress, onCommentPress }) => {
	if (comment) {
		return (
			<Text style={styles.container} numberOfLines={2}>
				<Text
					style={styles.user}
					onPress={() => onUserPress(comment.owner.alias)}
					suppressHighlighting={true}
				>
					{comment.owner.fullName}
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
	}

	return null;
};

const mapStateToProps = (state: IApplicationState, props: ICommentProps) => {
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

export const Comment = connect(mapStateToProps)(Component as any);
