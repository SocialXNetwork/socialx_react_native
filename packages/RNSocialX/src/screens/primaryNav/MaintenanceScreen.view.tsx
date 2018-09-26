import LottieView from 'lottie-react-native';
import * as React from 'react';
import { Text, View } from 'react-native';

import { ITranslatedProps } from '../../types';
import styles, { animations } from './MaintenanceScreen.style';

interface IMaintenanceScreenViewProps extends ITranslatedProps {}

export const MaintenanceScreenView: React.SFC<IMaintenanceScreenViewProps> = ({
	getText,
}) => (
	<View style={styles.container}>
		<LottieView
			style={styles.icon}
			source={animations.dragon}
			ref={(ani: any) => {
				if (ani) {
					ani.play();
				}
			}}
			loop={true}
		/>
		<Text style={styles.text}>{getText('maintenance.message')}</Text>
	</View>
);
