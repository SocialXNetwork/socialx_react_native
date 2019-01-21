import React from 'react';
import { FlatList } from 'react-native';

import { UserEntry } from '../../components';

interface IUserEntriesProps {
	aliases: string[];
	friends?: boolean;
	chat?: boolean;
	removable?: boolean;
	scroll?: boolean;
	onEntryPress: (alias: string) => void;
	onRemove?: (alias: string) => void;
}

export const UserEntries: React.SFC<IUserEntriesProps> = ({
	aliases,
	friends = false,
	chat = false,
	removable = false,
	scroll = true,
	onEntryPress,
	onRemove,
}) => (
	<FlatList
		data={aliases}
		renderItem={({ item }) => (
			<UserEntry
				alias={item}
				friends={friends}
				chat={chat}
				removable={removable}
				onPress={() => onEntryPress(item)}
				onRemove={onRemove ? () => onRemove(item) : undefined}
			/>
		)}
		keyboardShouldPersistTaps="handled"
		keyExtractor={(item) => item}
		showsVerticalScrollIndicator={false}
		scrollEnabled={scroll}
	/>
);
