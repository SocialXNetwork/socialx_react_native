import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Header, HeaderButton, UserEntries } from '../../components';
import { Colors, Sizes } from '../../environment/theme';
import { ITranslatedProps } from '../../types';

interface ILikesScreenViewProps extends ITranslatedProps {
	likeIds: string[];
	onViewUserProfile: (alias: string) => void;
	onGoBack: () => void;
}

export const LikesScreenView: React.SFC<ILikesScreenViewProps> = ({
	likeIds,
	onViewUserProfile,
	onGoBack,
	getText,
}) => (
	<View style={styles.container}>
		<Header
			title={getText('likes.screen.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<View style={styles.list}>
			<UserEntries aliases={likeIds} onEntryPress={onViewUserProfile} />
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	list: {
		paddingVertical: Sizes.smartVerticalScale(16),
		paddingHorizontal: Sizes.smartHorizontalScale(25),
	},
});
