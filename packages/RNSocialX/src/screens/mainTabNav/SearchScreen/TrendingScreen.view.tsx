import * as React from 'react';
import { View } from 'react-native';

import {
	SearchHeader,
	TrendingCategoriesCarousel,
	TrendingContentCarousel,
} from '../../../components';
import {
	INavigationProps,
	ITranslatedProps,
	ITrendingCategoriesItem,
	ITrendingContentItem,
} from '../../../types';
import { ComingSoon } from './SearchScreen.view';

interface ITrendingScreenViewProps extends INavigationProps, ITranslatedProps {
	trendingCategoriesItems: ITrendingCategoriesItem[];
	trendingContentItems: ITrendingContentItem[];
	contentRef: React.RefObject<any>;
	passContentRef: (ref: React.RefObject<any>) => void;
}

export const TrendingScreenView: React.SFC<ITrendingScreenViewProps> = ({
	navigation,
	trendingCategoriesItems,
	trendingContentItems,
	contentRef,
	passContentRef,
	getText,
}) => (
	<View style={{ flex: 1 }}>
		<SearchHeader cancel={false} navigation={navigation} />
		<ComingSoon message={getText('search.screen.results.coming.soon')} />
		{/* <TrendingCategoriesCarousel
			items={trendingCategoriesItems}
			contentRef={contentRef}
		/>
		<TrendingContentCarousel
			items={trendingContentItems}
			passContentRef={passContentRef}
			navigation={navigation}
		/> */}
	</View>
);
