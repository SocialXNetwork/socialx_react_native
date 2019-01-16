import * as React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { WithI18n } from '../../../enhancers/connectors/app/WithI18n';
import { IDictionary } from '../../../types';

import styles, { defaultColor } from './VideoControls.style';

interface IVideoControlsProps {
	showPlayButton: boolean;
	muted: boolean;
	playReady: boolean;
	thumbOnly: boolean;
	replayVideo: boolean;
	resizeToChangeAspectRatio?: boolean;
	onVideoPlayStart: () => void;
	onVideoMuteToggle: () => void;
	onVideoEnterFullScreen: () => void;
	onVideoReplay: () => void;
}

interface IProps extends IVideoControlsProps, IDictionary {}

const Component: React.SFC<IProps> = ({
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
	dictionary,
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
							<Text style={styles.replayVideoText}>
								{dictionary.components.buttons.video.replay}
							</Text>
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

export const VideoControls: React.SFC<IVideoControlsProps> = (props) => (
	<WithI18n>{({ dictionary }) => <Component {...props} dictionary={dictionary} />}</WithI18n>
);
