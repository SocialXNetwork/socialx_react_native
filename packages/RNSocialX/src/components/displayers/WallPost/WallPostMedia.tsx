import * as React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { IMediaProps, ITranslatedProps } from '../../../types';
import { MediaObjectViewer } from '../MediaObjectViewer';
import style from './WallPostMedia.style';

interface ISingleMediaPostProps extends ITranslatedProps {
	mediaObject: IMediaProps;
	noInteraction: boolean;
	placeholder: boolean;
	onMediaObjectView: (index: number) => void;
	onDoublePress: () => void;
}

const Placeholder: React.SFC<{ extraStyle?: object }> = ({ extraStyle }) => (
	<View style={[style.placeholder, extraStyle]}>
		<ActivityIndicator size="large" color="white" />
	</View>
);

const SingleMediaPost: React.SFC<ISingleMediaPostProps> = ({
	mediaObject,
	noInteraction,
	placeholder,
	onMediaObjectView,
	onDoublePress,
	getText,
}) => {
	return !placeholder ? (
		<MediaObjectViewer
			onPress={() => onMediaObjectView(0)}
			onDoublePress={onDoublePress}
			thumbOnly={noInteraction}
			uri={mediaObject.url}
			style={style.postMediaContainerFullWidth}
			extension={mediaObject.extension}
			getText={getText}
		/>
	) : (
		<Placeholder extraStyle={style.postMediaContainerFullWidth} />
	);
};
interface IDualMediaPostProps extends ITranslatedProps {
	media: IMediaProps[];
	onMediaObjectView: (index: number) => void;
	placeholder: boolean;
}

const DualMediaPost: React.SFC<IDualMediaPostProps> = ({
	media,
	onMediaObjectView,
	placeholder,
	getText,
}) => (
	<View style={style.postMediaContainerFullWidth}>
		{!placeholder ? (
			<React.Fragment>
				<View style={style.fullHeightHalfWidth}>
					<MediaObjectViewer
						onPress={() => onMediaObjectView(0)}
						thumbOnly={true}
						uri={media[0].url}
						style={style.fullWidthHeight}
						extension={media[0].extension}
						getText={getText}
					/>
				</View>
				<View style={style.fullHeightHalfWidth}>
					<MediaObjectViewer
						onPress={() => onMediaObjectView(1)}
						thumbOnly={true}
						uri={media[1].url}
						style={style.fullWidthHeight}
						extension={media[1].extension}
						getText={getText}
					/>
				</View>
			</React.Fragment>
		) : (
			<Placeholder />
		)}
	</View>
);

interface IMultiMediaPostProps extends ITranslatedProps {
	media: IMediaProps[];
	placeholder: boolean;
	onMediaObjectView: (index: number) => void;
}

const MultiMediaPost: React.SFC<IMultiMediaPostProps> = ({
	media,
	onMediaObjectView,
	placeholder,
	getText,
}) => {
	const numberOfMoremedia = media.length - 3;
	return (
		<View style={style.postMediaContainerFullWidth}>
			{!placeholder ? (
				<React.Fragment>
					<View style={style.fullHeightHalfWidth}>
						<MediaObjectViewer
							onPress={() => onMediaObjectView(0)}
							thumbOnly={true}
							uri={media[0].url}
							style={style.fullWidthHeight}
							extension={media[0].extension}
							getText={getText}
						/>
					</View>
					<View style={style.fullHeightHalfWidth}>
						<View style={style.fullWidthHalfHeight}>
							<MediaObjectViewer
								onPress={() => onMediaObjectView(1)}
								thumbOnly={true}
								uri={media[1].url}
								extension={media[1].extension}
								getText={getText}
							/>
						</View>
						<TouchableOpacity
							style={style.fullWidthHalfHeight}
							activeOpacity={1}
							onPress={() => onMediaObjectView(2)}
						>
							<MediaObjectViewer
								thumbOnly={true}
								uri={media[2].url}
								style={style.fullWidthHeight}
								extension={media[2].extension}
								getText={getText}
							/>

							{numberOfMoremedia > 0 && (
								<View style={style.moreOverlay}>
									<Text style={style.moreText}>{`+${numberOfMoremedia} more`}</Text>
								</View>
							)}
						</TouchableOpacity>
					</View>
				</React.Fragment>
			) : (
				<Placeholder />
			)}
		</View>
	);
};

interface IWallPostMediaProps extends ITranslatedProps {
	media: IMediaProps[];
	onMediaObjectView: (index: number) => void;
	onDoublePress: () => void;
	noInteraction?: boolean;
	placeholder?: boolean;
}

export const WallPostMedia: React.SFC<IWallPostMediaProps> = ({
	media,
	noInteraction = false,
	placeholder = false,
	onMediaObjectView = () => undefined,
	onDoublePress = () => undefined,
	getText,
}) => {
	return (
		<React.Fragment>
			{media.length > 2 && (
				<MultiMediaPost
					media={media}
					onMediaObjectView={onMediaObjectView}
					placeholder={placeholder}
					getText={getText}
				/>
			)}
			{media.length === 2 && (
				<DualMediaPost
					media={media}
					onMediaObjectView={onMediaObjectView}
					placeholder={placeholder}
					getText={getText}
				/>
			)}
			{media.length === 1 && (
				<SingleMediaPost
					mediaObject={media[0]}
					noInteraction={noInteraction}
					onMediaObjectView={onMediaObjectView}
					onDoublePress={onDoublePress}
					placeholder={placeholder}
					getText={getText}
				/>
			)}
		</React.Fragment>
	);
};
