import React from 'react';
import { FlatList } from 'react-native';

import { Loader, UserEntry } from '../../components';
import { IUserEntry } from '../../types';

import styles from './UserEntries.style';

interface IUserEntriesProps {
	entries: IUserEntry[];
	onEntryPress: (entry: IUserEntry) => void;
	onLoadMore?: () => void;
	hasMore?: boolean;
}

export const UserEntries: React.SFC<IUserEntriesProps> = ({
	entries,
	onEntryPress,
	onLoadMore,
	hasMore,
}) => (
	<FlatList
		data={entries}
		renderItem={({ item }) => <UserEntry entry={item} onPress={() => onEntryPress(item)} />}
		style={styles.resultsContainer}
		keyboardShouldPersistTaps="handled"
		keyExtractor={(item: IUserEntry) => item.userId}
		// onEndReached={onLoadMore}
		// onEndReachedThreshold={0.5}
		ListFooterComponent={<Loader visible={hasMore || false} />}
	/>
);
