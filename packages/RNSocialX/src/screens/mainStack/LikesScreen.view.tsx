import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Header, HeaderButton, UserEntries } from '../../components';
import { Colors } from '../../environment/theme';
import { ILike, ITranslatedProps } from '../../types';

interface ILikesScreenViewProps extends ITranslatedProps {
	likes: ILike[];
	onGoBack: () => void;
}

export const LikesScreenView: React.SFC<ILikesScreenViewProps> = ({ likes, onGoBack, getText }) => (
	<View style={{ flex: 1, backgroundColor: 'white' }}>
		<Header
			title={getText('likes.screen.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<View style={styles.container}>
			<UserEntries entries={likes} onEntryPress={() => undefined} />
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
});
