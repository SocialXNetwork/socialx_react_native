import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {IMediaProps, ITranslatedProps} from '../../../types';
import {MediaObjectViewer} from '../MediaObjectViewer';
import style from './WallPostMedia.style';

interface ISingleMediaPostProps extends ITranslatedProps {
	mediaObject: IMediaProps;
	noInteraction: boolean;
	onMediaObjectView: (index: number) => void;
	onLikeButtonPressed: () => void;
}

const SingleMediaPost: React.SFC<ISingleMediaPostProps> = ({
	mediaObject,
	noInteraction,
	onMediaObjectView,
	onLikeButtonPressed,
	getText,
}) => (
	// @ts-ignore
	<MediaObjectViewer
		onPress={() => onMediaObjectView(0)}
		onDoublePress={onLikeButtonPressed}
		thumbOnly={noInteraction}
		uri={mediaObject.url}
		style={style.postMediaContainerFullWidth}
		extension={mediaObject.extension}
		getText={getText}
	/>
);

interface IDualMediaPostProps extends ITranslatedProps {
	mediaObjects: IMediaProps[];
	onMediaObjectView: (index: number) => void;
}

const DualMediaPost: React.SFC<IDualMediaPostProps> = ({mediaObjects, onMediaObjectView, getText}) => (
	<View style={style.postMediaContainerFullWidth}>
		<View style={style.fullHeightHalfWidth}>
			{
				// @ts-ignore
				<MediaObjectViewer
					onPress={() => onMediaObjectView(0)}
					thumbOnly={true}
					uri={mediaObjects[0].url}
					style={style.fullWidthHeight}
					extension={mediaObjects[0].extension}
					getText={getText}
				/>
			}
		</View>
		<View style={style.fullHeightHalfWidth}>
			{
				// @ts-ignore
				<MediaObjectViewer
					onPress={() => onMediaObjectView(1)}
					thumbOnly={true}
					uri={mediaObjects[1].url}
					style={style.fullWidthHeight}
					extension={mediaObjects[1].extension}
					getText={getText}
				/>
			}
		</View>
	</View>
);

interface IMultiMediaPostProps extends ITranslatedProps {
	mediaObjects: IMediaProps[];
	onMediaObjectView: (index: number) => void;
}

const MultiMediaPost: React.SFC<IMultiMediaPostProps> = ({mediaObjects, onMediaObjectView, getText}) => {
	const numberOfMoreMediaObjects = mediaObjects.length - 3;
	return (
		<View style={style.postMediaContainerFullWidth}>
			<View style={style.fullHeightHalfWidth}>
				{
					// @ts-ignore
					<MediaObjectViewer
						onPress={() => onMediaObjectView(0)}
						thumbOnly={true}
						uri={mediaObjects[0].url}
						style={style.fullWidthHeight}
						extension={mediaObjects[0].extension}
						getText={getText}
					/>
				}
			</View>
			<View style={style.fullHeightHalfWidth}>
				<View style={style.fullWidthHalfHeight}>
					{
						// @ts-ignore
						<MediaObjectViewer
							onPress={() => onMediaObjectView(1)}
							thumbOnly={true}
							uri={mediaObjects[1].url}
							extension={mediaObjects[1].extension}
							getText={getText}
						/>
					}
				</View>
				<TouchableOpacity style={style.fullWidthHalfHeight} onPress={() => onMediaObjectView(2)}>
					{
						// @ts-ignore
						<MediaObjectViewer
							thumbOnly={true}
							uri={mediaObjects[2].url}
							style={style.fullWidthHeight}
							extension={mediaObjects[2].extension}
							getText={getText}
						/>
					}
					{numberOfMoreMediaObjects > 0 && (
						<View style={style.moreOverlay}>
							<Text style={style.moreText}>{`+${numberOfMoreMediaObjects} more`}</Text>
						</View>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};

interface IWallPostMediaProps extends ITranslatedProps {
	mediaObjects: IMediaProps[];
	onMediaObjectView: (index: number) => void;
	onLikeButtonPressed: () => void;
	noInteraction?: boolean;
}

export const WallPostMedia: React.SFC<IWallPostMediaProps> = ({
	mediaObjects,
	noInteraction = false,
	getText,
	onMediaObjectView = () => {
		/**/
	},
	onLikeButtonPressed = () => {
		/**/
	},
}) => {
	return (
		<React.Fragment>
			{mediaObjects.length > 2 && (
				<MultiMediaPost mediaObjects={mediaObjects} onMediaObjectView={onMediaObjectView} getText={getText} />
			)}
			{mediaObjects.length === 2 && (
				<DualMediaPost mediaObjects={mediaObjects} onMediaObjectView={onMediaObjectView} getText={getText} />
			)}
			{mediaObjects.length === 1 && (
				<SingleMediaPost
					mediaObject={mediaObjects[0]}
					noInteraction={noInteraction}
					onMediaObjectView={onMediaObjectView}
					onLikeButtonPressed={onLikeButtonPressed}
					getText={getText}
				/>
			)}
		</React.Fragment>
	);
};
