import * as React from 'react';
import {ActivityIndicator, Platform, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {OS_TYPES} from '../../../environment/consts';
import styles, {defaultColor} from './VideoControls.style';

interface IVideoControlsProps {
	showPlayButton: boolean;
	muteIcon: string;
	resizeToChangeAspectRatio: boolean;
	playReady: boolean;
	thumbOnly: boolean;
	onVideoPlayStart: () => void;
	onVideoMuteToggle: () => void;
	onVideoEnterFullScreen: () => void;
}

export const VideoControls: React.SFC<IVideoControlsProps> = ({
	showPlayButton,
	muteIcon,
	resizeToChangeAspectRatio,
	playReady,
	thumbOnly,
	onVideoPlayStart,
	onVideoMuteToggle,
	onVideoEnterFullScreen,
}) => {
	if (playReady) {
		if (!thumbOnly) {
			return (
				<View style={styles.container}>
					{showPlayButton && (
						<TouchableOpacity onPress={onVideoPlayStart}>
							<Icon name={'md-play'} style={styles.playIcon} />
						</TouchableOpacity>
					)}
					<TouchableOpacity style={styles.muteButton} onPress={onVideoMuteToggle}>
						<Icon name={muteIcon} style={styles.smallControlIcon} />
					</TouchableOpacity>
					{(resizeToChangeAspectRatio || Platform.OS === OS_TYPES.IOS) && (
						<TouchableOpacity style={styles.resizeButton} onPress={onVideoEnterFullScreen}>
							<Icon name={'md-resize'} style={styles.smallControlIcon} />
						</TouchableOpacity>
					)}
				</View>
			);
		}

		return (
			<View style={styles.thumbOverlay}>
				<Icon name={'md-videocam'} style={styles.thumbVideoIcon} />
			</View>
		);
	}

	return (
		<View style={styles.controlsView}>
			<ActivityIndicator size={'large'} color={defaultColor} />
		</View>
	);
};
