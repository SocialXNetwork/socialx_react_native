import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Header, UserEntries } from '../../components';
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
		<Header title={dictionary.screens.likes.title} back={true} onPressBack={onGoBack} />
		<View style={styles.list}>
			<UserEntries aliases={likeIds} friends={true} onEntryPress={onViewUserProfile} />
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	list: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		paddingVertical: Sizes.smartVerticalScale(10),
	},
});
