import * as React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Carousel, {CarouselStatic} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';

import {MediaInfoModal, MediaObjectViewer} from '../../components';
import {DeviceOrientations, OS_TYPES} from '../../environment/consts';
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
	carouselRef: CarouselStatic<IMediaProps> | null;
	carouselContainerOnLayout: (event: any) => void;
	onExitFullScreen: () => void;
	platformSpecificCarouselProps: any;
}

export class MediaViewerScreenView extends React.Component<IMediaViewerScreenViewProps> {
	public render() {
		const {
			mediaObjects,
			carouselRef,
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
			platformSpecificCarouselProps,
		} = this.props;
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
						ref={carouselRef}
						activeSlide={activeSlide}
						data={mediaObjects}
						renderItem={this.renderCarouseltem}
						sliderWidth={viewport.width}
						itemWidth={viewport.width}
						firstItem={startIndex}
						onSnapToItem={slideChanged}
						{...platformSpecificCarouselProps}
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
	}

	private renderCarouseltem = ({item, index}: {item: IMediaProps; index: number}) => {
		const {
			viewport: {width},
			activeSlide,
		} = this.props;

		return (
			// @ts-ignore
			<MediaObjectViewer
				type={item.type}
				paused={index !== activeSlide}
				uri={item.url}
				style={[styles.carouselMediaObject, {width}]}
				resizeMode={'contain'}
				resizeToChangeAspectRatio={true}
				canZoom={true}
			/>
		);
	};
}

const CloseButton: React.SFC<{isPortrait: boolean; onExitFullScreen: () => void}> = ({
	isPortrait,
	onExitFullScreen,
}) => {
	if (isPortrait) {
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
