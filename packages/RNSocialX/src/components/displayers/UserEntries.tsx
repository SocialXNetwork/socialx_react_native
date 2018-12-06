import React from 'react';
import { FlatList, View } from 'react-native';

import { Loader, UserEntry } from '../../components';

import styles from './UserEntries.style';

interface IUserEntriesProps {
	aliases: string[];
	hasMore?: boolean;
	onEntryPress: (alias: string) => void;
	onLoadMore?: () => void;
}

export const UserEntries: React.SFC<IUserEntriesProps> = ({ aliases, onEntryPress, hasMore }) => (
	<View style={styles.container}>
		<FlatList
			data={aliases}
			renderItem={({ item }) => <UserEntry alias={item} onPress={() => onEntryPress(item)} />}
			keyboardShouldPersistTaps="handled"
			keyExtractor={(item: string) => item}
			showsVerticalScrollIndicator={false}
			ListFooterComponent={<Loader visible={hasMore || false} />}
		/>
	</View>
);
