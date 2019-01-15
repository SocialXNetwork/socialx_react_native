import * as React from 'react';
import { Animated, Dimensions, Platform, SafeAreaView, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import { AnimatedValue } from 'react-navigation';

import { MediaInfo, MediaInteractionButtons, MediaObjectViewer } from '../../components';
import { IMedia, IOnMove, ITranslatedProps, MediaTypeImage } from '../../types';

import styles from './MediaViewerScreen.style';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface IMediaViewerScreenViewProps extends ITranslatedProps {
	media: IMedia[];
	startIndex: number;
	activeSlide: number;
	isInfoVisible: boolean;
	isOverlayVisible: boolean;
	likedByCurrentUser: boolean;
	defaultScale: boolean;
	opacity: AnimatedValue;
	onImagePress: () => void;
	onChangeSlide: (index: number) => void;
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
	activeSlide,
	isInfoVisible,
	isOverlayVisible,
	likedByCurrentUser,
	defaultScale,
	opacity,
	onImagePress,
	onChangeSlide,
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
			{data.length === 1 && (
				<MediaObjectViewer
					type={data[0].type}
					hash={data[0].hash}
					resizeMode="contain"
					fullscreen={true}
					defaultScale={defaultScale}
					onMove={onMove}
					onPress={onImagePress}
					onExit={onExit}
					style={[styles.media, { width: SCREEN_WIDTH }]}
					getText={getText}
				/>
			)}
			{data.length > 1 && (
				<View style={styles.carousel}>
					<Carousel
						data={data}
						renderItem={({ item }) => (
							<MediaObjectViewer
								type={item.type}
								hash={item.hash}
								resizeMode="contain"
								fullscreen={true}
								defaultScale={defaultScale}
								onMove={onMove}
								onPress={onImagePress}
								style={[styles.media, { width: SCREEN_WIDTH }]}
								getText={getText}
							/>
						)}
						sliderWidth={SCREEN_WIDTH}
						itemWidth={SCREEN_WIDTH}
						firstItem={startIndex}
						scrollEnabled={defaultScale}
						lockScrollWhileSnapping={true}
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
			)}
		</SafeAreaView>
	);
};
