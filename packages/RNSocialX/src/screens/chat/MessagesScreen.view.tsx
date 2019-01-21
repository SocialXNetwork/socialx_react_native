import * as React from 'react';
import { View } from 'react-native';

import { SearchHeader, UserEntries } from '../../components';
import { INavigationProps } from '../../types';

import styles from './MessagesScreen.style';

interface IProps extends INavigationProps {
	term: string;
	aliases: string[];
	onChangeText: (term: string) => void;
	onRemoveMessage: (alias: string) => void;
}

export const MessagesScreenView: React.SFC<IProps> = ({
	term,
	aliases,
	navigation,
	onChangeText,
	onRemoveMessage,
}) => (
	<View style={styles.container}>
		<SearchHeader
			term={term}
			back={true}
			cancel={true}
			navigation={navigation}
			onSearchTermChange={onChangeText}
		/>
		<View style={styles.entries}>
			<UserEntries
				aliases={aliases}
				chat={true}
				removable={true}
				onEntryPress={() => undefined}
				onRemove={onRemoveMessage}
			/>
		</View>
	</View>
);
