import * as React from 'react';
import { Dimensions, LayoutChangeEvent, Platform } from 'react-native';
import Orientation, { orientation as ORIENTATION_TYPES } from 'react-native-orientation';

import { DeviceOrientations, OS_TYPES } from '../../environment/consts';
import { INavigationProps, IOnMove } from '../../types';
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

const VIEWPORT = Dimensions.get('window');

interface IMediaViewerScreenState {
	orientation: string;
	activeSlide: number;
	viewport: {
		width: number;
	};
	infoVisible: boolean;
	scrollable: boolean;
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
		viewport: VIEWPORT,
		infoVisible: false,
		scrollable: true,
	};

	private timeout: NodeJS.Timer = setTimeout(() => undefined, 0);

	public componentDidMount() {
		Orientation.unlockAllOrientations();
		Orientation.addOrientationListener(this.onOrientationChangeHandler);
	}

	public componentWillUnmount() {
		Orientation.lockToPortrait();
		Orientation.removeOrientationListener(this.onOrientationChangeHandler);

		clearTimeout(this.timeout);
	}

	public render() {
		const { media, startIndex, post, onLikePost, onViewComments, onGoBack, getText } = this.props;
		const { orientation, activeSlide, viewport, infoVisible, scrollable } = this.state;

		return (
			<MediaViewerScreenView
				media={media}
				startIndex={startIndex}
				orientation={orientation}
				activeSlide={activeSlide}
				viewport={viewport}
				infoVisible={infoVisible}
				isPost={post !== null}
				likedByCurrentUser={post ? post.likedByCurrentUser : false}
				scrollable={scrollable}
				onChangeSlide={this.onChangeSlideHandler}
				onShowInfo={this.onShowInfoHandler}
				onCloseInfo={this.onCloseInfoHandler}
				onLayout={this.onLayoutHandler}
				onExitFullScreen={this.onExitFullScreenHandler}
				onLikePress={() => onLikePost(post!.postId)}
				onCommentPress={() => onViewComments(post!.postId, false)}
				onMove={this.onMoveHandler}
				onClose={onGoBack}
				getText={getText}
			/>
		);
	}

	private onMoveHandler = (position?: IOnMove) => {
		if (position) {
			const { scale } = position;

			if (scale === 1 && !this.state.scrollable) {
				this.setState({ scrollable: true });
			} else if (scale !== 1 && this.state.scrollable) {
				this.setState({ scrollable: false });
			}
		}
	};

	private onOrientationChangeHandler = (orientation: ORIENTATION_TYPES) => {
		this.setState({ orientation });
	};

	private onChangeSlideHandler = (index: number) => {
		this.setState({ activeSlide: index });
	};

	private onLayoutHandler = (event: LayoutChangeEvent) => {
		this.setState({
			viewport: {
				width: event.nativeEvent.layout.width,
			},
		});
	};

	private onExitFullScreenHandler = () => {
		const timeoutBeforeAllowAgainAllOrientation = Platform.OS === OS_TYPES.IOS ? 100 : 5000;
		Orientation.lockToPortrait();
		this.timeout = setTimeout(() => {
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
