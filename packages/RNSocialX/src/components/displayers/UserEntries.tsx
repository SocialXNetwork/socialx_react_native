import React from 'react';
import { FlatList } from 'react-native';

import { UserEntry } from '../../components';

interface IUserEntriesProps {
	aliases: string[];
	scroll?: boolean;
	onEntryPress: (alias: string) => void;
}

export const UserEntries: React.SFC<IUserEntriesProps> = ({
	aliases,
	scroll = true,
	onEntryPress,
}) => (
	<FlatList
		data={aliases}
		renderItem={({ item }) => <UserEntry alias={item} onPress={() => onEntryPress(item)} />}
		keyboardShouldPersistTaps="handled"
		keyExtractor={(item: string) => item}
		showsVerticalScrollIndicator={false}
		scrollEnabled={scroll}
	/>
);
