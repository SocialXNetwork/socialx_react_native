import React from 'react';
import {Image, Platform, StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
// @ts-ignore
import * as mime from 'react-native-mime-types';
import PhotoView from 'react-native-photo-view';

import {IVideoOptions, TouchableWithDoublePress, VideoPlayer} from '../';
import {OS_TYPES} from '../../environment/consts';
import {ITranslatedProps} from '../../types';

export interface MediaTypes {
	key: string;
	name: string;
	category: string;
}

export const MediaTypeImage: MediaTypes = {
	key: 'image',
	name: 'Photo',
	category: 'Photography',
};

export const MediaTypeVideo: MediaTypes = {
	key: 'video',
	name: 'Video',
	category: 'Videos',
};

export interface IMediaObjectViewerProps extends IVideoOptions, ITranslatedProps {
	uri: string;
	style: StyleProp<ViewStyle>;
	resizeMode: FastImage.ResizeMode;
	extension: string;
	type: MediaTypes;
	onPress: () => void;
	onDoublePress: () => void;
	canZoom: boolean;
}

const getMimeType = (uri: string, type: MediaTypes | undefined, extension: string | undefined) => {
	if (type) {
		return type.key;
	} else if (mime.extensions[extension]) {
		return extension;
	} else if (extension) {
		return mime.lookup('.' + extension);
	}
	return mime.lookup(uri);
};

export const MediaObjectViewer: React.SFC<IMediaObjectViewerProps> = (props) => {
	const {
		uri,
		style: customStyle,
		resizeMode = 'cover',
		extension = 'jpg',
		type = MediaTypeImage,
		onPress,
		onDoublePress,
		getText,
		canZoom = false,
	} = props;
	const ImageComponent = Platform.OS === OS_TYPES.Android && uri.startsWith('https://') ? FastImage : Image;
	const mediaMimeType = getMimeType(uri, type, extension);

	return (
		<View>
			{!mediaMimeType && <Text>{getText('message.media.not.supported')}</Text>}
			{mediaMimeType &&
				mediaMimeType.startsWith(MediaTypeImage.key) && (
					<TouchableWithDoublePress
						onSinglePress={onPress}
						onDoublePress={onDoublePress}
						disabled={!onPress}
						style={customStyle}
					>
						{canZoom && (
							<PhotoView
								source={{uri}}
								style={styles.photoStyle}
								minimumZoomScale={1}
								maximumZoomScale={3}
								androidScaleType={'center'}
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								androidZoomTransitionDuration={200}
							/>
						)}
						{!canZoom && (
							<ImageComponent
								source={{uri}}
								resizeMode={resizeMode}
								style={styles.photoStyle}
								resizeMethod={'resize'}
							/>
						)}
					</TouchableWithDoublePress>
				)}
			{mediaMimeType &&
				mediaMimeType.startsWith(MediaTypeVideo.key) && (
					<VideoPlayer videoURL={uri} containerStyle={customStyle} {...props} />
				)}
		</View>
	);
};

const styles: any = StyleSheet.create({
	photoStyle: {
		width: '100%',
		height: '100%',
	},
});