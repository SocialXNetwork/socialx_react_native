import * as React from 'react';
import { DataProvider } from 'recyclerlistview';

import { IGridMediaObject, ITranslatedProps } from '../../types';
import { MediaObjectViewer } from './MediaObjectViewer';
import { PhotoGrid } from './PhotoGrid';

import style, { USER_MEDIA_THUMB_SIZE } from './ProfilePhotoGrid.style';

interface IProfilePhotoGridProps extends ITranslatedProps {
	dataProvider: DataProvider;
	header: {
		element: JSX.Element;
		height: number;
	};
	disabled: boolean;
	onLoadMorePhotos: () => void;
	onViewMedia: (index: number) => void;
}

interface IGridItemProps extends ITranslatedProps {
	type: React.ReactText;
	data: IGridMediaObject;
	onViewMedia: (index: number) => void;
}

const GridItem: React.SFC<IGridItemProps> = ({ data, onViewMedia, getText }) => {
	const styles =
		(data.index! - 1) % 3 === 0
			? [style.gridMediaThumb, style.centerGridItem]
			: style.gridMediaThumb;

	return (
		<MediaObjectViewer
			type={data.type}
			uri={data.url}
			style={styles}
			thumbOnly={true}
			onPress={() => onViewMedia(data.index!)}
			getText={getText}
		/>
	);
};

export const ProfilePhotoGrid: React.SFC<IProfilePhotoGridProps> = ({
	onLoadMorePhotos,
	dataProvider,
	onViewMedia,
	disabled,
	header,
	getText,
}) => (
	<PhotoGrid
		thumbWidth={USER_MEDIA_THUMB_SIZE}
		thumbHeight={USER_MEDIA_THUMB_SIZE}
		renderGridItem={(type: React.ReactText, data: IGridMediaObject) => (
			<GridItem type={type} data={data} onViewMedia={onViewMedia} getText={getText} />
		)}
		onLoadMore={onLoadMorePhotos}
		dataProvider={dataProvider}
		header={header}
		scrollViewProps={{
			bounces: true,
			showsVerticalScrollIndicator: false,
			scrollEnabled: !disabled,
		}}
	/>
);
