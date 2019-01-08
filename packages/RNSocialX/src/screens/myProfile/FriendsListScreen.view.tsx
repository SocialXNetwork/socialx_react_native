import * as React from 'react';
import { View } from 'react-native';

import { Header, HeaderButton, SearchInput, UserEntries } from '../../components';
import { ITranslatedProps } from '../../types';
import styles from './FriendsListScreen.style';

interface IFriendsListScreenViewProps extends ITranslatedProps {
	aliases: string[];
	term: string;
	onChangeText: (term: string) => void;
	onGoBack: () => void;
}

export const FriendsListScreenView: React.SFC<IFriendsListScreenViewProps> = ({
	aliases,
	term,
	onChangeText,
	onGoBack,
	getText,
}) => (
	<View style={styles.container}>
		<Header
			title={getText('friends.screen.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<View style={styles.input}>
			<SearchInput cancel={false} term={term} autoFocus={false} onChangeText={onChangeText} />
		</View>
		<View style={styles.friends}>
			<UserEntries aliases={aliases} onEntryPress={() => undefined} />
		</View>
	</View>
);
