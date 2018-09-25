import React from 'react';
import {Text, View} from 'react-native';

import {SearchResultsItem} from '../';
import {ISearchResultData} from '../../types';
import styles from './SuggestedSearches.style';

interface ISuggestedProps {
	items: ISearchResultData[];
}

export const SuggestedSearches: React.SFC<ISuggestedProps> = ({items}) => {
	if (items && items.length > 0) {
		const rows = items.map((item: any) => <SearchResultsItem item={item} key={item.userId} />);

		return (
			<View style={styles.container}>
				<Text style={styles.title}>Suggested</Text>
				{rows}
			</View>
		);
	}

	return null;
};
