import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IMedia } from '../../../types';
import { MediaObjectViewer } from '../MediaObjectViewer';

import styles from './WallPostMedia.style';

interface ISingleMediaPostProps {
	media: IMedia;
	creating: boolean;
	onMediaObjectView: (index: number) => void;
	onDoublePress: () => void;
}

const SingleMediaPost: React.SFC<ISingleMediaPostProps> = ({
	media,
	creating,
	onMediaObjectView,
	onDoublePress,
}) => (
	<MediaObjectViewer
		hash={!creating ? media.hash : undefined}
		// This is because the typing of media will be IOptimizedMedia when displaying the placeholder post
		// @ts-ignore
		path={creating ? media.path : undefined}
		dimensions={media.dimensions}
		extension={media.extension}
		style={styles.fullWidth}
		onPress={() => onMediaObjectView(0)}
		onDoublePress={onDoublePress}
	/>
);
interface IDualMediaPostProps {
	media: IMedia[];
	onMediaObjectView: (index: number) => void;
	creating: boolean;
}

const DualMediaPost: React.SFC<IDualMediaPostProps> = ({ media, onMediaObjectView, creating }) => (
	<View style={styles.fullWidth}>
		<View style={styles.fullHeightHalfWidth}>
			<MediaObjectViewer
				hash={!creating ? media[0].hash : undefined}
				// This is because the typing of media will be IOptimizedMedia when displaying the placeholder post
				// @ts-ignore
				path={creating ? media[0].path : undefined}
				dimensions={media[0].dimensions}
				extension={media[0].extension}
				style={[styles.fullWidthHeight, styles.rightBorder]}
				onPress={() => onMediaObjectView(0)}
			/>
		</View>
		<View style={styles.fullHeightHalfWidth}>
			<MediaObjectViewer
				hash={!creating ? media[1].hash : undefined}
				// This is because the typing of media will be IOptimizedMedia when displaying the placeholder post
				// @ts-ignore
				path={creating ? media[1].path : undefined}
				dimensions={media[1].dimensions}
				extension={media[1].extension}
				style={[styles.fullWidthHeight, styles.leftBorder]}
				onPress={() => onMediaObjectView(1)}
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
		<View style={styles.fullWidth}>
			<View style={styles.fullHeightHalfWidth}>
				<MediaObjectViewer
					hash={!creating ? media[0].hash : undefined}
					// This is because the typing of media will be IOptimizedMedia when displaying the placeholder post
					// @ts-ignore
					path={creating ? media[0].path : undefined}
					dimensions={media[0].dimensions}
					extension={media[0].extension}
					style={[styles.fullWidthHeight, styles.rightBorder]}
					onPress={() => onMediaObjectView(0)}
				/>
			</View>
			<View style={[styles.fullHeightHalfWidth, styles.leftBorder]}>
				<View style={[styles.fullWidthHalfHeight, styles.bottomBorder]}>
					<MediaObjectViewer
						hash={!creating ? media[1].hash : undefined}
						// This is because the typing of media will be IOptimizedMedia when displaying the placeholder post
						// @ts-ignore
						path={creating ? media[1].path : undefined}
						dimensions={media[1].dimensions}
						extension={media[1].extension}
						onPress={() => onMediaObjectView(1)}
					/>
				</View>
				<TouchableOpacity
					style={[styles.fullWidthHalfHeight, styles.topBorder]}
					activeOpacity={1}
					onPress={() => onMediaObjectView(2)}
				>
					<MediaObjectViewer
						hash={!creating ? media[2].hash : undefined}
						// This is because the typing of media will be IOptimizedMedia when displaying the placeholder post
						// @ts-ignore
						path={creating ? media[2].path : undefined}
						dimensions={media[0].dimensions}
						extension={media[2].extension}
						style={styles.fullWidthHeight}
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
	creating?: boolean;
	onMediaObjectView: (index: number) => void;
	onDoublePress: () => void;
}

export const WallPostMedia: React.SFC<IWallPostMediaProps> = ({
	media,
	creating = false,
	onMediaObjectView,
	onDoublePress,
}) => (
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
				creating={creating}
				onMediaObjectView={onMediaObjectView}
				onDoublePress={onDoublePress}
			/>
		)}
	</React.Fragment>
);
