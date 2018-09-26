import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AvatarImage } from '../';
import { ISearchResultData, SearchResultKind } from '../../types';
import styles from './SearchResultsItem.style';

interface ISearchResultsItemProps {
	item: ISearchResultData;
	onAddFriend: (userId: string) => void;
	onResultPress: (result: ISearchResultData) => void;
}

export const SearchResultsItem: React.SFC<ISearchResultsItemProps> = ({
	item,
	onAddFriend = () => {
		/**/
	},
	onResultPress = () => {
		/**/
	},
}) => {
	let icon = 'account-plus';
	if (item.relationship === SearchResultKind.Friend) {
		icon = 'account-check';
	}

	return (
		<TouchableOpacity
			onPress={() => onResultPress(item)}
			activeOpacity={1}
			style={styles.card}
		>
			<AvatarImage image={{ uri: item.avatarURL }} style={styles.avatar} />
			<View style={styles.textContainer}>
				<Text style={styles.name}>{item.fullName}</Text>
				<Text style={styles.text}>{item.location}</Text>
			</View>
			<TouchableOpacity
				onPress={() => onAddFriend(item.userId)}
				style={styles.iconContainer}
			>
				<Icon name={icon} style={styles.icon} />
			</TouchableOpacity>
		</TouchableOpacity>
	);
};
