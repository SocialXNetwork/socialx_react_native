import React from 'react';
import { Text, View } from 'react-native';

import { SearchResultsItem } from '../';
import { ISearchResultData, ITranslatedProps } from '../../types';
import styles from './SuggestedSearches.style';

interface ISuggestedProps extends ITranslatedProps {
	items: ISearchResultData[];
	onAddFriend: (userId: string) => void;
	onResultPress: (result: ISearchResultData) => void;
}

// Add 'Suggested' to dictionary
export const SuggestedSearches: React.SFC<ISuggestedProps> = ({
	items,
	onAddFriend,
	onResultPress,
	getText,
}) => {
	if (items && items.length > 0) {
		const rows = items.map((item: any) => (
			<SearchResultsItem
				item={item}
				key={item.userId}
				onAddFriend={onAddFriend}
				onResultPress={onResultPress}
			/>
		));

		return (
			<View style={styles.container}>
				<Text style={styles.title}>Suggested</Text>
				{rows}
			</View>
		);
	}

	return null;
};
