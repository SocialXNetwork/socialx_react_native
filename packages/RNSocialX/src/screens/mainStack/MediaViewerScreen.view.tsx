/**
 * TODO list:
 * 1. @Ionut, check later <Carousel/> activeSlide prop.
 * 2. check canZoom, that is making the carousel feel really slow on slide change
 * 3. More testing on android with release build, see https://github.com/archriss/react-native-snap-carousel/blob/master/doc/KNOWN_ISSUES.md#android-performance
 */

import * as React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';

import { SafeAreaView } from 'react-navigation';
import {
	CloseButton as CloseModal,
	Header,
	MediaInfoModal,
	MediaInteractionButtons,
	MediaObjectViewer,
} from '../../components';
import { DeviceOrientations } from '../../environment/consts';
import { IMedia, ITranslatedProps } from '../../types';

import styles from './MediaViewerScreen.style';

const CloseButton: React.SFC<{
	isPortrait: boolean;
	onExitFullScreen: () => void;
}> = ({ isPortrait, onExitFullScreen }) => {
	if (!isPortrait) {
		return (
			<TouchableOpacity onPress={onExitFullScreen} style={styles.closeButton}>
				<Icon name="md-close" style={styles.infoIcon} />
			</TouchableOpacity>
		);
	}

	return null;
};

const Pagination: React.SFC<{
	media: IMedia[];
	activeSlide: number;
}> = ({ media, activeSlide }) => {
	if (media.length > 1) {
		return (
			<View style={styles.paginationContainer}>
				<Text style={styles.paginationText}>
					{activeSlide + 1}
					{' / '}
					{media.length}
				</Text>
			</View>
		);
	}

	return null;
};

interface IMediaViewerScreenViewProps extends ITranslatedProps {
	media: IMedia[];
	startIndex: number;
	orientation: string;
	activeSlide: number;
	viewport: {
		width: number;
	};
	infoVisible: boolean;
	canReact: boolean | undefined;
	likedByCurrentUser: boolean;
	onChangeSlide: (index: number) => void;
	onLayout: (event: any) => void;
	onShowInfo: () => void;
	onCloseInfo: () => void;
	onExitFullScreen: () => void;
	onClose: () => void;
	onCommentPress: () => void;
	onLikePress: () => void;
}

export const MediaViewerScreenView: React.SFC<IMediaViewerScreenViewProps> = ({
	media,
	orientation,
	startIndex,
	viewport,
	activeSlide,
	onChangeSlide,
	infoVisible,
	canReact,
	likedByCurrentUser,
	onLayout,
	onShowInfo,
	onCloseInfo,
	onExitFullScreen,
	onClose,
	onCommentPress,
	onLikePress,
	getText,
}) => {
	const currentMedia = media[activeSlide];
	const isPortrait = orientation === DeviceOrientations.Portrait;

	return (
		<View style={styles.container}>
			{isPortrait && <Header left={<CloseModal onClose={onClose} />} />}
			<MediaInfoModal
				visible={infoVisible}
				hash={currentMedia.hash}
				size={currentMedia.size}
				type={currentMedia.type}
				onCloseHandler={onCloseInfo}
				getText={getText}
			/>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.carouselContainer} onLayout={onLayout}>
					<Carousel
						data={media}
						renderItem={({ item, index }: { item: IMedia; index: number }) => (
							<MediaObjectViewer
								type={item.type}
								paused={index !== activeSlide}
								hash={item.hash}
								style={[styles.carouselMediaObject, { width: viewport.width }]}
								resizeMode="contain"
								resizeToChangeAspectRatio={true}
								canZoom={false}
								getText={getText}
								thumbOnly={false}
							/>
						)}
						sliderWidth={viewport.width}
						itemWidth={viewport.width}
						firstItem={startIndex}
						onSnapToItem={onChangeSlide}
						{...Platform.select({
							android: {
								windowSize: 5,
								initialNumToRender: 5,
								// layout: 'stack',
								// useScrollView: true,
							},
							ios: {
								windowSize: 3,
								initialNumToRender: 3,
							},
						})}
					/>
					<CloseButton isPortrait={isPortrait} onExitFullScreen={onExitFullScreen} />
					<View style={styles.screenFooter}>
						<MediaInteractionButtons
							postId={currentMedia.postId}
							canReact={canReact}
							likedByCurrentUser={likedByCurrentUser}
							onCommentPress={onCommentPress}
							onLikePress={onLikePress}
						/>
						<Pagination media={media} activeSlide={activeSlide} />
					</View>
					<TouchableOpacity style={styles.infoButton} onPress={onShowInfo}>
						<Icon name="ios-information-circle-outline" style={styles.infoIcon} />
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</View>
	);
};
