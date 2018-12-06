import * as React from 'react';
import { Dimensions } from 'react-native';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';

import { Sizes } from '../../environment/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;

enum ViewTypes {
	ITEM_LAYOUT = 0,
	HEADER_LAYOUT = 1,
}

interface IHeaderType {
	element: React.ReactElement<any>;
	height: number;
}

interface IPhotoGridProps {
	onLoadMore: () => void;
	thumbWidth: number;
	thumbHeight: number;
	renderGridItem: (type: React.ReactText, data: any) => JSX.Element;
	dataProvider: DataProvider;
	scrollViewProps: object;
	header: IHeaderType;
	extendedState?: object;
	onScroll?: (rawEvent: any, offsetX: number, offsetY: number) => void;
}

let lastKnownGridHeight: number = 0;
let gridProviderInstance: LayoutProvider | null = null;

const getGridProvider = (thumbWidth: number, thumbHeight: number, header: IHeaderType) => {
	lastKnownGridHeight = header && header.height;
	if (!gridProviderInstance) {
		gridProviderInstance = new LayoutProvider(
			(index: number) => {
				if (header && index === 0) {
					return ViewTypes.HEADER_LAYOUT;
				}
				return ViewTypes.ITEM_LAYOUT;
			},
			(type: React.ReactText, dim: any) => {
				if (type === ViewTypes.HEADER_LAYOUT) {
					dim.width = SCREEN_WIDTH;
					dim.height = lastKnownGridHeight;
				} else {
					dim.width = thumbWidth;
					dim.height = thumbHeight;
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
	type: React.ReactText,
	data: any,
	renderGridItem: (type: React.ReactText, data: any) => JSX.Element,
	header: IHeaderType,
) => {
	if (type === ViewTypes.HEADER_LAYOUT && header) {
		return header.element;
	}
	return renderGridItem(type, data);
};

export const PhotoGrid: React.SFC<IPhotoGridProps> = ({
	dataProvider,
	renderGridItem,
	onLoadMore,
	onScroll = () => undefined,
	extendedState = {},
	scrollViewProps = {},
	thumbHeight = Sizes.getThumbSize(),
	thumbWidth = Sizes.getThumbSize(),
	header,
}) => (
	<RecyclerListView
		renderAheadOffset={1500}
		layoutProvider={getGridProvider(thumbWidth, thumbHeight, header)}
		dataProvider={dataProvider}
		rowRenderer={(...args) => renderGridItemOrHeader(args[0], args[1], renderGridItem, header)}
		onEndReached={onLoadMore}
		onEndReachedThreshold={100} // must be > 0 for Android
		onScroll={onScroll}
		extendedState={extendedState}
		scrollViewProps={scrollViewProps}
	/>
);

/**
 * TODO list:
 * 1. @Ionut: later revisit props 'extendedState' and 'onScroll' used in MediaLicenceScreenComponent
 * 2. @Serkan: any better options for a singleton with gridProviderInstance?.
 * 		This might even have some hidden issues, like gridProviderInstance show get initialized
 * 		once for each PhotoGrid instance. Should we make this a component and use componentDidMount?
 */
