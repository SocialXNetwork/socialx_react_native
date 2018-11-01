import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Header } from '../../components';

import styles from './LoadingScreen.style';

export const LoadingScreen = () => (
	<SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
		<Header logo={true} />
		<View style={styles.topTabs}>
			<View style={styles.topTab} />
			<View style={styles.topTab} />
		</View>
		<View style={styles.share}>
			<View style={styles.avatar} />
			<View style={styles.shareText} />
		</View>
		<View style={styles.separator} />
		<View style={styles.post}>
			<View style={styles.row}>
				<View style={styles.avatar} />
				<View style={styles.column}>
					<View style={styles.name} />
					<View style={styles.date} />
				</View>
				<View style={styles.dots} />
			</View>
			<View style={styles.longText} />
			<View style={styles.shortText} />
			<View style={styles.row}>
				<View style={styles.smallAvatar} />
				<View style={styles.input} />
			</View>
		</View>
		<View style={styles.separator} />
		<View style={styles.post}>
			<View style={styles.row}>
				<View style={styles.avatar} />
				<View style={styles.column}>
					<View style={styles.name} />
					<View style={styles.date} />
				</View>
				<View style={styles.dots} />
			</View>
			<View style={styles.longText} />
			<View style={styles.shortText} />
			<View style={styles.row}>
				<View style={styles.smallAvatar} />
				<View style={styles.input} />
			</View>
		</View>
		<View style={styles.separator} />
		<View style={styles.post}>
			<View style={styles.row}>
				<View style={styles.avatar} />
				<View style={styles.column}>
					<View style={styles.name} />
					<View style={styles.date} />
				</View>
				<View style={styles.dots} />
			</View>
			<View style={styles.longText} />
			<View style={styles.shortText} />
			<View style={styles.row}>
				<View style={styles.smallAvatar} />
				<View style={styles.input} />
			</View>
		</View>
		<View style={styles.separator} />
		<SafeAreaView style={styles.bottomTabs}>
			<View style={styles.bottomTab} />
			<View style={styles.bottomTab} />
			<View style={styles.bottomTab} />
			<View style={styles.bottomTab} />
			<View style={styles.bottomTab} />
		</SafeAreaView>
	</SafeAreaView>
);
