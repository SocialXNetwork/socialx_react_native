import React from 'react';
import { Text, View } from 'react-native';

import { SearchResultsItem } from '../';
import { ISearchResultData, ITranslatedProps } from '../../types';

import styles from './SuggestedSearches.style';

interface ISuggestedProps extends ITranslatedProps {
	items: ISearchResultData[];
	onResultPress: (result: ISearchResultData) => void;
}

export const SuggestedSearches: React.SFC<ISuggestedProps> = ({
	items,
	onResultPress,
	getText,
}) => {
	if (items && items.length > 0) {
		const rows = items.map((item: any) => (
			<SearchResultsItem
				item={item}
				key={item.userId}
				onResultPress={onResultPress}
			/>
		));

		// Strange getText bug, check later
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Suggested</Text>
				{rows}
			</View>
		);
	}

	return null;
};
