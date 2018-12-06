import * as React from 'react';
import { Dimensions, Platform } from 'react-native';
import Orientation, { orientation as ORIENTATION_TYPES } from 'react-native-orientation';

import { DeviceOrientations, OS_TYPES } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { MediaViewerScreenView } from './MediaViewerScreen.view';

import {
	IWithLikingEnhancedActions,
	IWithNavigationHandlersEnhancedActions,
	WithLiking,
	WithNavigationHandlers,
} from '../../enhancers/intermediary';
import {
	IWithMediaViewerEnhancedActions,
	IWithMediaViewerEnhancedData,
	WithMediaViewer,
} from '../../enhancers/screens';

interface IMediaViewerScreenState {
	orientation: string;
	activeSlide: number;
	viewport: {
		width: number;
	};
	infoVisible: boolean;
}

type IMediaViewerScreenProps = INavigationProps &
	IWithMediaViewerEnhancedData &
	IWithMediaViewerEnhancedActions &
	IWithLikingEnhancedActions &
	IWithNavigationHandlersEnhancedActions;

class Screen extends React.Component<IMediaViewerScreenProps, IMediaViewerScreenState> {
	public state = {
		orientation: DeviceOrientations.Portrait,
		activeSlide: this.props.startIndex,
		viewport: {
			width: Dimensions.get('window').width,
		},
		infoVisible: false,
	};

	public componentDidMount() {
		// due to Android problems with Carousel on orientation change enable tilt only on iOS
		if (Platform.OS === OS_TYPES.IOS) {
			Orientation.unlockAllOrientations();
			Orientation.addOrientationListener(this.onOrientationChangeHandler);
		}
	}

	public componentWillUnmount() {
		if (Platform.OS === OS_TYPES.IOS) {
			Orientation.lockToPortrait();
			Orientation.removeOrientationListener(this.onOrientationChangeHandler);
		}
	}

	public render() {
		const { media, startIndex, post, onLikePost, onViewComments, onGoBack, getText } = this.props;
		const { orientation, activeSlide, viewport, infoVisible } = this.state;

		return (
			<MediaViewerScreenView
				media={media}
				startIndex={startIndex}
				orientation={orientation}
				activeSlide={activeSlide}
				viewport={viewport}
				infoVisible={infoVisible}
				canReact={post ? true : false}
				likedByCurrentUser={post ? post.likedByCurrentUser : false}
				onChangeSlide={this.onChangeSlideHandler}
				onShowInfo={this.onShowInfoHandler}
				onCloseInfo={this.onCloseInfoHandler}
				onLayout={this.onLayoutHandler}
				onExitFullScreen={this.onExitFullScreenHandler}
				onLikePress={() => onLikePost(post!.postId)}
				onCommentPress={() => onViewComments(post!.postId, false)}
				onClose={onGoBack}
				getText={getText}
			/>
		);
	}

	private onOrientationChangeHandler = (orientation: ORIENTATION_TYPES) => {
		this.setState({ orientation });
	};

	private onChangeSlideHandler = (index: number) => {
		this.setState({ activeSlide: index });
	};

	private onLayoutHandler = (event: {
		nativeEvent: { layout: { width: number; height: number } };
	}) => {
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

	private onShowInfoHandler = () => {
		this.setState({
			infoVisible: true,
		});
	};

	private onCloseInfoHandler = () => {
		this.setState({
			infoVisible: false,
		});
	};
}

export const MediaViewerScreen = (props: INavigationProps) => (
	<WithMediaViewer>
		{(media) => (
			<WithLiking likedByCurrentUser={media.data.post ? media.data.post.likedByCurrentUser : false}>
				{(likes) => (
					<WithNavigationHandlers navigation={props.navigation}>
						{(nav) => (
							<Screen
								{...props}
								{...media.data}
								{...media.actions}
								{...likes.actions}
								{...nav.actions}
							/>
						)}
					</WithNavigationHandlers>
				)}
			</WithLiking>
		)}
	</WithMediaViewer>
);
