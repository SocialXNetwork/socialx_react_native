import * as React from 'react';
import { View } from 'react-native';

import { SearchHeader, UserEntries } from '../../components';
import { INavigationProps } from '../../types';
import styles from './FriendsListScreen.style';

interface IFriendsListScreenViewProps extends INavigationProps {
	aliases: string[];
	term: string;
	onChangeText: (term: string) => void;
	onViewUserProfile: (alias: string) => void;
}

export const FriendsListScreenView: React.SFC<IFriendsListScreenViewProps> = ({
	aliases,
	term,
	navigation,
	onChangeText,
	onViewUserProfile,
}) => (
	<View style={styles.container}>
		<SearchHeader
			term={term}
			back={true}
			cancel={false}
			navigation={navigation}
			onSearchTermChange={onChangeText}
		/>
		<View style={styles.friends}>
			<UserEntries aliases={aliases} friends={true} onEntryPress={onViewUserProfile} />
		</View>
	</View>
);
