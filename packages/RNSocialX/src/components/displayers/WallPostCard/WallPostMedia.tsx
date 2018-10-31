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
	onLikeButtonPressed: () => void;
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
	onLikeButtonPressed,
	getText,
}) => {
	return !placeholder ? (
		<MediaObjectViewer
			onPress={() => onMediaObjectView(0)}
			onDoublePress={onLikeButtonPressed}
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
	mediaObjects: IMediaProps[];
	onMediaObjectView: (index: number) => void;
	placeholder: boolean;
}

const DualMediaPost: React.SFC<IDualMediaPostProps> = ({
	mediaObjects,
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
						uri={mediaObjects[0].url}
						style={style.fullWidthHeight}
						extension={mediaObjects[0].extension}
						getText={getText}
					/>
				</View>
				<View style={style.fullHeightHalfWidth}>
					<MediaObjectViewer
						onPress={() => onMediaObjectView(1)}
						thumbOnly={true}
						uri={mediaObjects[1].url}
						style={style.fullWidthHeight}
						extension={mediaObjects[1].extension}
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
	mediaObjects: IMediaProps[];
	placeholder: boolean;
	onMediaObjectView: (index: number) => void;
}

const MultiMediaPost: React.SFC<IMultiMediaPostProps> = ({
	mediaObjects,
	onMediaObjectView,
	placeholder,
	getText,
}) => {
	const numberOfMoreMediaObjects = mediaObjects.length - 3;
	return (
		<View style={style.postMediaContainerFullWidth}>
			{!placeholder ? (
				<React.Fragment>
					<View style={style.fullHeightHalfWidth}>
						<MediaObjectViewer
							onPress={() => onMediaObjectView(0)}
							thumbOnly={true}
							uri={mediaObjects[0].url}
							style={style.fullWidthHeight}
							extension={mediaObjects[0].extension}
							getText={getText}
						/>
					</View>
					<View style={style.fullHeightHalfWidth}>
						<View style={style.fullWidthHalfHeight}>
							<MediaObjectViewer
								onPress={() => onMediaObjectView(1)}
								thumbOnly={true}
								uri={mediaObjects[1].url}
								extension={mediaObjects[1].extension}
								getText={getText}
							/>
						</View>
						<TouchableOpacity
							style={style.fullWidthHalfHeight}
							onPress={() => onMediaObjectView(2)}
						>
							<MediaObjectViewer
								thumbOnly={true}
								uri={mediaObjects[2].url}
								style={style.fullWidthHeight}
								extension={mediaObjects[2].extension}
								getText={getText}
							/>

							{numberOfMoreMediaObjects > 0 && (
								<View style={style.moreOverlay}>
									<Text style={style.moreText}>{`+${numberOfMoreMediaObjects} more`}</Text>
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
	mediaObjects: IMediaProps[];
	onMediaObjectView: (index: number) => void;
	onLikeButtonPressed: () => void;
	noInteraction?: boolean;
	placeholder?: boolean;
}

export const WallPostMedia: React.SFC<IWallPostMediaProps> = ({
	mediaObjects,
	noInteraction = false,
	placeholder = false,
	getText,
	onMediaObjectView = () => undefined,
	onLikeButtonPressed = () => undefined,
}) => {
	return (
		<React.Fragment>
			{mediaObjects.length > 2 && (
				<MultiMediaPost
					mediaObjects={mediaObjects}
					onMediaObjectView={onMediaObjectView}
					placeholder={placeholder}
					getText={getText}
				/>
			)}
			{mediaObjects.length === 2 && (
				<DualMediaPost
					mediaObjects={mediaObjects}
					onMediaObjectView={onMediaObjectView}
					placeholder={placeholder}
					getText={getText}
				/>
			)}
			{mediaObjects.length === 1 && (
				<SingleMediaPost
					mediaObject={mediaObjects[0]}
					noInteraction={noInteraction}
					onMediaObjectView={onMediaObjectView}
					onLikeButtonPressed={onLikeButtonPressed}
					placeholder={placeholder}
					getText={getText}
				/>
			)}
		</React.Fragment>
	);
};
