import * as React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import * as mime from 'react-native-mime-types';

import { WithConfig } from '../../enhancers/connectors/app/WithConfig';

import { IVideoOptions, TouchableWithDoublePress, VideoPlayer } from '../';
import { IMediaTypes, ITranslatedProps, MediaTypeImage, MediaTypeVideo } from '../../types';

interface IMediaObjectViewerProps extends IVideoOptions, ITranslatedProps {
	hash?: string;
	path?: string;
	extension?: string;
	type?: IMediaTypes;
	resizeMode?: 'cover' | 'contain' | 'stretch';
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
	path,
	style: customStyle,
	resizeMode,
	extension,
	type,
	onPress = () => undefined,
	onDoublePress = () => undefined,
	getText,
}) => {
	const uri = path ? path : IPFS_URL + hash;
	const mediaMimeType = getMimeType(uri, type, extension);

	return (
		<View>
			{!mediaMimeType && <Text>{getText('message.media.not.supported')}</Text>}
			{mediaMimeType && mediaMimeType.startsWith(MediaTypeImage.key) && (
				<TouchableWithDoublePress
					onSinglePress={onPress}
					onDoublePress={onDoublePress}
					disabled={!onPress && !onDoublePress}
					style={customStyle}
				>
					<FastImage
						source={{ uri, priority: FastImage.priority.normal }}
						resizeMode={
							resizeMode === 'contain' ? FastImage.resizeMode.contain : FastImage.resizeMode.cover
						}
						style={styles.image}
					/>
				</TouchableWithDoublePress>
			)}
			{mediaMimeType && mediaMimeType.startsWith(MediaTypeVideo.key) && (
				<VideoPlayer
					uri={uri}
					resizeMode={resizeMode}
					containerStyle={customStyle}
					getText={getText}
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
