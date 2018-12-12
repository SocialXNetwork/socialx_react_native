import * as React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { RichText } from '../..';

import { IWithDataShapeEnhancedProps, WithDataShape } from '../../../enhancers/intermediary';
import { IComment } from '../../../store/data/comments';
import { IApplicationState, selectComment } from '../../../store/selectors';

import styles from './Comment.style';

interface ICommentProps {
	commentId: string;
	onUserPress: (userId: string) => void;
	onCommentPress: () => void;
}

interface IProps extends ICommentProps, IWithDataShapeEnhancedProps {
	comment: IComment;
}

export const Component: React.SFC<IProps> = ({ shapedComment, onUserPress, onCommentPress }) => {
	if (shapedComment) {
		return (
			<Text style={styles.container} numberOfLines={2}>
				<Text
					style={styles.user}
					onPress={() => onUserPress(shapedComment.user.userId)}
					suppressHighlighting={true}
				>
					{shapedComment.user.fullName}
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
					{'  ' + shapedComment.text}
				</RichText>
			</Text>
		);
	}

	return null;
};

const EnhancedComponent: React.SFC<IProps> = (props) => (
	<WithDataShape comment={props.comment}>
		{({ shapedComment }) => <Component {...props} shapedComment={shapedComment} />}
	</WithDataShape>
);

const mapStateToProps = (state: IApplicationState, props: ICommentProps) => ({
	comment: selectComment(state, props),
});

export const Comment = connect(mapStateToProps)(EnhancedComponent as any);
