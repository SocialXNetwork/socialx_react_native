import React, {Component, ReactText} from 'react';
import {Animated, Text, View} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';

import styles, {THUMBNAIL_SIZE} from './ContentView.style';
import {IContentItem} from './TrendingContentCarousel';

const ViewTypes = {
	IMAGE: 0,
	RIGHT_VIDEO: 1,
	LEFT_VIDEO: 2,
};

interface IContentViewProps {
	item: IContentItem;
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
			<Animated.View style={{flex: 1}}>
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
		const {item} = this.props;
		const imageStyle = data.middle ? [styles.image, styles.middle] : styles.image;

		switch (type) {
			case ViewTypes.IMAGE:
				return (
					<View style={imageStyle}>
						<Text style={styles.text}>{item.name}</Text>
						<Text style={styles.text}>{data.type}</Text>
					</View>
				);
			case ViewTypes.RIGHT_VIDEO:
				return (
					<View style={styles.videoContainer}>
						<View style={styles.imageContainer}>
							<View style={styles.imageWithVideo}>
								<Text style={styles.text}>{item.name}</Text>
								<Text style={styles.text}>{data[0].type}</Text>
							</View>
							<View style={styles.imageWithVideo}>
								<Text style={styles.text}>{item.name}</Text>
								<Text style={styles.text}>{data[1].type}</Text>
							</View>
						</View>
						<View style={[styles.video, styles.rightVideo]}>
							<Text style={styles.text}>{item.name}</Text>
							<Text style={styles.text}>{data[2].type}</Text>
						</View>
					</View>
				);
			case ViewTypes.LEFT_VIDEO:
				return (
					<View style={styles.videoContainer}>
						<View style={[styles.video, styles.leftVideo]}>
							<Text style={styles.text}>{item.name}</Text>
							<Text style={styles.text}>{data[0].type}</Text>
						</View>
						<View style={styles.imageContainer}>
							<View style={styles.imageWithVideo}>
								<Text style={styles.text}>{item.name}</Text>
								<Text style={styles.text}>{data[1].type}</Text>
							</View>
							<View style={styles.imageWithVideo}>
								<Text style={styles.text}>{item.name}</Text>
								<Text style={styles.text}>{data[2].type}</Text>
							</View>
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

export {ContentView};
