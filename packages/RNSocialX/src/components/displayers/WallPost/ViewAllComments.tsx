import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { Colors, Fonts, Sizes } from '../../../environment/theme';
import { IApplicationState } from '../../../store/selectors';
import { ITranslatedProps } from '../../../types';

interface IViewAllCommentsProps extends ITranslatedProps {
	commentIds: string[];
	onCommentPress: () => void;
}

interface IProps extends IViewAllCommentsProps {
	count: number;
}

export const Component: React.SFC<IProps> = ({ count, onCommentPress, getText }) => {
	if (count > 0) {
		return (
			<TouchableOpacity style={styles.container} onPress={onCommentPress}>
				<Text style={styles.text}>
					{count > 1
						? getText('post.card.view.multiple.comments', count)
						: getText('post.card.view.comment')}
				</Text>
			</TouchableOpacity>
		);
	}

	return null;
};

const style: any = {
	container: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		paddingTop: Sizes.smartVerticalScale(5),
		paddingBottom: Sizes.smartVerticalScale(2.5),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.grayText,
	},
};

const styles = StyleSheet.create(style);

const mapStateToProps = (state: IApplicationState, props: IViewAllCommentsProps) => {
	let count = 0;

	for (const id of props.commentIds) {
		if (state.data.comments.comments[id]) {
			count++;
		}
	}

	return { count };
};

export const ViewAllComments = connect(mapStateToProps)(Component);
