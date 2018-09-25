import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AvatarImage} from '../';
import {ISearchResultData, SearchResultKind} from '../../types';
import styles from './SearchResultsItem.style';

interface ISearchResultsItemProps {
	item: ISearchResultData;
	onAddFriend: () => void;
	onResultPress: () => void;
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
	if (item.kind === SearchResultKind.Friend) {
		icon = 'account-check';
	}

	return (
		<TouchableOpacity onPress={onResultPress} activeOpacity={1} style={styles.card}>
			<AvatarImage image={{uri: item.avatarURL}} style={styles.avatar} />
			<View style={styles.textContainer}>
				<Text style={styles.name}>{item.fullName}</Text>
				<Text style={styles.text}>{item.location}</Text>
			</View>
			<TouchableOpacity onPress={onAddFriend} style={styles.iconContainer}>
				<Icon name={icon} style={styles.icon} />
			</TouchableOpacity>
		</TouchableOpacity>
	);
};
