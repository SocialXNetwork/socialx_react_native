import * as React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { IMedia, ITranslatedProps } from '../../../types';
import { MediaObjectViewer } from '../MediaObjectViewer';
import style from './WallPostMedia.style';

interface ISingleMediaPostProps extends ITranslatedProps {
	media: IMedia;
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
	media,
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
			hash={media.hash}
			style={style.postMediaContainerFullWidth}
			extension={media.extension}
			getText={getText}
		/>
	) : (
		<Placeholder extraStyle={style.postMediaContainerFullWidth} />
	);
};
interface IDualMediaPostProps extends ITranslatedProps {
	media: IMedia[];
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
						hash={media[0].hash}
						style={style.fullWidthHeight}
						extension={media[0].extension}
						getText={getText}
					/>
				</View>
				<View style={style.fullHeightHalfWidth}>
					<MediaObjectViewer
						onPress={() => onMediaObjectView(1)}
						thumbOnly={true}
						hash={media[1].hash}
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
	media: IMedia[];
	placeholder: boolean;
	onMediaObjectView: (index: number) => void;
}

const MultiMediaPost: React.SFC<IMultiMediaPostProps> = ({
	media,
	onMediaObjectView,
	placeholder,
	getText,
}) => {
	const remainingMedia = media.length - 3;

	return (
		<View style={style.postMediaContainerFullWidth}>
			{!placeholder ? (
				<React.Fragment>
					<View style={style.fullHeightHalfWidth}>
						<MediaObjectViewer
							onPress={() => onMediaObjectView(0)}
							thumbOnly={true}
							hash={media[0].hash}
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
								hash={media[1].hash}
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
								hash={media[2].hash}
								style={style.fullWidthHeight}
								extension={media[2].extension}
								getText={getText}
							/>

							{remainingMedia > 0 && (
								<View style={style.moreOverlay}>
									<Text style={style.moreText}>{`+${remainingMedia} more`}</Text>
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
	media: IMedia[];
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
					media={media[0]}
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
