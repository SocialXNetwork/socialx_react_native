import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Header, HeaderButton, UserEntries } from '../../components';
import { Colors, Sizes } from '../../environment/theme';
import { IDictionary } from '../../types';

interface ILikesScreenViewProps extends IDictionary {
	likeIds: string[];
	onViewUserProfile: (alias: string) => void;
	onGoBack: () => void;
}

export const LikesScreenView: React.SFC<ILikesScreenViewProps> = ({
	likeIds,
	onViewUserProfile,
	onGoBack,
	dictionary,
}) => (
	<View style={styles.container}>
		<Header
			title={dictionary.screens.likes.title}
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
