import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {MediaObjectViewer} from '../MediaObjectViewer';
import style from './WallPostMedia.style';

interface IMediaProps {
	type: string;
	url: string;
}

interface ISingleMediaPostProps {
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
}) => (
	// @ts-ignore
	<MediaObjectViewer
		onPress={() => onMediaObjectView(0)}
		onDoublePress={onLikeButtonPressed}
		thumbOnly={noInteraction}
		uri={mediaObject.url}
		style={style.postMediaContainerFullWidth}
		extension={mediaObject.type}
	/>
);

interface IDualMediaPostProps {
	mediaObjects: IMediaProps[];
	onMediaObjectView: (index: number) => void;
}

const DualMediaPost: React.SFC<IDualMediaPostProps> = ({mediaObjects, onMediaObjectView}) => (
	<View style={style.postMediaContainerFullWidth}>
		<View style={style.fullHeightHalfWidth}>
			// @ts-ignore
			<MediaObjectViewer
				onPress={() => onMediaObjectView(0)}
				thumbOnly={true}
				uri={mediaObjects[0].url}
				style={style.fullWidthHeight}
				extension={mediaObjects[0].type}
			/>
		</View>
		<View style={style.fullHeightHalfWidth}>
			// @ts-ignore
			<MediaObjectViewer
				onPress={() => onMediaObjectView(1)}
				thumbOnly={true}
				uri={mediaObjects[1].url}
				style={style.fullWidthHeight}
				extension={mediaObjects[1].type}
			/>
		</View>
	</View>
);

interface IMultiMediaPostProps {
	mediaObjects: IMediaProps[];
	onMediaObjectView: (index: number) => void;
}

const MultiMediaPost: React.SFC<IMultiMediaPostProps> = ({mediaObjects, onMediaObjectView}) => {
	const numberOfMoreMediaObjects = mediaObjects.length - 3;
	return (
		<View style={style.postMediaContainerFullWidth}>
			<View style={style.fullHeightHalfWidth}>
				// @ts-ignore
				<MediaObjectViewer
					onPress={() => onMediaObjectView(0)}
					thumbOnly={true}
					uri={mediaObjects[0].url}
					style={style.fullWidthHeight}
					extension={mediaObjects[0].type}
				/>
			</View>
			<View style={style.fullHeightHalfWidth}>
				// @ts-ignore
				<MediaObjectViewer
					onPress={() => onMediaObjectView(1)}
					thumbOnly={true}
					uri={mediaObjects[1].url}
					style={style.fullWidthHalfHeight}
					extension={mediaObjects[1].type}
				/>
				<TouchableOpacity style={style.fullWidthHalfHeight} onPress={() => onMediaObjectView(2)}>
					// @ts-ignore
					<MediaObjectViewer
						thumbOnly={true}
						uri={mediaObjects[2].url}
						style={style.fullWidthHeight}
						extension={mediaObjects[2].type}
					/>
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

interface IWallPostMediaProps {
	mediaObjects: IMediaProps[];
	onMediaObjectView?: (index: number) => void;
	onLikeButtonPressed?: () => Promise<any>;
	noInteraction?: boolean;
}

export const WallPostMedia: React.SFC<IWallPostMediaProps> = ({
	mediaObjects,
	noInteraction = false,
	onMediaObjectView = () => {
		/**/
	},
	onLikeButtonPressed = () => {
		/**/
	},
}) => {
	return (
		<React.Fragment>
			{mediaObjects.length > 2 && <MultiMediaPost mediaObjects={mediaObjects} onMediaObjectView={onMediaObjectView} />}
			{mediaObjects.length === 2 && <DualMediaPost mediaObjects={mediaObjects} onMediaObjectView={onMediaObjectView} />}
			{mediaObjects.length === 1 && (
				<SingleMediaPost
					mediaObject={mediaObjects[0]}
					noInteraction={noInteraction}
					onMediaObjectView={onMediaObjectView}
					onLikeButtonPressed={onLikeButtonPressed}
				/>
			)}
		</React.Fragment>
	);
};
