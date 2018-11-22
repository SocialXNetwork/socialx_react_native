/**
 * TODO list:
 * 1. @Ionut, mute and resize icons on the right side of the video don't show on Android!
 */
import * as React from 'react';
import { ActivityIndicator, Platform, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles, { defaultColor } from './VideoControls.style';

interface IVideoControlsProps {
	showPlayButton: boolean;
	muted: boolean;
	resizeToChangeAspectRatio?: boolean;
	playReady: boolean;
	thumbOnly: boolean;
	replayVideo: boolean;
	onVideoPlayStart: () => void;
	onVideoMuteToggle: () => void;
	onVideoEnterFullScreen: () => void;
	onVideoReplay: () => void;
	replayVideoText: string;
}

export const VideoControls: React.SFC<IVideoControlsProps> = ({
	showPlayButton,
	muted,
	resizeToChangeAspectRatio,
	playReady,
	thumbOnly,
	replayVideo,
	onVideoPlayStart,
	onVideoMuteToggle,
	onVideoEnterFullScreen,
	onVideoReplay,
	replayVideoText,
}) => (
	<React.Fragment>
		{playReady && !thumbOnly && (
			<View style={styles.container}>
				{showPlayButton && (
					<View style={styles.darkBackground}>
						<TouchableOpacity onPress={onVideoPlayStart}>
							<Icon name="md-play-circle" style={styles.playIcon} />
						</TouchableOpacity>
					</View>
				)}
				<TouchableOpacity style={styles.muteButton} onPress={onVideoMuteToggle}>
					<Icon name={muted ? 'ios-volume-off' : 'ios-volume-high'} style={styles.volumeIcon} />
				</TouchableOpacity>
				{resizeToChangeAspectRatio && (
					<TouchableOpacity style={styles.resizeButton} onPress={onVideoEnterFullScreen}>
						<Icon name="md-resize" style={styles.resizeIcon} />
					</TouchableOpacity>
				)}
				{replayVideo && (
					<View style={styles.darkBackground}>
						<TouchableOpacity onPress={onVideoReplay}>
							<Icon name="md-refresh-circle" style={styles.replayIcon} />
							<Text style={styles.replayVideoText}>{replayVideoText}</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		)}
		{thumbOnly && (
			<View style={styles.thumbOverlay}>
				<Icon name="md-videocam" style={styles.thumbVideoIcon} />
			</View>
		)}
		{!playReady && (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={defaultColor} />
			</View>
		)}
	</React.Fragment>
);
