import * as React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import {SearchHeader, TrendingCategoriesCarousel, TrendingContentCarousel} from '../../../components';
import {trendingCategoriesItems, trendingContentItems} from '../../../mocks';

interface ITrendingScreenViewProps {
	navigation: NavigationScreenProp<any>;
	contentRef: React.RefObject<any>;
	passContentRef: (ref: React.RefObject<any>) => void;
}

export const TrendingScreenView: React.SFC<ITrendingScreenViewProps> = ({navigation, contentRef, passContentRef}) => (
	<View style={{flex: 1}}>
		<SearchHeader navigation={navigation} />
		<TrendingCategoriesCarousel items={trendingCategoriesItems} contentRef={contentRef} />
		<TrendingContentCarousel items={trendingContentItems} passContentRef={passContentRef} />
	</View>
);
