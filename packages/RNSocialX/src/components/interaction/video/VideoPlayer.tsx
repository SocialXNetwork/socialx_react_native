import * as React from 'react';
import {
	NativeModules,
	Platform,
	StyleProp,
	TouchableWithoutFeedback,
	View,
	ViewStyle,
} from 'react-native';
import Video from 'react-native-video';

import { OS_TYPES } from '../../../environment/consts';
import { VideoControls } from './';

import styles from './VideoPlayer.style';

export interface IVideoOptions {
	containerStyle?: StyleProp<ViewStyle>;
	thumbOnly?: boolean;
}

interface IVideoPlayerProps extends IVideoOptions {
	muted?: boolean;
	uri: string;
	replayVideo?: boolean;
	resizeToChangeAspectRatio?: boolean;
	resizeMode?: 'cover' | 'contain' | 'stretch';
	thumbOnly: boolean;
}

interface IVideoPlayerState {
	ended: boolean;
	playReady: boolean;
	fullScreen: boolean;
	paused: boolean;
	muted: boolean;
	replayVideo: boolean;
	visibleView: boolean;
	resizeMode: 'cover' | 'contain' | 'stretch';
}

export class VideoPlayer extends React.Component<IVideoPlayerProps, IVideoPlayerState> {
	public static defaultProps = {
		containerStyle: styles.container,
		muted: true,
		paused: true,
		replayVideo: false,
		thumbOnly: false,
		resizeMode: 'contain',
		resizeToChangeAspectRatio: false,
	};

	public state = {
		visibleView: false,
		ended: false,
		playReady: false,
		fullScreen: false,
		paused: true,
		muted: true,
		replayVideo: false,
		resizeMode: this.props.resizeMode || 'cover',
	};

	private playerRef: React.RefObject<Video> = React.createRef();

	public render() {
		const { thumbOnly, containerStyle, uri, resizeMode } = this.props;
		const { fullScreen, playReady, muted, paused, replayVideo } = this.state;

		const showPlayButton = paused;

		return (
			<TouchableWithoutFeedback onPress={this.onPauseVideoHandler}>
				<View style={containerStyle}>
					<Video
						ref={this.playerRef}
						source={{ uri }}
						resizeMode={resizeMode}
						paused={paused}
						muted={muted}
						playInBackground={false}
						playWhenInactive={false}
						fullscreen={fullScreen}
						useTextureView={true}
						onEnd={this.onVideoEndHandler}
						onReadyForDisplay={this.onVideoReadyHandler}
						onFullscreenPlayerDidDismiss={this.onExitFullScreenHandler}
						onFullscreenPlayerWillPresent={this.onFullScreenPresentHandler}
						style={styles.videoObject}
					/>
					<VideoControls
						showPlayButton={showPlayButton}
						muted={muted}
						replayVideo={replayVideo}
						resizeToChangeAspectRatio={true}
						playReady={playReady}
						thumbOnly={thumbOnly}
						onVideoPlayStart={this.onVideoPlayStartHandler}
						onVideoMuteToggle={this.onVideoMuteToggleHandler}
						onVideoEnterFullScreen={this.onVideoEnterFullScreenHandler}
						onVideoReplay={this.onVideoReplayHandler}
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	private onPauseVideoHandler = () => {
		if (!this.state.ended) {
			this.setState({
				paused: true,
			});
		}
	};

	private onVideoMuteToggleHandler = () => {
		this.setState((currentState) => ({
			muted: !currentState.muted,
		}));
	};

	private onVideoReadyHandler = () => {
		if (!this.state.playReady) {
			this.setState({
				playReady: true,
			});
		}
	};

	private onVideoPlayStartHandler = () => {
		this.setState({
			ended: false,
			paused: false,
			muted: false,
			replayVideo: false,
		});
	};

	private onVideoEndHandler = () => {
		this.setState({
			ended: true,
			replayVideo: true,
			paused: false,
		});
	};

	private onVideoEnterFullScreenHandler = () => {
		const { uri, resizeToChangeAspectRatio } = this.props;

		if (Platform.OS === OS_TYPES.Android) {
			const durationToSeek = 1.0;
			this.setState({ paused: true });
			NativeModules.BridgeModule.showFullscreen(uri, durationToSeek);
		} else {
			if (resizeToChangeAspectRatio) {
				this.setState({
					resizeMode: this.state.resizeMode === 'cover' ? 'contain' : 'cover',
				});
			} else {
				if (!this.state.replayVideo) {
					this.setState({ fullScreen: true, muted: false, paused: true });
				}
			}
		}
	};

	private onExitFullScreenHandler = () => {
		this.setState({
			fullScreen: false,
			muted: true,
			paused: false,
		});
	};

	private onVideoReplayHandler = () => {
		this.setState({ replayVideo: false, fullScreen: false, muted: false, ended: false });

		if (this.playerRef && this.playerRef.current) {
			this.playerRef.current.seek(0);
		}
	};

	private onFullScreenPresentHandler = () => {
		this.setState({ paused: true });
	};
}
