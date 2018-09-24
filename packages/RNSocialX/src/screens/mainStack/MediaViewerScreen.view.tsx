/**
 * TODO list:
 * 1. @Ionut, check later <Carousel/> activeSlide prop.
 * 2. check canZoom, that is making the carousel feel really slow on slide change
 * 3. More testing on android with release build, see https://github.com/archriss/react-native-snap-carousel/blob/master/doc/KNOWN_ISSUES.md#android-performance
 */

import * as React from 'react';
import {Platform, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';

import {MediaInfoModal, MediaObjectViewer} from '../../components';
import {DeviceOrientations} from '../../environment/consts';
import {IMediaProps, ITranslatedProps} from '../../types';
import styles from './MediaViewerScreen.style';

interface IMediaViewerScreenViewProps extends ITranslatedProps {
	mediaObjects: IMediaProps[];
	startIndex: number;
	orientation: string;
	activeSlide: number;
	viewport: {
		width: number;
	};
	slideChanged: (index: number) => void;
	isInfoOverlayVisible: boolean;
	showMediaInfoOverlay: () => void;
	closeMediaInfoOverlay: () => void;
	carouselContainerOnLayout: (event: any) => void;
	onExitFullScreen: () => void;
}

export const MediaViewerScreenView: React.SFC<IMediaViewerScreenViewProps> = ({
	mediaObjects,
	carouselContainerOnLayout,
	orientation,
	startIndex,
	viewport,
	activeSlide,
	slideChanged,
	isInfoOverlayVisible,
	getText,
	showMediaInfoOverlay,
	closeMediaInfoOverlay,
	onExitFullScreen,
}) => {
	const currentMediaObject = mediaObjects[activeSlide];

	return (
		<SafeAreaView style={styles.safeView}>
			<MediaInfoModal
				visible={isInfoOverlayVisible}
				closeHandler={closeMediaInfoOverlay}
				mediaHash={currentMediaObject.hash}
				mediaSize={currentMediaObject.size}
				mediaType={currentMediaObject.type}
				mediaName={null}
				mediaURL={currentMediaObject.url}
				getText={getText}
			/>
			<View style={styles.carouselContainer} onLayout={carouselContainerOnLayout}>
				<Carousel
					// activeSlide={activeSlide}
					data={mediaObjects}
					renderItem={({item, index}: {item: IMediaProps; index: number}) => (
						<MediaObjectViewer
							type={item.type}
							paused={index !== activeSlide}
							uri={item.url}
							style={[styles.carouselMediaObject, {width: viewport.width}]}
							resizeMode={'contain'}
							resizeToChangeAspectRatio={true}
							canZoom={false}
							getText={getText}
							thumbOnly={false}
						/>
					)}
					sliderWidth={viewport.width}
					itemWidth={viewport.width}
					firstItem={startIndex}
					onSnapToItem={slideChanged}
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
				<CloseButton isPortrait={orientation === DeviceOrientations.Portrait} onExitFullScreen={onExitFullScreen} />
				<View style={styles.screenFooter} pointerEvents={'none'}>
					<MediaInfoSection mediaObjects={mediaObjects} activeSlide={activeSlide} />
					<Pagination mediaObjects={mediaObjects} activeSlide={activeSlide} />
				</View>
				<TouchableOpacity style={styles.infoButton} onPress={showMediaInfoOverlay}>
					<Icon name={'ios-information-circle-outline'} style={styles.infoIcon} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const CloseButton: React.SFC<{isPortrait: boolean; onExitFullScreen: () => void}> = ({
	isPortrait,
	onExitFullScreen,
}) => {
	if (!isPortrait) {
		return (
			<TouchableOpacity onPress={onExitFullScreen} style={styles.closeButton}>
				<Icon name={'md-close'} style={styles.infoIcon} />
			</TouchableOpacity>
		);
	}
	return null;
};

const Pagination: React.SFC<{mediaObjects: IMediaProps[]; activeSlide: number}> = ({mediaObjects, activeSlide}) => {
	if (mediaObjects.length > 1) {
		return (
			<View style={styles.paginationContainer}>
				<Text style={styles.paginationText}>
					{activeSlide + 1}
					{' / '}
					{mediaObjects.length}
				</Text>
			</View>
		);
	}
	return null;
};

const MediaInfoSection: React.SFC<{mediaObjects: IMediaProps[]; activeSlide: number}> = ({
	mediaObjects,
	activeSlide,
}) => {
	const currentMedia = mediaObjects[activeSlide];
	const numberOfLikes = currentMedia.numberOfLikes | 0;
	const numberOfComments = currentMedia.numberOfComments | 0;

	if (numberOfComments > 0 || numberOfLikes > 0) {
		return (
			<View style={styles.mediaInfoSection}>
				{numberOfLikes > 0 && <Text style={styles.infoText}>{'Likes ' + numberOfLikes}</Text>}
				<View style={{flex: 1}} />
				{numberOfComments > 0 && <Text style={styles.infoText}>{'Comments ' + numberOfComments}</Text>}
			</View>
		);
	}
	return null;
};
