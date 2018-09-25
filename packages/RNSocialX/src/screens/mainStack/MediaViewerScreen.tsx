import * as React from 'react';
import {Dimensions, Platform} from 'react-native';
import Orientation, {orientation} from 'react-native-orientation';

import {IWithMediaViewerEnhancedActions, IWithMediaViewerEnhancedData, WithMediaViewer} from '../../enhancers/screens';
import {DeviceOrientations, OS_TYPES} from '../../environment/consts';
import {IMediaProps, INavigationProps} from '../../types';
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

type IMediaViewerScreenProps = INavigationProps<IMediaViewerScreenNavParams> &
	IWithMediaViewerEnhancedData &
	IWithMediaViewerEnhancedActions;

class Screen extends React.Component<IMediaViewerScreenProps, IMediaViewerScreenState> {
	public state = {
		orientation: DeviceOrientations.Portrait,
		activeSlide: this.props.navigation.state.params.startIndex,
		viewport: {
			width: Dimensions.get('window').width,
		},
		isInfoOverlayVisible: false,
	};

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
				carouselContainerOnLayout={this.carouselContainerOnLayoutHandler}
				onExitFullScreen={this.onExitFullScreenHandler}
				onClose={this.onCloseHandler}
				getText={this.props.getText}
			/>
		);
	}

	private orientationDidChange = (orient: orientation) => {
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

	private onCloseHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const MediaViewerScreen = (navProps: INavigationProps<IMediaViewerScreenNavParams>) => (
	<WithMediaViewer>{({data, actions}) => <Screen {...navProps} {...data} {...actions} />}</WithMediaViewer>
);
