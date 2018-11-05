import * as React from 'react';
import { Dimensions, Platform } from 'react-native';
import Orientation, { orientation } from 'react-native-orientation';

import { DeviceOrientations, OS_TYPES, SCREENS } from '../../environment/consts';
import { ActionTypes } from '../../store/data/posts/Types';
import { INavigationProps } from '../../types';
import { MediaViewerScreenView } from './MediaViewerScreen.view';

import { WithWallPost } from '../../enhancers/components/WithWallPost';
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
	IWithMediaViewerEnhancedActions;

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
		const likeFailed = !!this.props.errors.find(
			(error) => error.type === ActionTypes.LIKE_POST || error.type === ActionTypes.UNLIKE_POST,
		);

		return (
			<MediaViewerScreenView
				mediaObjects={this.props.mediaObjects}
				startIndex={this.props.startIndex}
				orientation={this.state.orientation}
				activeSlide={this.state.activeSlide}
				viewport={this.state.viewport}
				infoVisible={this.state.infoVisible}
				canReact={!!this.props.post}
				postId={this.props.post ? this.props.post.postId : undefined}
				likeFailed={likeFailed}
				onChangeSlide={this.onChangeSlideHandler}
				onShowInfo={this.onShowInfoHandler}
				onCloseInfo={this.onCloseInfoHandler}
				onLayout={this.onLayoutHandler}
				onExitFullScreen={this.onExitFullScreenHandler}
				onLikePress={this.props.onLikePost}
				onCommentPress={this.onCommentPressHandler}
				onClose={this.onCloseHandler}
				getText={this.props.getText}
			/>
		);
	}

	private onOrientationChangeHandler = (orient: orientation) => {
		this.setState({ orientation: orient });
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

	private onCommentPressHandler = () => {
		const { post, onCommentsPress } = this.props;

		if (post) {
			onCommentsPress(post, true);
		}
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

	private onCloseHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const MediaViewerScreen = (navProps: INavigationProps) => (
	<WithWallPost navigation={navProps.navigation}>
		{(props) => (
			<WithMediaViewer>
				{({ data, actions }) => (
					<Screen
						{...navProps}
						{...data}
						{...actions}
						onLikePost={props.actions.onLikePost}
						onCommentsPress={props.actions.onCommentsPress}
					/>
				)}
			</WithMediaViewer>
		)}
	</WithWallPost>
);
