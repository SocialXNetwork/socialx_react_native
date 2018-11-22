import React, { Component } from 'react';
import { NativeModules, Platform, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';

import styles from './AndroidPlayer.styles';

export interface IAndroidPlayerProps {
	video: { uri: string };
	thumbnail?: { uri: string };
	videoWidth?: number;
	videoHeight?: number;
	duration?: number;
	autoplay: boolean;
	defaultMuted?: boolean;
	muted?: boolean;
	style?: any;
	controlsTimeout?: number;
	disableControlsAutoHide?: boolean;
	loop?: boolean;
	resizeMode?: 'cover' | 'contain' | 'stretch';
	hideControlsOnStart?: boolean;
	endWithThumbnail?: boolean;
	customStyles?: {
		wrapper: any;
		video: any;
		videoWrapper: any;
		controls: any;
		playControl: any;
		controlButton: any;
		controlIcon: any;
		playIcon: any;
		seekBar: any;
		seekBarFullWidth: any;
		seekBarProgress: any;
		seekBarKnob: any;
		seekBarKnobSeeking: any;
		seekBarBackground: any;
		thumbnail: any;
		playButton: any;
		playArrow: any;
	};
	onEnd?: (event: any) => void;
	onProgress?: (event: any) => void;
	onLoad?: (event: any) => void;
}

export interface IAndroidPlayerState {
	isStarted: boolean;
	isPlaying: boolean;
	width: number;
	progress: number;
	isMuted: boolean;
	isControlsVisible: boolean;
	duration: number;
	isSeeking: boolean;
}

export default class Player extends Component<IAndroidPlayerProps, IAndroidPlayerState> {
	static defaultProps = {
		videoWidth: 1280,
		videoHeight: 720,
		autoplay: false,
		controlsTimeout: 2000,
		loop: false,
		resizeMode: 'contain',
		customStyles: {},
	};

	private player: any;

	private seekBarWidth: number;
	private wasPlayingBeforeSeek: boolean;
	private seekTouchStart: number;
	private seekProgressStart: number;

	private controlsTimeout: any;

	constructor(props: IAndroidPlayerProps) {
		super(props);

		this.state = {
			isStarted: props.autoplay,
			isPlaying: props.autoplay,
			width: 200,
			progress: 0,
			isMuted: true,
			isControlsVisible: !props.hideControlsOnStart,
			duration: 0,
			isSeeking: false,
		};

		this.seekBarWidth = 200;
		this.wasPlayingBeforeSeek = props.autoplay;
		this.seekTouchStart = 0;
		this.seekProgressStart = 0;
	}

	componentDidMount() {
		if (this.props.autoplay) {
			this.hideControls();
		}
	}

	componentWillUnmount() {
		if (this.controlsTimeout) {
			clearTimeout(this.controlsTimeout);
			this.controlsTimeout = null;
		}
	}

	public onLayout = (event: any) => {
		const { width } = event.nativeEvent.layout;
		this.setState({
			width,
		});
	};

	public onStartPress = () => {
		this.setState({
			isPlaying: true,
			isStarted: true,
		});

		this.hideControls();
	};

	public onProgress = (event: any) => {
		if (this.state.isSeeking) {
			return;
		}
		if (this.props.onProgress) {
			this.props.onProgress(event);
		}
		this.setState({
			progress: event.currentTime / (this.props.duration || this.state.duration),
		});
	};

	public onEnd = (event?: any) => {
		if (this.props.onEnd) {
			this.props.onEnd(event);
		}

		if (this.props.endWithThumbnail) {
			this.setState({ isStarted: false });
			this.player.dismissFullscreenPlayer();
		}

		this.player.seek(0);
		if (!this.props.loop) {
			this.setState({
				isPlaying: false,
			});
		}
	};

	public onLoad = (event: any) => {
		if (this.props.onLoad) {
			this.props.onLoad(event);
		}

		const { duration } = event;
		this.setState({ duration });
	};

	public onPlayPress = () => {
		this.setState({
			isPlaying: !this.state.isPlaying,
		});
		this.showControls();
	};

	public onMutePress = () => {
		this.setState({
			isMuted: !this.state.isMuted,
		});
		this.showControls();
	};

	public onToggleFullScreen = () => {
		const durationToSeek = 0;
		const uri = this.props.video.uri;
		NativeModules.BridgeModule.showFullscreen(uri, durationToSeek);
	};

	public onSeekBarLayout({ nativeEvent }: any) {
		this.seekBarWidth = nativeEvent.layout.width - 20;
	}

	public onSeekStartResponder = () => {
		return true;
	};

	public onSeekMoveResponder = () => {
		return true;
	};

	public onSeekGrant = (e: any) => {
		this.seekTouchStart = e.nativeEvent.pageX;
		this.seekProgressStart = this.state.progress;
		this.wasPlayingBeforeSeek = this.state.isPlaying;
		this.setState({
			isSeeking: true,
			isPlaying: false,
		});
	};

	public onSeekRelease = () => {
		this.setState({
			isSeeking: false,
			isPlaying: this.wasPlayingBeforeSeek,
		});
		this.showControls();
	};

	public onSeek = (e: any) => {
		const diff = e.nativeEvent.pageX - this.seekTouchStart;
		const ratio = 100 / this.seekBarWidth;
		const progress = this.seekProgressStart + (ratio * diff) / 100;

		this.setState({
			progress,
		});

		this.player.seek(progress * this.state.duration);
	};

	public getSizeStyles = () => {
		const { videoWidth, videoHeight } = this.props;
		if (videoWidth && videoHeight) {
			const { width } = this.state;
			const ratio = videoHeight / videoWidth;
			return {
				height: width * ratio,
				width,
			};
		}
	};

	public hideControls = () => {
		if (this.props.disableControlsAutoHide) {
			return;
		}

		if (this.controlsTimeout) {
			clearTimeout(this.controlsTimeout);
			this.controlsTimeout = null;
		}
		this.controlsTimeout = setTimeout(() => {
			this.setState({ isControlsVisible: false });
		}, this.props.controlsTimeout);
	};

	public showControls = () => {
		this.setState({
			isControlsVisible: true,
		});
		this.hideControls();
	};

	public renderStartButton = () => {
		return (
			<TouchableOpacity style={[styles.playButton]} onPress={this.onStartPress}>
				<Icon style={[styles.playArrow]} name="play-arrow" size={42} />
			</TouchableOpacity>
		);
	};

	public renderThumbnail = () => {
		const { thumbnail, style, ...props } = this.props;
		return (
			<View
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					justifyContent: 'center',
					alignItems: 'center',
				}}
				key={Math.floor((Math.random() / 2) * 100)}
			>
				{this.renderStartButton()}
			</View>
		);
	};

	public renderSeekBar = (fullWidth?: boolean) => {
		return (
			<View style={[styles.seekBar]} onLayout={this.onSeekBarLayout}>
				<View style={[{ flexGrow: this.state.progress }, styles.seekBarProgress]} />
				{!fullWidth ? (
					<View
						style={[styles.seekBarKnob, this.state.isSeeking ? { transform: [{ scale: 1 }] } : {}]}
						hitSlop={{ top: 20, bottom: 20, left: 10, right: 20 }}
						onStartShouldSetResponder={this.onSeekStartResponder}
						// check this
						// onMoveShouldSetPanResponder={this.onSeekMoveResponder}
						onResponderGrant={this.onSeekGrant}
						onResponderMove={this.onSeek}
						onResponderRelease={this.onSeekRelease}
						onResponderTerminate={this.onSeekRelease}
					/>
				) : null}
				<View style={[styles.seekBarBackground, { flexGrow: 1 - this.state.progress }]} />
			</View>
		);
	};

	public renderControls = () => {
		return (
			<View style={[styles.controls]}>
				<TouchableOpacity onPress={this.onPlayPress}>
					<Icon
						style={[styles.playControl]}
						name={this.state.isPlaying ? 'pause' : 'play-arrow'}
						size={32}
					/>
				</TouchableOpacity>
				{this.renderSeekBar()}
				{this.props.muted ? null : (
					<TouchableOpacity onPress={this.onMutePress}>
						<Icon
							style={[styles.extraControl]}
							name={this.state.isMuted ? 'volume-off' : 'volume-up'}
							size={24}
						/>
					</TouchableOpacity>
				)}
				<TouchableOpacity onPress={this.onToggleFullScreen}>
					<Icon style={[styles.extraControl]} name="fullscreen" size={32} />
				</TouchableOpacity>
			</View>
		);
	};

	public renderVideo = () => {
		const { video, style, resizeMode, ...props } = this.props;
		return (
			<View>
				<Video
					{...props}
					style={[styles.video, this.getSizeStyles(), style]}
					ref={(p) => {
						this.player = p;
					}}
					muted={this.props.muted || this.state.isMuted}
					paused={!this.state.isPlaying}
					onProgress={this.onProgress}
					onEnd={this.onEnd}
					onLoad={this.onLoad}
					source={video}
					resizeMode={'contain'}
				/>
				<View style={[this.getSizeStyles(), { marginTop: -this.getSizeStyles()!.height }]}>
					<TouchableOpacity style={styles.overlayButton} onPress={this.showControls} />
				</View>
				{!this.state.isPlaying || this.state.isControlsVisible
					? this.renderControls()
					: this.renderSeekBar(true)}
			</View>
		);
	};

	public renderContent = () => {
		const { thumbnail, style } = this.props;
		const { isStarted } = this.state;

		if (!isStarted && thumbnail) {
			// return this.renderThumbnail();
			return null;
		} else if (!isStarted) {
			return (
				<View style={[styles.preloadingPlaceholder, this.getSizeStyles(), style]}>
					{this.renderStartButton()}
				</View>
			);
		}
		return this.renderVideo();
	};

	render() {
		return <View onLayout={this.onLayout}>{this.renderContent()}</View>;
	}
}
