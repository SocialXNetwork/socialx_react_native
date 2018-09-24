import * as React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import {SearchHeader, TrendingCategoriesCarousel, TrendingContentCarousel} from '../../../components';
import {ITrendingCategoriesItem, ITrendingContentItem} from '../../../types';

interface ITrendingScreenViewProps {
	navigation: NavigationScreenProp<any>;
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
}) => (
	<View style={{flex: 1}}>
		<SearchHeader navigation={navigation} />
		<TrendingCategoriesCarousel items={trendingCategoriesItems} contentRef={contentRef} />
		<TrendingContentCarousel items={trendingContentItems} passContentRef={passContentRef} />
	</View>
);
