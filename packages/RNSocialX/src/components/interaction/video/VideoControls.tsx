/**
 * TODO list:
 * 1. @Ionut, mute and resize icons on the right side of the video don't show on Android!
 */
import * as React from 'react';
import {
	ActivityIndicator,
	Platform,
	TouchableOpacity,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { OS_TYPES } from '../../../environment/consts';
import styles, { defaultColor } from './VideoControls.style';

interface IVideoControlsProps {
	showPlayButton: boolean;
	muted: boolean;
	resizeToChangeAspectRatio?: boolean;
	playReady: boolean;
	thumbOnly: boolean;
	onVideoPlayStart: () => void;
	onVideoMuteToggle: () => void;
	onVideoEnterFullScreen: () => void;
}

export const VideoControls: React.SFC<IVideoControlsProps> = ({
	showPlayButton,
	muted,
	resizeToChangeAspectRatio = false,
	playReady,
	thumbOnly,
	onVideoPlayStart,
	onVideoMuteToggle,
	onVideoEnterFullScreen,
}) => (
	<React.Fragment>
		{playReady &&
			!thumbOnly && (
				<View style={styles.container}>
					{showPlayButton && (
						<TouchableOpacity onPress={onVideoPlayStart}>
							<Icon name="md-play" style={styles.playIcon} />
						</TouchableOpacity>
					)}
					<TouchableOpacity
						style={styles.muteButton}
						onPress={onVideoMuteToggle}
					>
						<Icon
							name={muted ? 'ios-volume-off' : 'ios-volume-high'}
							style={styles.smallControlIcon}
						/>
					</TouchableOpacity>
					{(resizeToChangeAspectRatio || Platform.OS === OS_TYPES.IOS) && (
						<TouchableOpacity
							style={styles.resizeButton}
							onPress={onVideoEnterFullScreen}
						>
							<Icon name="md-resize" style={styles.smallControlIcon} />
						</TouchableOpacity>
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
