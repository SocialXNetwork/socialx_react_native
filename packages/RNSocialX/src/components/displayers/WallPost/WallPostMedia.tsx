import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IMedia } from '../../../types';
import { MediaObjectViewer } from '../MediaObjectViewer';

import styles from './WallPostMedia.style';

interface ISingleMediaPostProps {
	media: IMedia;
	noInteraction: boolean;
	creating: boolean;
	onMediaObjectView: (index: number) => void;
	onDoublePress: () => void;
}

const SingleMediaPost: React.SFC<ISingleMediaPostProps> = ({
	media,
	noInteraction,
	creating,
	onMediaObjectView,
	onDoublePress,
}) => (
	<MediaObjectViewer
		onPress={() => onMediaObjectView(0)}
		onDoublePress={onDoublePress}
		thumbOnly={noInteraction}
		hash={!creating ? media.hash : undefined}
		// This is because the typing of media will be IOptimizedMedia when displaying the placeholder post
		// @ts-ignore
		path={creating ? media.path : undefined}
		style={styles.postMediaContainerFullWidth}
		extension={media.extension}
	/>
);
interface IDualMediaPostProps {
	media: IMedia[];
	onMediaObjectView: (index: number) => void;
	creating: boolean;
}

const DualMediaPost: React.SFC<IDualMediaPostProps> = ({ media, onMediaObjectView, creating }) => (
	<View style={styles.postMediaContainerFullWidth}>
		<View style={styles.fullHeightHalfWidth}>
			<MediaObjectViewer
				onPress={() => onMediaObjectView(0)}
				thumbOnly={true}
				hash={!creating ? media[0].hash : undefined}
				// This is because the typing of media will be IOptimizedMedia when displaying the placeholder post
				// @ts-ignore
				path={creating ? media[0].path : undefined}
				style={[styles.fullWidthHeight, styles.rightBorder]}
				extension={media[0].extension}
			/>
		</View>
		<View style={styles.fullHeightHalfWidth}>
			<MediaObjectViewer
				onPress={() => onMediaObjectView(1)}
				thumbOnly={true}
				hash={!creating ? media[1].hash : undefined}
				// This is because the typing of media will be IOptimizedMedia when displaying the placeholder post
				// @ts-ignore
				path={creating ? media[1].path : undefined}
				style={[styles.fullWidthHeight, styles.leftBorder]}
				extension={media[1].extension}
			/>
		</View>
	</View>
);

interface IMultiMediaPostProps {
	media: IMedia[];
	creating: boolean;
	onMediaObjectView: (index: number) => void;
}

const MultiMediaPost: React.SFC<IMultiMediaPostProps> = ({
	media,
	onMediaObjectView,
	creating,
}) => {
	const remainingMedia = media.length - 3;

	return (
		<View style={styles.postMediaContainerFullWidth}>
			<View style={styles.fullHeightHalfWidth}>
				<MediaObjectViewer
					onPress={() => onMediaObjectView(0)}
					thumbOnly={true}
					hash={!creating ? media[0].hash : undefined}
					// This is because the typing of media will be IOptimizedMedia when displaying the placeholder post
					// @ts-ignore
					path={creating ? media[0].path : undefined}
					style={[styles.fullWidthHeight, styles.rightBorder]}
					extension={media[0].extension}
				/>
			</View>
			<View style={[styles.fullHeightHalfWidth, styles.leftBorder]}>
				<View style={[styles.fullWidthHalfHeight, styles.bottomBorder]}>
					<MediaObjectViewer
						onPress={() => onMediaObjectView(1)}
						thumbOnly={true}
						hash={!creating ? media[1].hash : undefined}
						// This is because the typing of media will be IOptimizedMedia when displaying the placeholder post
						// @ts-ignore
						path={creating ? media[1].path : undefined}
						extension={media[1].extension}
					/>
				</View>
				<TouchableOpacity
					style={[styles.fullWidthHalfHeight, styles.topBorder]}
					activeOpacity={1}
					onPress={() => onMediaObjectView(2)}
				>
					<MediaObjectViewer
						thumbOnly={true}
						hash={!creating ? media[2].hash : undefined}
						// This is because the typing of media will be IOptimizedMedia when displaying the placeholder post
						// @ts-ignore
						path={creating ? media[2].path : undefined}
						style={styles.fullWidthHeight}
						extension={media[2].extension}
					/>
					{remainingMedia > 0 && (
						<View style={styles.overlay}>
							<Text style={styles.text}>{`+ ${remainingMedia}`}</Text>
						</View>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};

interface IWallPostMediaProps {
	media: IMedia[];
	onMediaObjectView: (index: number) => void;
	onDoublePress: () => void;
	noInteraction?: boolean;
	creating?: boolean;
}

export const WallPostMedia: React.SFC<IWallPostMediaProps> = ({
	media,
	noInteraction = false,
	creating = false,
	onMediaObjectView,
	onDoublePress,
}) => {
	return (
		<React.Fragment>
			{media.length > 2 && (
				<MultiMediaPost media={media} onMediaObjectView={onMediaObjectView} creating={creating} />
			)}
			{media.length === 2 && (
				<DualMediaPost media={media} onMediaObjectView={onMediaObjectView} creating={creating} />
			)}
			{media.length === 1 && (
				<SingleMediaPost
					media={media[0]}
					noInteraction={noInteraction}
					onMediaObjectView={onMediaObjectView}
					onDoublePress={onDoublePress}
					creating={creating}
				/>
			)}
		</React.Fragment>
	);
};
