import React, { Component, ReactText } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';

import { ITrendingContentItem } from '../../../types';
import styles, { THUMBNAIL_SIZE } from './ContentView.style';

const ViewTypes = {
	IMAGE: 0,
	RIGHT_VIDEO: 1,
	LEFT_VIDEO: 2,
};

interface IContentViewProps {
	item: ITrendingContentItem;
	onItemPress: (postId: string) => void;
}

interface IContentViewState {
	dataProvider: DataProvider;
}

class ContentView extends Component<IContentViewProps, IContentViewState> {
	constructor(props: IContentViewProps) {
		super(props);

		this.state = {
			dataProvider: this.getDataProvider().cloneWithRows(props.item.content),
		};
	}

	public render() {
		return (
			<Animated.View style={{ flex: 1 }}>
				<RecyclerListView
					renderAheadOffset={1500}
					layoutProvider={this.getLayoutProvider()}
					dataProvider={this.state.dataProvider}
					rowRenderer={this.rowRenderer}
					scrollViewProps={{
						showsVerticalScrollIndicator: false,
					}}
				/>
			</Animated.View>
		);
	}

	private rowRenderer = (type: ReactText, data: any) => {
		const { item } = this.props;
		const imageStyle = data.middle ? [styles.image, styles.middle] : styles.image;

		switch (type) {
			case ViewTypes.IMAGE:
				return (
					<TouchableOpacity
						activeOpacity={1}
						onPress={() => this.props.onItemPress(data.postId)}
						style={imageStyle}
					>
						<Image source={{ uri: data.url }} style={{ width: '100%', height: '100%' }} />
						<Text style={styles.text}>{item.name}</Text>
					</TouchableOpacity>
				);
			case ViewTypes.RIGHT_VIDEO:
				return (
					<View style={styles.videoContainer}>
						<View>
							<TouchableOpacity
								activeOpacity={1}
								onPress={() => this.props.onItemPress(data.postId)}
								style={styles.image}
							>
								<Image source={{ uri: data[0].url }} style={{ width: '100%', height: '100%' }} />
								<Text style={styles.text}>{item.name}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={1}
								onPress={() => this.props.onItemPress(data.postId)}
								style={styles.image}
							>
								<Image source={{ uri: data[1].url }} style={{ width: '100%', height: '100%' }} />
								<Text style={styles.text}>{item.name}</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							activeOpacity={1}
							onPress={() => this.props.onItemPress(data.postId)}
							style={[styles.video, styles.rightVideo]}
						>
							<Image source={{ uri: data[2].url }} style={{ width: '100%', height: '100%' }} />
							<Text style={styles.text}>{item.name}</Text>
						</TouchableOpacity>
					</View>
				);
			case ViewTypes.LEFT_VIDEO:
				return (
					<View style={styles.videoContainer}>
						<TouchableOpacity
							activeOpacity={1}
							onPress={() => this.props.onItemPress(data.postId)}
							style={[styles.video, styles.leftVideo]}
						>
							<Image source={{ uri: data[2].url }} style={{ width: '100%', height: '100%' }} />
							<Text style={styles.text}>{item.name}</Text>
						</TouchableOpacity>
						<View>
							<TouchableOpacity
								activeOpacity={1}
								onPress={() => this.props.onItemPress(data.postId)}
								style={styles.image}
							>
								<Image source={{ uri: data[0].url }} style={{ width: '100%', height: '100%' }} />
								<Text style={styles.text}>{item.name}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={1}
								onPress={() => this.props.onItemPress(data.postId)}
								style={styles.image}
							>
								<Image source={{ uri: data[1].url }} style={{ width: '100%', height: '100%' }} />
								<Text style={styles.text}>{item.name}</Text>
							</TouchableOpacity>
						</View>
					</View>
				);
			default:
				return null;
		}
	};

	private getDataProvider = () => {
		return new DataProvider((r1: any, r2: any) => {
			return r1 !== r2;
		});
	};

	private getLayoutProvider = () => {
		return new LayoutProvider(
			(index: number) => {
				if (index === 0) {
					return ViewTypes.RIGHT_VIDEO;
				} else if (index === 7) {
					return ViewTypes.LEFT_VIDEO;
				} else if (index % 7 === 0 && index % 2 === 0) {
					return ViewTypes.RIGHT_VIDEO;
				} else if (index % 7 === 0 && index % 3 === 0) {
					return ViewTypes.LEFT_VIDEO;
				} else {
					return ViewTypes.IMAGE;
				}
			},
			(type: ReactText, dim: any) => {
				switch (type) {
					case ViewTypes.IMAGE:
						dim.width = THUMBNAIL_SIZE;
						dim.height = THUMBNAIL_SIZE;
						break;
					case ViewTypes.RIGHT_VIDEO:
						dim.width = THUMBNAIL_SIZE * 3;
						dim.height = THUMBNAIL_SIZE * 2;
						break;
					case ViewTypes.LEFT_VIDEO:
						dim.width = THUMBNAIL_SIZE * 3;
						dim.height = THUMBNAIL_SIZE * 2;
						break;
					default:
						dim.width = 0;
						dim.height = 0;
				}
			},
		);
	};
}

export { ContentView };
