import * as React from 'react';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';

import { Sizes } from '../../environment/theme';
import { IMedia } from '../../types';

enum ViewTypes {
	ITEM_LAYOUT = 0,
}

interface IPhotoGridProps {
	dataProvider: DataProvider;
	scrollViewProps: object;
	itemWidth?: number;
	itemHeight?: number;
	extendedState?: object;
	renderItem: (type: number | string, data: IMedia, index: number) => JSX.Element;
	onLoadMore: () => void;
	onScroll?: (rawEvent: any, offsetX: number, offsetY: number) => void;
}

let layoutProvider: LayoutProvider | null = null;

const getGridProvider = (itemWidth: number, itemHeight: number) => {
	if (!layoutProvider) {
		layoutProvider = new LayoutProvider(
			() => ViewTypes.ITEM_LAYOUT,
			(type: number | string, dim: { width: number; height: number }) => {
				dim.width = itemWidth;
				dim.height = itemHeight;
			},
		);
	}

	return layoutProvider;
};

export const PhotoGrid: React.SFC<IPhotoGridProps> = ({
	dataProvider,
	extendedState,
	scrollViewProps,
	itemWidth = Sizes.getThumbSize(),
	itemHeight = Sizes.getThumbSize(),
	renderItem,
	onLoadMore,
	onScroll = () => undefined,
}) => (
	<RecyclerListView
		renderAheadOffset={1500}
		layoutProvider={getGridProvider(itemWidth, itemHeight)}
		dataProvider={dataProvider}
		rowRenderer={(type, data, index) => renderItem(type, data, index)}
		canChangeSize={true}
		extendedState={extendedState}
		scrollViewProps={scrollViewProps}
		onEndReached={onLoadMore}
		onEndReachedThreshold={100}
		onScroll={onScroll}
	/>
);
