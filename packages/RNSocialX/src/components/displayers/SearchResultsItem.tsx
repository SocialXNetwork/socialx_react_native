import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AvatarImage } from '../';
import { ISearchResultData } from '../../types';

import styles from './SearchResultsItem.style';

interface ISearchResultsItemProps {
	item: ISearchResultData;
	onResultPress: (result: ISearchResultData) => void;
}

export const SearchResultsItem: React.SFC<ISearchResultsItemProps> = ({ item, onResultPress }) => (
	<TouchableOpacity onPress={() => onResultPress(item)} activeOpacity={1} style={styles.card}>
		<AvatarImage image={item.avatar} style={styles.avatar} />
		<View style={styles.textContainer}>
			<Text style={styles.name}>{item.fullName}</Text>
			{item.location.length > 0 && <Text style={styles.text}>{item.location}</Text>}
			{item.location.length === 0 && <Text style={styles.userName}>@{item.userName}</Text>}
		</View>
	</TouchableOpacity>
);
