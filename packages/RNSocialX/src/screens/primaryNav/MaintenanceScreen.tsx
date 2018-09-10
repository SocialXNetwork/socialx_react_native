import LottieView from 'lottie-react-native';
import * as React from 'react';
import {Text, View} from 'react-native';

import styles, {animations} from './MaintenanceScreen.style';

export class MaintenanceScreen extends React.Component {
	public render() {
		return (
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
				<Text style={styles.text}>App currently under maintenance,</Text>
				<Text style={styles.text}> try again later!</Text>
			</View>
		);
	}
}
