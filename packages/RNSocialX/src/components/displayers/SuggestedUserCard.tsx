import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AvatarImage} from '../';
import styles from './SuggestedUserCard.style';

interface ISuggestedProps {
	items: object[];
}

export const SuggestedUserCard: React.SFC<ISuggestedProps> = ({items}) => {
	if (items && items.length > 0) {
		const rows = items.map((item: any) => {
			const icon = item.friend ? 'account-check' : 'account-plus';
			return (
				<TouchableOpacity activeOpacity={1} style={styles.card} key={item.userId}>
					<AvatarImage image={{uri: item.avatarURL}} style={styles.avatar} />
					<View style={styles.textContainer}>
						<Text style={styles.name}>{item.name}</Text>
						<Text style={styles.text}>Placeholder</Text>
					</View>
					<View style={styles.iconContainer}>
						<Icon name={icon} style={styles.icon} />
					</View>
				</TouchableOpacity>
			);
		});

		return (
			<View style={styles.container}>
				<Text style={styles.title}>Suggested</Text>
				{rows}
			</View>
		);
	}

	return null;
};
