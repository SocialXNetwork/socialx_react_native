import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors, Fonts, Sizes } from '../../environment/theme';
import { ITranslatedProps } from '../../types';

interface IFeedWithNoPostsProps extends ITranslatedProps {
	loading: boolean;
}

export const FeedWithNoPosts: React.SFC<IFeedWithNoPostsProps> = ({ loading, getText }) => {
	if (!loading) {
		return (
			<View style={styles.container}>
				<Icon name="md-film" size={Sizes.smartHorizontalScale(120)} color={Colors.geyser} />
				<Text style={styles.text}>{getText('feed.screen.no.posts')}</Text>
			</View>
		);
	}

	return null;
};

const styles = StyleSheet.create({
	container: {
		paddingTop: Sizes.smartVerticalScale(30),
		alignItems: 'center',
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.paleSky,
		paddingTop: Sizes.smartVerticalScale(20),
		textAlign: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
});
