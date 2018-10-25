import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ITranslatedProps } from '../../types';

import styles from './NoContent.style';

interface INoContentProps extends ITranslatedProps {
	posts?: boolean;
	gallery?: boolean;
	owner?: boolean;
}

export const NoContent: React.SFC<INoContentProps> = ({
	owner = false,
	gallery = false,
	posts = false,
	getText,
}) => (
	<View style={styles.container}>
		{gallery && (
			<React.Fragment>
				<Icon name="th" style={styles.icon} />
				<Text style={styles.text}>
					{owner
						? getText('my.profile.screen.empty.gallery')
						: getText('user.profile.screen.empty.gallery')}
				</Text>
			</React.Fragment>
		)}
		{posts && (
			<React.Fragment>
				<Icon name="th-list" style={styles.icon} />
				<Text style={styles.text}>
					{owner
						? getText('my.profile.screen.empty.posts')
						: getText('user.profile.screen.empty.posts')}
				</Text>
			</React.Fragment>
		)}
	</View>
);
