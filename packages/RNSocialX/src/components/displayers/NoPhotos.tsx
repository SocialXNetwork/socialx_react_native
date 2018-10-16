import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ITranslatedProps } from '../../types';

import styles from './NoPhotos.style';

interface INoPhotosProps extends ITranslatedProps {
	owner: boolean;
}

export const NoPhotos: React.SFC<INoPhotosProps> = ({
	owner = false,
	getText,
}) => (
	<View style={styles.container}>
		<Icon name="th" style={styles.icon} />
		<Text style={styles.text}>
			{owner
				? getText('my.profile.screen.empty.gallery')
				: getText('user.profile.screen.empty.gallery')}
		</Text>
	</View>
);
