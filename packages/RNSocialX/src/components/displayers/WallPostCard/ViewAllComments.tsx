import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Colors, Fonts, Sizes } from '../../../environment/theme';
import { ITranslatedProps } from '../../../types';

interface IViewAllCommentsProps extends ITranslatedProps {
	numberOfComments: number;
	onCommentPress: () => void;
}

export const ViewAllComments: React.SFC<IViewAllCommentsProps> = ({
	numberOfComments,
	onCommentPress,
	getText,
}) => {
	if (numberOfComments > 0) {
		return (
			<TouchableOpacity
				style={styles.numCommentsContainer}
				onPress={onCommentPress}
			>
				<Text style={styles.viewAllCommentsText}>
					{getText('post.card.view.all.comments', numberOfComments)}
				</Text>
			</TouchableOpacity>
		);
	}

	return null;
};

const style: any = {
	numCommentsContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	viewAllCommentsText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.grayText,
	},
};

const styles = StyleSheet.create(style);
