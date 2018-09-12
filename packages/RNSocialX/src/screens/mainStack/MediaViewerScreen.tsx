/**
 * TODO list:
 * 1. Refactor navigationOptions into header component
 */

import * as React from 'react';
import {Dimensions, Platform, View} from 'react-native';
import Orientation, {orientation} from 'react-native-orientation';
import {CarouselStatic} from 'react-native-snap-carousel';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';

import {CloseButton} from '../../components';
import {DeviceOrientations, OS_TYPES} from '../../environment/consts';
import {IMediaProps, ITranslatedProps} from '../../types';
import {MediaViewerScreenView} from './MediaViewerScreen.view';

interface IMediaViewerScreenNavParams {
	params: {
		mediaObjects: IMediaProps[];
		startIndex: number;
		hideHeader: boolean;
	};
}

interface IMediaViewerScreenState {
	orientation: string;
	activeSlide: number;
	viewport: {
		width: number;
	};
	isInfoOverlayVisible: boolean;
}

export interface IMediaViewerScreenProps extends ITranslatedProps {
	navigation: NavigationScreenProp<IMediaViewerScreenNavParams>;
}

export class MediaViewerScreen extends React.Component<IMediaViewerScreenProps, IMediaViewerScreenState> {
	public static navigationOptions = (props: IMediaViewerScreenProps) => {
		const ret: Partial<NavigationStackScreenOptions> = {
			title: 'MEDIA',
			headerRight: (
				<CloseButton
					onClose={() => {
						/**/
					}}
				/>
			),
			headerLeft: <View />,
		};
		const params = props.navigation.state.params || {};
		if (params.hideHeader) {
			ret.header = null;
		}
		return ret;
	};

	public state = {
		orientation: DeviceOrientations.Portrait,
		activeSlide: this.props.navigation.state.params.startIndex,
		viewport: {
			width: Dimensions.get('window').width,
		},
		isInfoOverlayVisible: false,
	};

	private carouselRef: CarouselStatic<IMediaProps> | null = null;

	public componentDidMount() {
		// due to Android problems with Carousel on orientation change enable tilt only on iOS
		if (Platform.OS === OS_TYPES.IOS) {
			Orientation.unlockAllOrientations();
			Orientation.addOrientationListener(this.orientationDidChange);
		}
	}

	public componentWillUnmount() {
		if (Platform.OS === OS_TYPES.IOS) {
			Orientation.lockToPortrait();
			Orientation.removeOrientationListener(this.orientationDidChange);
		}
	}

	public render() {
		const {params} = this.props.navigation.state;

		return (
			<MediaViewerScreenView
				mediaObjects={params.mediaObjects}
				startIndex={params.startIndex}
				orientation={this.state.orientation}
				activeSlide={this.state.activeSlide}
				viewport={this.state.viewport}
				slideChanged={this.slideChangedHandler}
				isInfoOverlayVisible={this.state.isInfoOverlayVisible}
				showMediaInfoOverlay={this.showMediaInfoOverlayHandler}
				closeMediaInfoOverlay={this.closeMediaInfoOverlayHandler}
				carouselRef={this.carouselRef}
				carouselContainerOnLayout={this.carouselContainerOnLayoutHandler}
				onExitFullScreen={this.onExitFullScreenHandler}
				platformSpecificCarouselProps={this.getPlatformSpecificCarouselProps()}
				getText={this.props.getText}
			/>
		);
	}

	private orientationDidChange = (orient: orientation) => {
		this.props.navigation.setParams({hideHeader: orient === DeviceOrientations.Landscape});
		this.setState({orientation: orient});
	};

	private slideChangedHandler = (index: number) => {
		this.setState({activeSlide: index});
	};

	private carouselContainerOnLayoutHandler = (event: {nativeEvent: {layout: {width: number; height: number}}}) => {
		this.setState({
			viewport: {
				width: event.nativeEvent.layout.width,
			},
		});
	};

	private onExitFullScreenHandler = () => {
		const timeoutBeforeAllowAgainAllOrientation = Platform.OS === OS_TYPES.IOS ? 100 : 5000;
		Orientation.lockToPortrait();
		setTimeout(() => {
			Orientation.unlockAllOrientations();
		}, timeoutBeforeAllowAgainAllOrientation);
	};

	private showMediaInfoOverlayHandler = () => {
		this.setState({
			isInfoOverlayVisible: true,
		});
	};

	private closeMediaInfoOverlayHandler = () => {
		this.setState({
			isInfoOverlayVisible: false,
		});
	};

	private getPlatformSpecificCarouselProps = () => {
		const props: any = {};
		if (Platform.OS === OS_TYPES.IOS) {
			props.windowSize = 1;
			props.initialNumToRender = 1;
		} else {
			props.windowSize = 5;
			props.initialNumToRender = 5;
			// ret.initialNumToRender = this.props.startIndex;
			// ret.layout = 'stack';
			// ret.useScrollView = true;
			// TODO: explore other options for Android issues:
			// https://github.com/archriss/react-native-snap-carousel/blob/master/doc/
		}
		return props;
	};
}
