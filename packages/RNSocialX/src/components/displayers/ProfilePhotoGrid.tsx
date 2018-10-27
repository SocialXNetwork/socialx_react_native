import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { DataProvider } from 'recyclerlistview';

import { IGridMediaObject, ITranslatedProps } from '../../types';
import { MediaObjectViewer } from './MediaObjectViewer';
import { PhotoGrid } from './PhotoGrid';
import style, { USER_MEDIA_THUMB_SIZE } from './ProfilePhotoGrid.style';

interface IProfilePhotoGridProps extends ITranslatedProps {
	dataProvider: DataProvider;
	loadMorePhotosHandler: () => void;
	onViewMediaFullScreen: (index: number) => void;
	header: {
		element: JSX.Element;
		height: number;
	};
	disabled: boolean;
}

interface IGridItemProps extends ITranslatedProps {
	type: React.ReactText;
	data: IGridMediaObject;
	onViewMediaFullScreen: (index: number) => void;
}

const GridItem: React.SFC<IGridItemProps> = ({ data, onViewMediaFullScreen, getText }) => {
	const styles =
		(data.index! - 1) % 3 === 0
			? [style.gridMediaThumb, style.centerGridItem]
			: style.gridMediaThumb;

	return (
		<TouchableOpacity onPress={() => onViewMediaFullScreen(data.index!)}>
			<MediaObjectViewer
				type={data.type}
				uri={data.url}
				style={styles}
				thumbOnly={true}
				getText={getText}
			/>
		</TouchableOpacity>
	);
};

export const ProfilePhotoGrid: React.SFC<IProfilePhotoGridProps> = ({
	loadMorePhotosHandler,
	dataProvider,
	onViewMediaFullScreen,
	disabled,
	header,
	getText,
}) => (
	<PhotoGrid
		thumbWidth={USER_MEDIA_THUMB_SIZE}
		thumbHeight={USER_MEDIA_THUMB_SIZE}
		renderGridItem={(type: React.ReactText, data: IGridMediaObject) => (
			<GridItem
				type={type}
				data={data}
				onViewMediaFullScreen={onViewMediaFullScreen}
				getText={getText}
			/>
		)}
		onLoadMore={loadMorePhotosHandler}
		dataProvider={dataProvider}
		header={header}
		scrollViewProps={{
			bounces: true,
			showsVerticalScrollIndicator: false,
			scrollEnabled: !disabled,
		}}
	/>
);
