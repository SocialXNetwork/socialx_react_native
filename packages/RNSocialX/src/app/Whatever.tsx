import _ from 'lodash';
import * as React from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { DataProvider } from 'recyclerlistview';

import { Header, PrimaryButton, ProfilePhotoGrid } from '../components';
import { OS_TYPES } from '../environment/consts';
import { getTextMock } from '../mocks';

import { Colors } from '../environment/theme';
import { IMedia } from '../types';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface IProps {}

interface IState {
	dataProvider: DataProvider;
	media: IMedia[];
}

export class Whatever extends React.Component<IProps, IState> {
	private lastLoadedIndex: number = 0;
	private hashes: string[];

	constructor(props: IProps) {
		super(props);
		this.hashes = [
			'QmPKTuijqJFycUhk6Jca9heeJ5pe9M9R8rtbujBHumyQ6p',
			'QmQ6WMXVKpj3HfBSzNLupK2sYCvxTpfy7jzf9ftSPZnAuW',
			'QmTxuZ21ZnjpvGoJNYQ1iw2kiK77BESFaN9y235XBSTsMM',
			'QmbMw2RxHdanpa6PJEzjcQ31Q4L33K4Te5eSoXMmt86BgE',
			'QmWH8u2epBTXu8Eerw2XP6cqNjcDe596UT7LpubDuaKsWn',
		];

		this.state = {
			dataProvider: new DataProvider((r1, r2) => {
				return r1 !== r2;
			}).cloneWithRows([{ id: 'aaaaaaaaaa' }]),
			media: new Array(5).fill(0).map(
				(o, index) =>
					({
						size: 13855,
						hash: _.sample(this.hashes)!,
						type: {
							key: 'image',
							name: 'Photo',
							category: 'Photography',
						},
						extension: 'image/png',
					} as any),
			),
		};
	}

	public componentDidMount() {
		this.loadPhotos();
	}

	public componentDidUpdate(prevProps: IProps, prevState: IState) {
		if (prevState.media.length !== this.state.media.length) {
			this.refreshGrid();
		}
	}

	public render() {
		return (
			<View style={{ flex: 1 }}>
				<Header logo={true} />
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					onScroll={this.loadPhotos}
					scrollEventThrottle={200}
				>
					<View style={{ flex: 1 }}>
						<ProfilePhotoGrid
							dataProvider={this.state.dataProvider}
							scrollEnabled={false}
							onViewMedia={() => undefined}
							getText={getTextMock}
						/>
						{Platform.OS === OS_TYPES.IOS && <View style={styles.spacer} />}
					</View>
				</ScrollView>
				<View style={{ flexDirection: 'row', padding: 10 }}>
					<PrimaryButton label="Add" width="50%" onPress={() => this.onAdd(1)} />
					<PrimaryButton label="Remove" width="50%" onPress={() => this.onRemove(1)} />
				</View>
			</View>
		);
	}

	private onAdd = (count: number) => {
		const media: IMedia[] = this.state.media.slice();

		for (let i = 0; i < count; i++) {
			media.push({
				size: 13855,
				hash: _.sample(this.hashes)!,
				type: {
					key: 'image',
					name: 'Photo',
					category: 'Photography',
				},
				extension: 'image/png',
			});
		}

		this.setState({
			media,
		});
	};

	private onRemove = (count: number) => {
		const media: IMedia[] = this.state.media.slice();
		for (let i = 0; i < count; i++) {
			media.splice(1, 1);
		}

		this.setState({
			media,
		});
	};

	private refreshGrid = () => {
		const { dataProvider, media } = this.state;

		const loadedMedia = dataProvider.getAllData();
		const allMedia = [loadedMedia[0], ...media];

		this.setState({ dataProvider: dataProvider.cloneWithRows(allMedia) });
		this.lastLoadedIndex = allMedia.length - 1;
	};

	private loadPhotos = () => {
		const { dataProvider, media } = this.state;

		if (this.lastLoadedIndex < media.length) {
			const endIndex = this.lastLoadedIndex + 21;
			const loadedMedia = dataProvider.getAllData();
			const newMedia = media.slice(this.lastLoadedIndex, endIndex);
			const allMedia = [...loadedMedia, ...newMedia];

			this.setState({
				dataProvider: dataProvider.cloneWithRows(allMedia),
			});
			this.lastLoadedIndex = allMedia.length - 1;
		}
	};
}

const styles = StyleSheet.create({
	spacer: {
		backgroundColor: Colors.white,
		height: SCREEN_HEIGHT,
		position: 'absolute',
		bottom: -SCREEN_HEIGHT,
		left: 0,
		right: 0,
	},
});
