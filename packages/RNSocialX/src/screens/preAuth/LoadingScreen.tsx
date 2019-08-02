import React, { SFC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Header, ProgressBar } from '../../components';
import { IDictionary } from '../../types';

import styles from './LoadingScreen.style';

interface ILoadingScreenProps extends IDictionary {
	loading: {
		accountLoaded: boolean;
		profileLoaded: boolean;
		friendsLoaded: boolean;
		postsLoaded: boolean;
	};
}

interface ILoadingScreenState {
	progress: number;
	message: string;
}

export const LoadingScreen: SFC<ILoadingScreenProps> = (props) => {
	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState('');

	useEffect(() => {
		let count = 0;
		let newMessage = 'login';
		Object.values(props.loading).map((value) => value && count++);

		switch (count) {
			case 1:
				newMessage = 'nodes';
				break;
			case 2:
				newMessage = 'profiles';
				break;
			case 3:
				newMessage = 'posts';
				break;
			default:
				break;
		}

		setProgress(count * 25);
		setMessage(newMessage);
	}, [props]);

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
			<Header logo={true} />
			<View style={styles.top}>
				<View style={styles.textContainer}>
					<Text style={styles.text}>{props.dictionary.screens.loading[message]}</Text>
					<Text style={styles.text}>{progress}%</Text>
				</View>
				<ProgressBar progress={progress} />
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
};
