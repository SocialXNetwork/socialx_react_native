/**
 * TODO list:
 * 1. @Ionut & @Serkan: Figure out a better strategy and get rid of UNSAFE_componentWillReceiveProps.
 * What we want to do is allow user to pause/mute the video and also let player be paused/muted from the outside.
 * Control from the outside should take over user control.
 * 2. Support full screen on Android: request made with https://github.com/react-native-community/react-native-video/issues/1251
 * 3. Local videos don't fire onLoad: request made with https://github.com/react-native-community/react-native-video/issues/1195
 */

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
import { VideoControls } from './VideoControls';
import styles from './VideoPlayer.style';

export interface IVideoOptions {
	containerStyle?: StyleProp<ViewStyle>;
	muted?: boolean;
	thumbOnly?: boolean;
	resizeMode?: 'cover' | 'contain';
	resizeToChangeAspectRatio?: boolean;
	paused?: boolean;
}

interface IVideoPlayerProps extends IVideoOptions {
	thumbOnly: boolean;
	muted: boolean;
	videoURL: string;
	onPressVideo?: () => void;
	replayVideo: boolean;
	replayVideoText: string;
}

interface IVideoPlayerState {
	ended: boolean;
	playReady: boolean;
	fullScreen: boolean;
	paused: boolean;
	muted: boolean;
	replayVideo: boolean;
	resizeMode: 'cover' | 'contain' | 'stretch';
}

export class VideoPlayer extends React.Component<IVideoPlayerProps, IVideoPlayerState> {
	public static defaultProps = {
		containerStyle: styles.container,
		muted: true,
		paused: false,
		replayVideo: false,
		thumbOnly: false,
		resizeMode: 'cover',
		resizeToChangeAspectRatio: false,
	};

	public state = {
		ended: false,
		playReady: false,
		fullScreen: false,
		paused: false,
		muted: true,
		replayVideo: false,
		resizeMode: this.props.resizeMode || 'cover',
	};

	private playerRef: React.RefObject<Video> = React.createRef();

	public render() {
		const { containerStyle, thumbOnly, videoURL, onPressVideo, replayVideoText } = this.props;
		const { ended, playReady, fullScreen, muted, paused, resizeMode, replayVideo } = this.state;

		const showPlayButton = paused;

		return (
			<TouchableWithoutFeedback
				onPress={this.onPauseVideoHandler}
				disabled={thumbOnly && !onPressVideo && ended}
			>
				<View style={containerStyle}>
					<Video
						onReadyForDisplay={this.onVideoReadyHandler}
						// poster='https://baconmockup.com/300/200/'
						source={{ uri: videoURL }}
						resizeMode={resizeMode}
						paused={paused}
						muted={muted}
						onEnd={this.onVideoEndHandler}
						playInBackground={false}
						playWhenInactive={false}
						style={styles.videoObject}
						fullscreen={fullScreen}
						ref={this.playerRef}
						onFullscreenPlayerDidDismiss={this.onExitFullScreenHandler}
						onFullscreenPlayerWillPresent={this.onFullScreenPresentHandler}
						useTextureView={true}
					/>
					<VideoControls
						showPlayButton={showPlayButton}
						muted={muted}
						replayVideo={replayVideo}
						replayVideoText={replayVideoText}
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
		this.setState({
			muted: !this.state.muted,
		});
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
		if (Platform.OS === OS_TYPES.Android) {
			this.setState({
				resizeMode: this.state.resizeMode === 'cover' ? 'contain' : 'cover',
			});
			NativeModules.BridgeModule.showFullscreen(this.props.videoURL, 0);
			return;
		}
		if (this.props.resizeToChangeAspectRatio) {
			this.setState({
				resizeMode: this.state.resizeMode === 'cover' ? 'contain' : 'cover',
			});
		} else {
			if (!this.state.replayVideo) {
				this.setState({ fullScreen: true, muted: false });
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

		this.playerRef.current!.seek(0);
	};

	private onFullScreenPresentHandler = () => {
		this.setState({ paused: true });
	};
}
