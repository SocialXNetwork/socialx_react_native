import * as React from 'react';
import { DataProvider } from 'recyclerlistview';

import { IMedia, ITranslatedProps } from '../../types';
import { MediaObjectViewer } from './MediaObjectViewer';
import { PhotoGrid } from './PhotoGrid';

import styles from './ProfilePhotoGrid.style';

interface IProfilePhotoGridProps extends ITranslatedProps {
	dataProvider: DataProvider;
	header: {
		element: JSX.Element;
		height: number;
	};
	scrollEnabled?: boolean;
	extendedState?: object;
	onLoadMorePhotos: () => void;
	onViewMedia: (index: number) => void;
}

interface IGridItemProps extends ITranslatedProps {
	type: number | string;
	data: IMedia;
	index: number;
	onViewMedia: (index: number) => void;
}

const GridItem: React.SFC<IGridItemProps> = ({ data, index, onViewMedia, getText }) => {
	const style = [styles.item];
	if ((index + 1) % 3 === 0) {
		style.push(styles.center);
	}
	if (index > 3) {
		style.push(styles.border);
	}

	return (
		<MediaObjectViewer
			type={data.type}
			hash={data.hash}
			thumbOnly={true}
			onPress={() => onViewMedia(index)}
			getText={getText}
			style={style}
		/>
	);
};

export const ProfilePhotoGrid: React.SFC<IProfilePhotoGridProps> = ({
	dataProvider,
	header,
	extendedState,
	scrollEnabled = true,
	onViewMedia,
	onLoadMorePhotos,
	getText,
}) => (
	<PhotoGrid
		dataProvider={dataProvider}
		header={header}
		extendedState={extendedState}
		scrollViewProps={{
			showsVerticalScrollIndicator: false,
			scrollEnabled,
		}}
		renderGridItem={(type: number | string, data: IMedia, index: number) => (
			<GridItem type={type} data={data} onViewMedia={onViewMedia} index={index} getText={getText} />
		)}
		onLoadMore={onLoadMorePhotos}
	/>
);
