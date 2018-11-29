import React from 'react';
import { FlatList, View } from 'react-native';

import { Loader, UserEntry } from '../../components';

import styles from './UserEntries.style';

interface IUserEntriesProps {
	entryIds: string[];
	onEntryPress: (alias: string) => void;
	onLoadMore?: () => void;
	hasMore?: boolean;
}

export const UserEntries: React.SFC<IUserEntriesProps> = ({ entryIds, onEntryPress, hasMore }) => (
	<View style={styles.container}>
		<FlatList
			data={entryIds}
			renderItem={({ item }) => <UserEntry id={item} onPress={onEntryPress} />}
			keyboardShouldPersistTaps="handled"
			keyExtractor={(item: string) => item}
			showsVerticalScrollIndicator={false}
			ListFooterComponent={<Loader visible={hasMore || false} />}
		/>
	</View>
);
