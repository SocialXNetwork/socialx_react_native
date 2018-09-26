import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { ITrendingCategoriesItem } from '../../../types';
import styles from './CategoryCard.style';

interface ICategoryCardProps {
	item: ITrendingCategoriesItem;
	onCategoryPress: () => void;
	active?: boolean;
}

export const CategoryCard: React.SFC<ICategoryCardProps> = ({
	item,
	onCategoryPress,
	active,
}) => {
	return (
		<TouchableOpacity
			activeOpacity={1}
			style={styles.container}
			onPress={onCategoryPress}
		>
			<Image
				source={{ uri: item.url }}
				style={{ width: '100%', height: '100%' }}
			/>
			<Text style={styles.name}>{item.name}</Text>
			{active ? <View style={styles.active} /> : null}
		</TouchableOpacity>
	);
};
