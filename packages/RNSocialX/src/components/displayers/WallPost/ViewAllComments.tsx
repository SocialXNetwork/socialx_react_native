import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { Colors, Fonts, Sizes } from '../../../environment/theme';
import { IApplicationState } from '../../../store/selectors';
import { IDictionary } from '../../../types';

interface IViewAllCommentsProps extends IDictionary {
	commentIds: string[];
	onCommentPress: () => void;
}

interface IProps extends IViewAllCommentsProps {
	count: number;
}

const Component: React.SFC<IProps> = ({ count, onCommentPress, dictionary }) => {
	if (count > 1) {
		const { view, comments } = dictionary.components.displayers.wallPost;

		return (
			<TouchableOpacity style={styles.container} onPress={onCommentPress}>
				<Text style={styles.text}>{view + ' ' + count + ' ' + comments}</Text>
			</TouchableOpacity>
		);
	}

	return null;
};

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

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		paddingTop: Sizes.smartVerticalScale(5),
		paddingBottom: Sizes.smartVerticalScale(2.5),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.dustyGray,
	},
});
