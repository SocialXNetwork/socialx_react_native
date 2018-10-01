import * as React from 'react';
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { SCREENS } from '../../../environment/consts';
import { INavigationProps, ITrendingContentItem } from '../../../types';
import { ContentView } from './ContentView';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface ITrendingContentCarouselProps extends INavigationProps {
	items: ITrendingContentItem[];
	passContentRef: (ref: React.RefObject<any>) => void;
}

export class TrendingContentCarousel extends React.Component<
	ITrendingContentCarouselProps
> {
	private contentRef: React.RefObject<any> = React.createRef();

	public componentDidMount() {
		if (this.props.passContentRef) {
			this.props.passContentRef(this.contentRef);
		}
	}

	public render() {
		return (
			<View style={{ flex: 1 }}>
				<Carousel
					ref={this.contentRef}
					data={this.props.items}
					renderItem={this.renderItem}
					sliderWidth={SCREEN_WIDTH}
					itemWidth={SCREEN_WIDTH}
					enableSnap={true}
					inactiveSlideScale={0.9}
					inactiveSlideOpacity={0.9}
				/>
			</View>
		);
	}

	private renderItem = (data: {
		item: ITrendingContentItem;
		index: number;
	}) => {
		return <ContentView item={data.item} onItemPress={this.onItemPress} />;
	};

	private onItemPress = (postId: string) => {
		this.props.navigation.navigate(SCREENS.Comments, {
			postId,
			startComment: false,
		});
	};
}
