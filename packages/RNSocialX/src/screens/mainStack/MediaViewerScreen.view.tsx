import * as React from 'react';
import {
	Animated,
	LayoutChangeEvent,
	Platform,
	SafeAreaView,
	TouchableOpacity,
	View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import { AnimatedValue } from 'react-navigation';

import { MediaInfo, MediaInteractionButtons, MediaObjectViewer } from '../../components';
import { IMedia, IOnMove, ITranslatedProps, MediaTypeImage } from '../../types';

import styles from './MediaViewerScreen.style';

interface IMediaViewerScreenViewProps extends ITranslatedProps {
	media: IMedia[];
	startIndex: number;
	activeSlide: number;
	viewport: {
		width: number;
	};
	isInfoVisible: boolean;
	isOverlayVisible: boolean;
	likedByCurrentUser: boolean;
	scrollable: boolean;
	opacity: AnimatedValue;
	toggleOverlay: () => void;
	onChangeSlide: (index: number) => void;
	onLayout: (event: LayoutChangeEvent) => void;
	onShowInfo: () => void;
	onCloseInfo: () => void;
	onCommentPress: () => void;
	onLikePress: () => void;
	onMove: (position?: IOnMove) => void;
	onExit: () => void;
}

export const MediaViewerScreenView: React.SFC<IMediaViewerScreenViewProps> = ({
	media,
	startIndex,
	viewport,
	activeSlide,
	opacity,
	isInfoVisible,
	isOverlayVisible,
	likedByCurrentUser,
	scrollable,
	toggleOverlay,
	onChangeSlide,
	onLayout,
	onShowInfo,
	onCloseInfo,
	onCommentPress,
	onLikePress,
	onMove,
	onExit,
	getText,
}) => {
	const currentMedia = media[activeSlide];
	const data = media.filter((obj) => obj.type.category === MediaTypeImage.category);

	return (
		<SafeAreaView style={styles.container}>
			<MediaInfo
				visible={isInfoVisible}
				hash={currentMedia.hash}
				size={currentMedia.size}
				type={currentMedia.type}
				onClose={onCloseInfo}
				getText={getText}
			/>
			<Animated.View style={[styles.controls, { opacity }]}>
				<View style={styles.buttons}>
					<TouchableOpacity disabled={!isOverlayVisible} onPress={onExit} style={styles.button}>
						<Icon name="md-close" style={styles.icon} />
					</TouchableOpacity>
					<TouchableOpacity
						disabled={!isOverlayVisible}
						onPress={onShowInfo}
						style={[styles.button, styles.right]}
					>
						<Icon name="ios-information-circle-outline" style={styles.icon} />
					</TouchableOpacity>
				</View>
			</Animated.View>
			{currentMedia.postId && (
				<Animated.View style={[styles.interaction, { opacity }]}>
					<MediaInteractionButtons
						postId={currentMedia.postId}
						likedByCurrentUser={likedByCurrentUser}
						disabled={!isOverlayVisible}
						onCommentPress={onCommentPress}
						onLikePress={onLikePress}
					/>
				</Animated.View>
			)}
			<View style={styles.carousel} onLayout={onLayout}>
				<Carousel
					data={data}
					renderItem={({ item }) => (
						<MediaObjectViewer
							type={item.type}
							hash={item.hash}
							resizeMode="contain"
							fullscreen={true}
							onMove={onMove}
							onPress={toggleOverlay}
							style={[styles.media, { width: viewport.width }]}
							getText={getText}
						/>
					)}
					sliderWidth={viewport.width}
					itemWidth={viewport.width}
					firstItem={startIndex}
					scrollEnabled={scrollable}
					onSnapToItem={onChangeSlide}
					{...Platform.select({
						android: {
							windowSize: 5,
							initialNumToRender: 5,
						},
						ios: {
							windowSize: 3,
							initialNumToRender: 3,
						},
					})}
				/>
			</View>
		</SafeAreaView>
	);
};
