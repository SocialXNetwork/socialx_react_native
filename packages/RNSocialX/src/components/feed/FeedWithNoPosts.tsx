import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ButtonSizes, PrimaryButton } from '../../components';
import { Colors, Fonts, Sizes } from '../../environment/theme';
import { ITranslatedProps } from '../../types';

interface IFeedWithNoPosts extends ITranslatedProps {
	onShowNewWallPostPress: () => void;
}

export const FeedWithNoPosts: React.SFC<IFeedWithNoPosts> = ({
	onShowNewWallPostPress,
	getText,
}) => (
	<View style={styles.container}>
		<Icon
			name="md-film"
			size={Sizes.smartHorizontalScale(120)}
			color={Colors.geyser}
		/>
		<Text style={styles.text}>{getText('feed.screen.no.posts')}</Text>
		<View style={styles.button}>
			<PrimaryButton
				label={getText('feed.screen.no.posts.create')}
				size={ButtonSizes.Small}
				onPress={onShowNewWallPostPress}
			/>
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		paddingTop: Sizes.smartVerticalScale(30),
		alignItems: 'center',
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postText,
		paddingTop: Sizes.smartVerticalScale(20),
		textAlign: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
	button: {
		marginTop: Sizes.smartVerticalScale(20),
	},
});
