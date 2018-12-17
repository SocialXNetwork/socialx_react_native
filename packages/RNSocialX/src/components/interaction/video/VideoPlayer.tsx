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
import { VisibleViewPort } from './';
import { VideoControls } from './VideoControls';
import styles from './VideoPlayer.styles';

export interface IVideoOptions {
	containerStyle?: StyleProp<ViewStyle>;
	thumbOnly?: boolean;
	replayVideoText?: string;
}

interface IVideoPlayerProps extends IVideoOptions {
	muted?: boolean;
	videoURL: string;
	replayVideo?: boolean;
	resizeToChangeAspectRatio?: boolean;
	resizeMode?: 'cover' | 'contain' | 'stretch';
	thumbOnly: boolean;
	replayVideoText: string;
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
		const { thumbOnly, containerStyle, replayVideoText, videoURL, resizeMode } = this.props;
		const { fullScreen, playReady, muted, paused, replayVideo } = this.state;

		const showPlayButton = paused;

		return (
			<VisibleViewPort
				onChange={(isVisible: boolean) => this.checkViewPortVisibleHandler(isVisible)}
			>
			<TouchableWithoutFeedback onPress={this.onPauseVideoHandler}>
				<View style={containerStyle}>
					<Video
						onReadyForDisplay={this.onVideoReadyHandler}
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
			// </VisibleViewPort>
		);
	}

	private checkViewPortVisibleHandler = (isVisible: boolean) => {
		const { visibleView, replayVideo } = this.state;

		if (isVisible) {
			if (!visibleView && !replayVideo) {
				this.setState({ paused: false, visibleView: true });
			}
		} else {
			if (visibleView && !replayVideo) {
				this.setState({ paused: true, visibleView: false });
			}
		}
	};

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
			const durationToSeek = 1.0;
			const uri = this.props.videoURL;
			this.setState({ paused: true });
			NativeModules.BridgeModule.showFullscreen(uri, durationToSeek);
		} else {
			if (this.props.resizeToChangeAspectRatio) {
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

		this.playerRef.current!.seek(0);
	};

	private onFullScreenPresentHandler = () => {
		this.setState({ paused: true });
	};
}
