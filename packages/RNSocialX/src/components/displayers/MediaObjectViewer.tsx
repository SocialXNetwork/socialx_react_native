import * as React from 'react';
import { Dimensions, Image, StyleProp, Text, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';
import * as mime from 'react-native-mime-types';

import { WithConfig } from '../../enhancers/connectors/app/WithConfig';

import { IVideoOptions, TouchableWithDoublePress, VideoPlayer } from '../';
import {
	IMediaTypes,
	IOnMove,
	ITranslatedProps,
	MediaTypeImage,
	MediaTypeVideo,
} from '../../types';

import styles from './MediaObjectViewer.style';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface IMediaObjectViewerProps extends IVideoOptions, ITranslatedProps {
	hash?: string;
	path?: string;
	extension?: string;
	fullscreen?: boolean;
	type?: IMediaTypes;
	defaultScale?: boolean;
	resizeMode?: 'cover' | 'contain' | 'stretch';
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
	onDoublePress?: () => void;
	onMove?: (position?: IOnMove) => void;
}

interface IProps extends IMediaObjectViewerProps {
	IPFS_URL: string;
}

interface IState {
	image: { width: number; height: number };
}

class Component extends React.Component<IProps, IState> {
	public state = {
		image: { width: 0, height: 0 },
	};

	private uri: string = '';
	private mimeType: string = '';
	private ref = React.createRef<ImageZoom>();

	constructor(props: IProps) {
		super(props);

		const { hash, path, type, extension, IPFS_URL } = props;
		this.uri = path ? path : IPFS_URL + hash;
		this.mimeType = this.getMimeType(this.uri, type, extension);
	}

	public componentDidMount() {
		if (this.props.hash && this.mimeType.startsWith(MediaTypeImage.key)) {
			Image.getSize(
				this.uri,
				(width, height) => this.setState({ image: { width, height } }),
				(e) => console.log(e),
			);
		}
	}

	public render() {
		const {
			fullscreen,
			defaultScale,
			resizeMode,
			style,
			onPress,
			onDoublePress,
			onMove,
			getText,
		} = this.props;
		const heightRatio = SCREEN_WIDTH / this.state.image.width;

		return (
			<View>
				{!this.mimeType && <Text>{getText('message.media.not.supported')}</Text>}
				{this.mimeType && this.mimeType.startsWith(MediaTypeImage.key) && (
					<TouchableWithDoublePress
						style={style}
						disabled={!onPress && !onDoublePress}
						onSinglePress={onPress}
						onDoublePress={onDoublePress}
					>
						{fullscreen && (
							<ImageZoom
								ref={this.ref}
								panToMove={defaultScale ? false : true}
								cropWidth={SCREEN_WIDTH}
								cropHeight={SCREEN_HEIGHT}
								imageWidth={SCREEN_WIDTH}
								imageHeight={this.state.image.height * heightRatio}
								onMove={onMove}
								onClick={this.onResetHandler}
							>
								<FastImage
									source={{ uri: this.uri, priority: FastImage.priority.normal }}
									resizeMode={
										resizeMode === 'contain'
											? FastImage.resizeMode.contain
											: FastImage.resizeMode.cover
									}
									style={{
										width: SCREEN_WIDTH,
										height: this.state.image.height * heightRatio,
									}}
								/>
							</ImageZoom>
						)}
						{!fullscreen && (
							<FastImage
								source={{ uri: this.uri, priority: FastImage.priority.normal }}
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
				{this.mimeType && this.mimeType.startsWith(MediaTypeVideo.key) && (
					<VideoPlayer
						uri={this.uri}
						resizeMode={resizeMode}
						containerStyle={style}
						getText={getText}
					/>
				)}
			</View>
		);
	}

	private getMimeType = (uri: string, type: IMediaTypes | undefined, extension?: string) => {
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

	private onResetHandler = () => {
		if (this.props.onPress && this.ref.current) {
			this.ref.current.reset();
			this.props.onPress();
		}
	};
}

export const MediaObjectViewer: React.SFC<IMediaObjectViewerProps> = (props) => (
	<WithConfig>
		{({ appConfig }) => <Component IPFS_URL={appConfig.ipfsConfig.ipfs_URL} {...props} />}
	</WithConfig>
);
