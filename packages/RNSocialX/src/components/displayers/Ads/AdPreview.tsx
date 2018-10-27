import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { IAd } from '../../../types';
import styles from './AdPreview.style';

interface IAdActions {
	onEditAd?: () => void;
}

interface IAdProps extends IAd, IAdActions {}

export const AdPreview: React.SFC<IAdProps> = ({ url, title, description, editable, onEditAd }) => (
	<View style={styles.card}>
		<Image source={{ uri: url }} style={styles.image} resizeMode="cover" />
		<View style={styles.cardHeader}>
			<Text style={styles.title}>{title}</Text>
			<TouchableOpacity onPress={onEditAd} hitSlop={{ top: 10, bottom: 10, left: 15, right: 10 }}>
				{editable && <Icon name="md-create" style={styles.editIcon} />}
			</TouchableOpacity>
		</View>
		<Text style={styles.description}>{description}</Text>
	</View>
);
