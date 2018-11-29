import * as React from 'react';
import { Image, Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import * as mime from 'react-native-mime-types';
import PhotoView from 'react-native-photo-view';

import { WithConfig } from '../../enhancers/connectors/app/WithConfig';

import { IVideoOptions, TouchableWithDoublePress, VideoPlayer } from '../';
import { OS_TYPES } from '../../environment/consts';
import { IMediaTypes, ITranslatedProps, MediaTypeImage, MediaTypeVideo } from '../../types';

interface IMediaObjectViewerProps extends IVideoOptions, ITranslatedProps {
	hash: string;
	extension?: string;
	type?: IMediaTypes;
	canZoom?: boolean;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
	onDoublePress?: () => void;
}

interface IProps extends IMediaObjectViewerProps {
	IPFS_URL: string;
}

const getMimeType = (uri: string, type: IMediaTypes | undefined, extension?: string) => {
	if (type) {
		return type.key;
	} else if (extension) {
		if (mime.extensions[extension]) {
			return extension;
		}

		return mime.lookup('.' + extension);
	}

	return mime.lookup(uri);
};

export const Component: React.SFC<IProps> = ({
	IPFS_URL,
	hash,
	style: customStyle,
	resizeMode = 'cover',
	extension,
	type,
	getText,
	canZoom = false,
	muted = false,
	thumbOnly,
	paused = true,
	resizeToChangeAspectRatio = false,
	onPress = () => undefined,
	onDoublePress = () => undefined,
}) => {
	const uri = IPFS_URL + hash;
	const ImageComponent =
		Platform.OS === OS_TYPES.Android && uri.startsWith('https://') ? FastImage : Image;
	const mediaMimeType = getMimeType(uri, type, extension);

	return (
		<View>
			{!mediaMimeType && <Text>{getText('message.media.not.supported')}</Text>}
			{!!mediaMimeType && mediaMimeType.startsWith(MediaTypeImage.key) && (
				<TouchableWithDoublePress
					onSinglePress={onPress}
					onDoublePress={onDoublePress}
					disabled={!onPress && !onDoublePress}
					style={customStyle}
				>
					{canZoom && (
						<PhotoView
							source={{ uri }}
							style={styles.image}
							minimumZoomScale={1}
							maximumZoomScale={3}
							androidScaleType="center"
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							androidZoomTransitionDuration={200}
						/>
					)}
					{!canZoom && (
						<ImageComponent
							source={{ uri }}
							resizeMode={
								resizeMode === 'contain' ? FastImage.resizeMode.contain : FastImage.resizeMode.cover
							}
							style={styles.image}
							resizeMethod="resize"
						/>
					)}
				</TouchableWithDoublePress>
			)}
			{mediaMimeType && mediaMimeType.startsWith(MediaTypeVideo.key) && (
				<VideoPlayer
					videoURL={uri}
					onPressVideo={onPress}
					containerStyle={customStyle}
					muted={muted}
					thumbOnly={thumbOnly}
					resizeMode={resizeMode}
					resizeToChangeAspectRatio={resizeToChangeAspectRatio}
					paused={paused}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: '100%',
	},
});

export const MediaObjectViewer: React.SFC<IMediaObjectViewerProps> = (props) => (
	<WithConfig>
		{({ appConfig }) => <Component IPFS_URL={appConfig.ipfsConfig.ipfs_URL} {...props} />}
	</WithConfig>
);
