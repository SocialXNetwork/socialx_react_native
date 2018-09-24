import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {DataProvider} from 'recyclerlistview';

import {IGridMediaObject, ITranslatedProps} from '../../types';
import {MediaObjectViewer} from './MediaObjectViewer';
import {PhotoGrid} from './PhotoGrid';
import style, {USER_MEDIA_THUMB_SIZE} from './ProfilePhotoGrid.style';

interface IProfilePhotoGridProps extends ITranslatedProps {
	gridMediaProvider: DataProvider;
	loadMorePhotosHandler: () => void;
	onViewMediaFullScreen: (index: number) => void;
	header: any;
	disabled: boolean;
}

interface IGridItemProps extends ITranslatedProps {
	type: React.ReactText;
	mediaData: IGridMediaObject;
	onViewMediaFullScreen: (index: number) => void;
}

const GridItem: React.SFC<IGridItemProps> = ({mediaData, onViewMediaFullScreen, getText}) => {
	const styles = (mediaData.index! - 1) % 3 === 0 ? [style.gridMediaThumb, style.centerGridItem] : style.gridMediaThumb;

	return (
		<TouchableOpacity onPress={() => onViewMediaFullScreen(mediaData.index!)}>
			<MediaObjectViewer type={mediaData.type} uri={mediaData.url} style={styles} thumbOnly={true} getText={getText} />
		</TouchableOpacity>
	);
};

export const ProfilePhotoGrid: React.SFC<IProfilePhotoGridProps> = ({
	loadMorePhotosHandler,
	gridMediaProvider,
	onViewMediaFullScreen,
	disabled,
	header,
	getText,
}) => (
	<PhotoGrid
		thumbWidth={USER_MEDIA_THUMB_SIZE}
		thumbHeight={USER_MEDIA_THUMB_SIZE}
		renderGridItem={(type: React.ReactText, data: IGridMediaObject) => (
			<GridItem type={type} mediaData={data} onViewMediaFullScreen={onViewMediaFullScreen} getText={getText} />
		)}
		onLoadMore={loadMorePhotosHandler}
		dataProvider={gridMediaProvider}
		header={header}
		scrollViewProps={{
			bounces: true,
			showsVerticalScrollIndicator: false,
			scrollEnabled: !disabled,
		}}
	/>
);
