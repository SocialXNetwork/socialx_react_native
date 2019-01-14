import * as React from 'react';
import { Dimensions } from 'react-native';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';

import { Sizes } from '../../environment/theme';
import { IMedia } from '../../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

enum ViewTypes {
	ITEM_LAYOUT = 0,
	HEADER_LAYOUT = 1,
}

interface IHeaderType {
	element: React.ReactElement<any>;
	height: number;
}

interface IPhotoGridProps {
	dataProvider: DataProvider;
	scrollViewProps: object;
	header: IHeaderType;
	itemWidth?: number;
	itemHeight?: number;
	extendedState?: object;
	renderGridItem: (type: number | string, data: IMedia, index: number) => JSX.Element;
	onLoadMore: () => void;
	onScroll?: (rawEvent: any, offsetX: number, offsetY: number) => void;
}

let lastKnownGridHeight: number = 0;
let gridProviderInstance: LayoutProvider | null = null;

const getGridProvider = (itemWidth: number, itemHeight: number, header: IHeaderType) => {
	lastKnownGridHeight = header && header.height;
	if (!gridProviderInstance) {
		gridProviderInstance = new LayoutProvider(
			(index: number) => {
				if (header && index === 0) {
					return ViewTypes.HEADER_LAYOUT;
				}
				return ViewTypes.ITEM_LAYOUT;
			},
			(type: React.ReactText, dim: { width: number; height: number }) => {
				if (type === ViewTypes.HEADER_LAYOUT) {
					dim.width = SCREEN_WIDTH;
					dim.height = lastKnownGridHeight;
				} else {
					dim.width = itemWidth;
					dim.height = itemHeight;
				}
			},
		);
	} else {
		if (header) {
			gridProviderInstance.setLayoutForType(
				ViewTypes.HEADER_LAYOUT,
				{ width: SCREEN_WIDTH, height: lastKnownGridHeight },
				0,
			);
		}
	}
	return gridProviderInstance;
};

const renderGridItemOrHeader = (
	type: number | string,
	data: IMedia,
	index: number,
	header: IHeaderType,
	renderGridItem: (type: number | string, data: IMedia, index: number) => JSX.Element,
) => {
	if (type === ViewTypes.HEADER_LAYOUT && header) {
		return header.element;
	}

	return renderGridItem(type, data, index);
};

export const PhotoGrid: React.SFC<IPhotoGridProps> = ({
	dataProvider,
	extendedState,
	scrollViewProps,
	itemWidth = Sizes.getThumbSize(),
	itemHeight = Sizes.getThumbSize(),
	header,
	renderGridItem,
	onLoadMore,
	onScroll = () => undefined,
}) => (
	<RecyclerListView
		renderAheadOffset={1500}
		layoutProvider={getGridProvider(itemWidth, itemHeight, header)}
		dataProvider={dataProvider}
		rowRenderer={(type, data, index) =>
			renderGridItemOrHeader(type, data, index, header, renderGridItem)
		}
		canChangeSize={true}
		extendedState={extendedState}
		scrollViewProps={scrollViewProps}
		onEndReached={onLoadMore}
		onEndReachedThreshold={100}
		onScroll={onScroll}
	/>
);
