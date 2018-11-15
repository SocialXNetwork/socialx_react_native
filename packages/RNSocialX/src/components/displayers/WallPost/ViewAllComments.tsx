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
	if (numberOfComments > 2) {
		return (
			<TouchableOpacity style={styles.container} onPress={onCommentPress}>
				<Text style={styles.text}>{getText('post.card.view.all.comments')}</Text>
			</TouchableOpacity>
		);
	}

	return null;
};

const style: any = {
	container: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.grayText,
	},
};

const styles = StyleSheet.create(style);
