import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Sizes } from '../../../environment/theme';
import { Comment } from './';

interface ITopCommentsProps {
	commentIds: string[];
	onUserPress: (alias: string) => void;
	onCommentPress: () => void;
}

export const TopComments: React.SFC<ITopCommentsProps> = ({
	commentIds = [],
	onUserPress,
	onCommentPress,
}) => (
	<React.Fragment>
		{commentIds.length > 0 && (
			<View style={styles.container}>
				{commentIds.map((id) => (
					<Comment
						commentId={id}
						onUserPress={onUserPress}
						onCommentPress={onCommentPress}
						key={id}
					/>
				))}
			</View>
		)}
	</React.Fragment>
);

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
	},
});
