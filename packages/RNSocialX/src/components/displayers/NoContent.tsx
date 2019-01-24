import React from 'react';
import { Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { IDictionary } from '../../types';
import styles from './NoContent.style';

interface INoContentProps extends IDictionary {
	posts?: boolean;
	gallery?: boolean;
	messages?: boolean;
	owner?: boolean;
}

export const NoContent: React.SFC<INoContentProps> = ({
	owner = false,
	gallery,
	posts,
	messages,
	dictionary,
}) => (
	<View style={styles.container}>
		{gallery && (
			<React.Fragment>
				<FontAwesome name="th" style={styles.icon} />
				<Text style={styles.text}>
					{owner ? dictionary.screens.myProfile.gallery : dictionary.screens.userProfile.gallery}
				</Text>
			</React.Fragment>
		)}
		{posts && (
			<React.Fragment>
				<FontAwesome name="th-list" style={styles.icon} />
				<Text style={styles.text}>
					{owner ? dictionary.screens.myProfile.posts : dictionary.screens.userProfile.posts}
				</Text>
			</React.Fragment>
		)}
		{messages && (
			<React.Fragment>
				<Ionicon name="ios-chatboxes" style={styles.icon} />
				<Text style={styles.text}>{dictionary.screens.messages.empty}</Text>
			</React.Fragment>
		)}
	</View>
);
