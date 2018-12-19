import * as React from 'react';
import { Dimensions, Image, StyleProp, Text, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';
import * as mime from 'react-native-mime-types';

import styles from './MediaObjectViewer.style';

import { WithConfig } from '../../enhancers/connectors/app/WithConfig';

import { IVideoOptions, TouchableWithDoublePress, VideoPlayer } from '../';
import { IMediaTypes, ITranslatedProps, MediaTypeImage, MediaTypeVideo } from '../../types';

interface IMediaObjectViewerProps extends IVideoOptions, ITranslatedProps {
	hash?: string;
	path?: string;
	extension?: string;
	fullscreen?: boolean;
	type?: IMediaTypes;
	resizeMode?: 'cover' | 'contain' | 'stretch';
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
	onDoublePress?: () => void;
	onMove?: ({ scale }: { scale: number }) => void;
}

interface IProps extends IMediaObjectViewerProps {
	IPFS_URL: string;
}

interface IState {
	imageWidth: number;
	imageHeight: number;
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

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export class Component extends React.Component<IProps, IState> {
	public state = {
		imageWidth: 200,
		imageHeight: 200,
	};

	private pathToMedia = this.props.path ? this.props.path : this.props.IPFS_URL + this.props.hash;

	componentDidMount() {
		Image.getSize(
			this.pathToMedia,
			(width, height) => this.setState({ imageHeight: height, imageWidth: width }),
			(e) => console.log(e),
		);
	}

	render() {
		const {
			type,
			extension,
			onPress,
			onDoublePress,
			fullscreen,
			resizeMode,
			getText,
			style,
			onMove,
		} = this.props;

		const mediaMimeType = getMimeType(this.pathToMedia, type, extension);
		const heightRatio = windowWidth / this.state.imageWidth;

		return (
			<View>
				{!mediaMimeType && <Text>{getText('message.media.not.supported')}</Text>}
				{mediaMimeType && mediaMimeType.startsWith(MediaTypeImage.key) && (
					<TouchableWithDoublePress
						onSinglePress={onPress}
						onDoublePress={onDoublePress}
						disabled={!onPress && !onDoublePress}
						style={style}
					>
						{fullscreen && (
							<ImageZoom
								cropWidth={windowWidth}
								cropHeight={windowHeight}
								imageWidth={this.state.imageWidth}
								imageHeight={this.state.imageHeight * heightRatio}
								enableCenterFocus={false}
								horizontalOuterRangeOffset={() => undefined}
								onMove={onMove}
							>
								<FastImage
									source={{ uri: this.pathToMedia, priority: FastImage.priority.normal }}
									resizeMode={
										resizeMode === 'contain'
											? FastImage.resizeMode.contain
											: FastImage.resizeMode.cover
									}
									style={styles.image}
								/>
							</ImageZoom>
						)}
						{!fullscreen && (
							<FastImage
								source={{ uri: this.pathToMedia, priority: FastImage.priority.normal }}
								resizeMode={
									resizeMode === 'contain'
										? FastImage.resizeMode.contain
										: FastImage.resizeMode.cover
								}
								style={styles.image}
							/>
						)}
					</TouchableWithDoublePress>
				)}
				{mediaMimeType && mediaMimeType.startsWith(MediaTypeVideo.key) && (
					<VideoPlayer
						uri={this.pathToMedia}
						resizeMode={resizeMode}
						containerStyle={style}
						getText={getText}
					/>
				)}
			</View>
		);
	}
}

export const MediaObjectViewer: React.SFC<IMediaObjectViewerProps> = (props) => (
	<WithConfig>
		{({ appConfig }) => <Component IPFS_URL={appConfig.ipfsConfig.ipfs_URL} {...props} />}
	</WithConfig>
);
