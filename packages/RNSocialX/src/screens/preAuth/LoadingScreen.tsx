import * as React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Header, ProgressBar } from '../../components';
import { ITranslatedProps } from '../../types';

import styles from './LoadingScreen.style';

interface ILoadingScreenProps extends ITranslatedProps {
	loading: {
		progress: number;
		message: string;
	};
}

export const LoadingScreen: React.SFC<ILoadingScreenProps> = ({ loading, getText }) => (
	<SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
		<Header logo={true} />
		<View style={styles.top}>
			<View style={styles.textContainer}>
				<Text style={styles.text}>{getText(`loading.${loading.message}`)}</Text>
				<Text style={styles.text}>{loading.progress}%</Text>
			</View>
			<ProgressBar progress={loading.progress} />
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
		<SafeAreaView style={styles.tabs}>
			<View style={styles.tab} />
			<View style={styles.tab} />
			<View style={styles.tab} />
			<View style={styles.tab} />
			<View style={styles.tab} />
		</SafeAreaView>
	</SafeAreaView>
);
