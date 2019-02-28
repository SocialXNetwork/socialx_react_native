import React from 'react';
import { Text, View } from 'react-native';

import { UserEntries } from '../';
import { IDictionary } from '../../types';

import styles from './SuggestedSearches.style';

interface ISuggestedProps extends IDictionary {
	suggestions: string[];
	friends?: boolean;
	onResultPress: (alias: string) => void;
}

export const SuggestedSearches: React.SFC<ISuggestedProps> = ({
	suggestions,
	friends = true,
	dictionary,
	onResultPress,
}) => {
	if (suggestions && suggestions.length > 0) {
		return (
			<View style={styles.container}>
				<React.Fragment>
					<Text style={styles.title}>{dictionary.components.displayers.search.suggested}</Text>
					<UserEntries
						aliases={suggestions}
						friends={friends}
						scroll={false}
						onEntryPress={onResultPress}
					/>
				</React.Fragment>
			</View>
		);
	}

	return null;
};
