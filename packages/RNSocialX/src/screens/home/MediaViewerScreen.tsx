import { throttle } from 'lodash';
import * as React from 'react';
import { Animated } from 'react-native';

import { INavigationProps, IOnMove } from '../../types';
import { MediaViewerScreenView } from './MediaViewerScreen.view';

const THROTTLE_TIME = 300;

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

type IProps = INavigationProps &
	IWithMediaViewerEnhancedData &
	IWithMediaViewerEnhancedActions &
	IWithLikingEnhancedActions &
	IWithNavigationHandlersEnhancedActions;

interface IState {
	activeSlide: number;
	isOverlayVisible: boolean;
	isInfoVisible: boolean;
	defaultScale: boolean;
}

class Screen extends React.Component<IProps, IState> {
	public state = {
		activeSlide: this.props.startIndex,
		isOverlayVisible: true,
		isInfoVisible: false,
		defaultScale: true,
	};

	private opacity = new Animated.Value(1);
	private toggleOverlay = throttle((state: boolean) => {
		this.onOverlayToggleHandler(state);
	}, THROTTLE_TIME);

	public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
		return (
			this.props.likedByCurrentUser !== nextProps.likedByCurrentUser ||
			this.state.activeSlide !== nextState.activeSlide ||
			this.state.isInfoVisible !== nextState.isInfoVisible ||
			this.state.isOverlayVisible !== nextState.isOverlayVisible ||
			this.state.defaultScale !== nextState.defaultScale
		);
	}

	public render() {
		const {
			media,
			startIndex,
			postId,
			likedByCurrentUser,
			onLikePost,
			onViewComments,
			onGoBack,
			getText,
		} = this.props;
		const { activeSlide, isInfoVisible, isOverlayVisible, defaultScale } = this.state;

		return (
			<MediaViewerScreenView
				media={media}
				startIndex={startIndex}
				activeSlide={activeSlide}
				isInfoVisible={isInfoVisible}
				isOverlayVisible={isOverlayVisible}
				likedByCurrentUser={likedByCurrentUser}
				defaultScale={defaultScale}
				opacity={this.opacity}
				onImagePress={this.onImagePressHandler}
				onChangeSlide={this.onChangeSlideHandler}
				onShowInfo={this.onShowInfoHandler}
				onCloseInfo={this.onCloseInfoHandler}
				onLikePress={() => onLikePost(postId!)}
				onCommentPress={() => onViewComments(postId!, false)}
				onMove={this.onMoveHandler}
				onExit={onGoBack}
				getText={getText}
			/>
		);
	}

	private onMoveHandler = (position?: IOnMove) => {
		if (position) {
			const { scale } = position;

			if (scale === 1 && !this.state.defaultScale) {
				this.setState({ defaultScale: true });
				this.toggleOverlay(true);
			} else if (scale !== 1 && this.state.defaultScale) {
				this.setState({ defaultScale: false });
				this.toggleOverlay(false);
			}
		}
	};

	private onImagePressHandler = () => {
		if (!this.state.defaultScale) {
			this.toggleOverlay(true);
			this.setState({ defaultScale: true });
		} else {
			if (this.state.isOverlayVisible) {
				this.toggleOverlay(false);
			} else {
				this.toggleOverlay(true);
			}
		}
	};

	private onChangeSlideHandler = (index: number) => {
		this.setState({ activeSlide: index });
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

	private onOverlayToggleHandler = (state: boolean) => {
		this.setState({ isOverlayVisible: state });
		Animated.timing(this.opacity, {
			toValue: state ? 1 : 0,
			duration: THROTTLE_TIME - 50,
			useNativeDriver: true,
		}).start();
	};
}

export const MediaViewerScreen = (props: INavigationProps) => (
	<WithMediaViewer>
		{(media) => (
			<WithLiking likedByCurrentUser={media.data.likedByCurrentUser || false}>
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
