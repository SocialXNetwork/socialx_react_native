import * as React from 'react';
import {StyleProp, TouchableWithoutFeedback, View, ViewStyle} from 'react-native';

import Video from 'react-native-video';
import {VideoControls} from './';
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
	videoURL: string;
	onPressVideo?: () => void;
	onMuteVideo: () => void;
	onUpdateResizeMode: (newModeResize: 'cover' | 'contain') => void;
}

interface IVideoPlayerState {
	ended: boolean;
	playReady: boolean;
	fullscreen: boolean;
}

export class VideoPlayer extends React.Component<IVideoPlayerProps, IVideoPlayerState> {
	public static defaultProps = {
		containerStyle: styles.container,
		muted: false,
		thumbOnly: false,
		resizeMode: 'cover',
		resizeToChangeAspectRatio: false,
		paused: true,
		onMuteVideo: () => {
			/**/
		},
		onUpdateResizeMode: () => {
			/**/
		},
	};

	private playerRef: React.RefObject<Video> = React.createRef();

	constructor(props: IVideoPlayerProps) {
		super(props);

		this.state = {
			ended: false,
			playReady: false,
			fullscreen: false,
		};
	}

	public render() {
		const {
			containerStyle,
			muted,
			thumbOnly,
			resizeMode,
			resizeToChangeAspectRatio,
			paused,
			videoURL,
			onPressVideo,
			onMuteVideo,
		} = this.props;
		const {ended, playReady, fullscreen} = this.state;

		const showPlayButton = paused || ended;
		const muteIcon = muted ? 'md-volume-off' : 'md-volume-high';

		return (
			<TouchableWithoutFeedback onPress={onPressVideo} disabled={!onPressVideo}>
				<View style={containerStyle}>
					<Video
						onReadyForDisplay={this.videoReadyHandler}
						// poster='https://baconmockup.com/300/200/'
						source={{uri: videoURL}}
						resizeMode={resizeMode}
						paused={paused}
						muted={muted}
						onEnd={this.onVideoEndHandler}
						playInBackground={false}
						playWhenInactive={false}
						style={styles.videoObject}
						fullscreen={fullscreen}
						ref={this.playerRef}
					/>
					<VideoControls
						showPlayButton={showPlayButton}
						muteIcon={muteIcon}
						resizeToChangeAspectRatio={resizeToChangeAspectRatio}
						playReady={playReady}
						thumbOnly={!thumbOnly}
						onVideoPlayStart={this.onVideoPlayStart}
						onVideoMuteToggle={onMuteVideo}
						onVideoEnterFullScreen={this.onVideoEnterFullScreen}
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	private videoReadyHandler = () => {
		// TODO: issue with local video files, see bug report:
		// https://github.com/react-native-community/react-native-video/issues/1195
		if (!this.state.playReady) {
			this.setState({
				playReady: true,
			});
		}
	};

	private onVideoPlayStart = () => {
		if (this.state.ended && this.playerRef.current) {
			this.playerRef.current.seek(0);
		}
		this.setState({
			ended: false,
		});
	};

	private onVideoEndHandler = () => {
		this.setState({
			ended: true,
		});
	};

	private onVideoEnterFullScreen = () => {
		const {resizeToChangeAspectRatio, onUpdateResizeMode, resizeMode} = this.props;
		if (resizeToChangeAspectRatio) {
			onUpdateResizeMode(resizeMode === 'cover' ? 'contain' : 'cover');
		} else {
			this.setState({
				fullscreen: true,
			});
		}
	};
}
