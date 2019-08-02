import * as React from 'react';
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

export class LoadingScreen extends React.Component<ILoadingScreenProps, ILoadingScreenState> {
	public static getDerivedStateFromProps(props: ILoadingScreenProps) {
		let count = 0;
		let message = 'login';
		Object.values(props.loading).map((value) => value && count++);

		switch (count) {
			case 1:
				message = 'nodes';
				break;
			case 2:
				message = 'profiles';
				break;
			case 3:
				message = 'posts';
				break;
			default:
				break;
		}

		return {
			progress: count * 25,
			message,
		};
	}

	public state = {
		progress: 0,
		message: '',
	};

	public render() {
		const { dictionary } = this.props;
		const { progress, message } = this.state;

		return (
			<SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
				<Header logo={true} />
				<View style={styles.top}>
					<View style={styles.textContainer}>
						<Text style={styles.text}>{dictionary.screens.loading[message]}</Text>
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
	}
}
