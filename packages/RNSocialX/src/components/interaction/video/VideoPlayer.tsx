import * as React from 'react';
import {StyleProp, TouchableWithoutFeedback, View, ViewStyle} from 'react-native';

import Video from 'react-native-video';
import {VideoControls} from './';
import styles from './VideoPlayer.style';

export interface IVideoOptions {
	containerStyle: StyleProp<ViewStyle>;
	muted: boolean;
	thumbOnly: boolean;
	resizeMode: string;
	resizeToChangeAspectRatio: boolean;
	paused: boolean;
}

interface IVideoPlayerProps extends IVideoOptions {
	videoURL: string;
	onPress: () => void;
}

interface IVideoPlayerState {
	paused: boolean;
	userPaused: boolean;
	muted: boolean;
	ended: boolean;
	resizeMode?: string;
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
		onPress: () => {
			/**/
		},
	};

	public static getDerivedStateFromProps(
		nextProps: Readonly<IVideoPlayerProps>,
		prevState: Readonly<IVideoPlayerState>,
	) {
		if (nextProps.paused !== prevState.paused && !prevState.userPaused) {
			return {
				paused: nextProps.paused,
			};
		}
		return null;
	}

	private playerRef: React.RefObject<Video> = React.createRef();

	constructor(props: IVideoPlayerProps) {
		super(props);

		this.state = {
			paused: this.props.paused,
			userPaused: false,
			muted: this.props.muted || false,
			ended: false,
			resizeMode: this.props.resizeMode,
			playReady: false,
			fullscreen: false,
		};
	}

	public render() {
		const pressHandler = this.props.thumbOnly ? this.props.onPress : this.onVideoPlayPause;
		const touchDisabled = !pressHandler;
		const showPlayButton = this.state.paused || this.state.ended;
		const muteIcon = this.state.muted ? 'md-volume-off' : 'md-volume-up';

		return (
			<TouchableWithoutFeedback onPress={pressHandler} disabled={touchDisabled}>
				<View style={this.props.containerStyle}>
					<Video
						onReadyForDisplay={this.videoReadyHandler}
						// poster='https://baconmockup.com/300/200/'
						source={{uri: this.props.videoURL}}
						resizeMode={this.state.resizeMode}
						paused={this.state.paused}
						muted={this.state.muted}
						onEnd={this.onVideoEndHandler}
						playInBackground={false}
						playWhenInactive={false}
						style={styles.videoObject}
						fullscreen={this.state.fullscreen}
						ref={this.playerRef}
					/>
					<VideoControls
						showPlayButton={showPlayButton}
						muteIcon={muteIcon}
						resizeToChangeAspectRatio={this.props.resizeToChangeAspectRatio}
						playReady={this.state.playReady}
						thumbOnly={this.props.thumbOnly}
						onVideoPlayStart={this.onVideoPlayStart}
						onVideoMuteToggle={this.onVideoMuteToggle}
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
			paused: false,
			ended: false,
			userPaused: false,
		});
	};

	private onVideoPlayPause = () => {
		this.setState({
			paused: true,
			userPaused: true,
		});
	};

	private onVideoMuteToggle = () => {
		this.setState({
			muted: !this.state.muted,
		});
	};

	private onVideoEndHandler = () => {
		this.setState({
			ended: true,
		});
	};

	private onVideoEnterFullScreen = () => {
		if (this.props.resizeToChangeAspectRatio) {
			const resizeMode = this.state.resizeMode === 'cover' ? 'contain' : 'cover';
			this.setState({resizeMode});
		} else {
			this.setState({
				fullscreen: true,
			});
		}
	};
}
