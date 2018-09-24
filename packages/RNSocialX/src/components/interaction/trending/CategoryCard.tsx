import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles from './CategoryCard.style';
import {ICategoryItem} from './TrendingCategoriesCarousel';

interface ICategoryCardProps {
	item: ICategoryItem;
	onCategoryPress: () => void;
	active?: boolean;
}

export const CategoryCard: React.SFC<ICategoryCardProps> = ({item, onCategoryPress, active}) => {
	return (
		<TouchableOpacity activeOpacity={1} style={styles.container} onPress={onCategoryPress}>
			<Text style={styles.name}>{item.name}</Text>
			{active ? <View style={styles.active} /> : null}
		</TouchableOpacity>
	);
};
