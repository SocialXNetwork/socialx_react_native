import React from 'react';
import { Text, View } from 'react-native';

import { UserEntry } from '../';
import { ITranslatedProps, IUserEntry } from '../../types';

import styles from './SuggestedSearches.style';

interface ISuggestedProps extends ITranslatedProps {
	items: IUserEntry[];
	onResultPress: (result: IUserEntry) => void;
}

export const SuggestedSearches: React.SFC<ISuggestedProps> = ({
	items,
	onResultPress,
	getText,
}) => {
	if (items && items.length > 0) {
		const rows = items.map((item: any) => (
			<UserEntry entry={item} key={item.userId} onPress={onResultPress} />
		));

		return (
			<View style={styles.container}>
				<Text style={styles.title}>{getText('search.suggested')}</Text>
				{rows}
			</View>
		);
	}

	return null;
};
