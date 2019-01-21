import React from 'react';
import { Text, View } from 'react-native';

import { UserEntries } from '../';
import { ITranslatedProps } from '../../types';

import styles from './SuggestedSearches.style';

interface ISuggestedProps extends ITranslatedProps {
	suggestions: string[];
	onResultPress: (alias: string) => void;
}

export const SuggestedSearches: React.SFC<ISuggestedProps> = ({
	suggestions,
	onResultPress,
	getText,
}) => {
	if (suggestions && suggestions.length > 0) {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{getText('search.suggested')}</Text>
				<UserEntries
					aliases={suggestions}
					friends={true}
					scroll={false}
					onEntryPress={onResultPress}
				/>
			</View>
		);
	}

	return null;
};
