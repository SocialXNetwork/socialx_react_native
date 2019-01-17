import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { IDictionary } from '../../types';
import styles from './NoContent.style';

interface INoContentProps extends IDictionary {
	posts?: boolean;
	gallery?: boolean;
	owner?: boolean;
}

export const NoContent: React.SFC<INoContentProps> = ({
	owner = false,
	gallery = false,
	posts = false,
	dictionary,
}) => (
	<View style={styles.container}>
		{gallery && (
			<React.Fragment>
				<Icon name="th" style={styles.icon} />
				<Text style={styles.text}>
					{owner ? dictionary.screens.myProfile.gallery : dictionary.screens.userProfile.gallery}
				</Text>
			</React.Fragment>
		)}
		{posts && (
			<React.Fragment>
				<Icon name="th-list" style={styles.icon} />
				<Text style={styles.text}>
					{owner ? dictionary.screens.myProfile.posts : dictionary.screens.userProfile.posts}
				</Text>
			</React.Fragment>
		)}
	</View>
);
