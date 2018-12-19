import * as React from 'react';
import { Animated, Dimensions, LayoutChangeEvent } from 'react-native';

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

type IProps = INavigationProps &
	IWithMediaViewerEnhancedData &
	IWithMediaViewerEnhancedActions &
	IWithLikingEnhancedActions &
	IWithNavigationHandlersEnhancedActions;

interface IState {
	activeSlide: number;
	viewport: {
		width: number;
	};
	isOverlayVisible: boolean;
	isInfoVisible: boolean;
	scrollable: boolean;
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		activeSlide: this.props.startIndex,
		viewport: VIEWPORT,
		isOverlayVisible: true,
		isInfoVisible: false,
		scrollable: true,
	};

	private opacity = new Animated.Value(1);

	public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
		return (
			this.props.post !== nextProps.post ||
			this.state.activeSlide !== nextState.activeSlide ||
			this.state.viewport !== nextState.viewport ||
			this.state.isInfoVisible !== nextState.isInfoVisible ||
			this.state.scrollable !== nextState.scrollable
		);
	}

	public render() {
		const { media, startIndex, post, onLikePost, onViewComments, onGoBack, getText } = this.props;
		const { activeSlide, viewport, isInfoVisible, isOverlayVisible, scrollable } = this.state;

		return (
			<MediaViewerScreenView
				media={media}
				startIndex={startIndex}
				activeSlide={activeSlide}
				viewport={viewport}
				isInfoVisible={isInfoVisible}
				isOverlayVisible={isOverlayVisible}
				likedByCurrentUser={post ? post.likedByCurrentUser : false}
				scrollable={scrollable}
				opacity={this.opacity}
				toggleOverlay={this.toggleOverlay}
				onChangeSlide={this.onChangeSlideHandler}
				onShowInfo={this.onShowInfoHandler}
				onCloseInfo={this.onCloseInfoHandler}
				onLayout={this.onLayoutHandler}
				onLikePress={() => onLikePost(post!.postId)}
				onCommentPress={() => onViewComments(post!.postId, false)}
				onMove={this.onMoveHandler}
				onExit={onGoBack}
				getText={getText}
			/>
		);
	}

	private onMoveHandler = (position?: IOnMove) => {
		if (position) {
			const { scale } = position;

			if (scale === 1 && !this.state.scrollable) {
				this.toggleOverlay();
				this.setState({ scrollable: true });
			} else if (scale !== 1 && this.state.scrollable) {
				this.toggleOverlay();
				this.setState({ scrollable: false });
			}
		}
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

	private onShowInfoHandler = () => {
		this.setState({
			isInfoVisible: true,
		});
	};

	private onCloseInfoHandler = () => {
		this.setState({
			isInfoVisible: false,
		});
	};

	private toggleOverlay = () => {
		if (this.state.isOverlayVisible) {
			this.setState({ isOverlayVisible: false });
			Animated.timing(this.opacity, {
				toValue: 0,
				duration: 250,
				useNativeDriver: true,
			}).start();
		} else {
			this.setState({ isOverlayVisible: true });
			Animated.timing(this.opacity, {
				toValue: 1,
				duration: 250,
				useNativeDriver: true,
			}).start();
		}
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
