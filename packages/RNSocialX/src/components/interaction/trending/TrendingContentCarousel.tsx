import React, {Component} from 'react';
import {Animated, Dimensions, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {ContentView} from './ContentView';

const SCREEN_WIDTH = Dimensions.get('window').width;

export interface IContentItem {
	name: string;
	content: any;
}

interface ITrendingContentCarouselProps {
	items: IContentItem[];
	passContentRef: (ref: any) => void;
}

export class TrendingContentCarousel extends Component<ITrendingContentCarouselProps> {
	public state = {
		scrollX: new Animated.Value(0),
	};

	private contentRef: React.RefObject<any> = React.createRef();

	public componentDidMount() {
		this.props.passContentRef(this.contentRef);
	}

	public render() {
		return (
			<View style={{flex: 1}}>
				<Carousel
					ref={this.contentRef}
					data={this.props.items}
					renderItem={this.renderItem}
					sliderWidth={SCREEN_WIDTH}
					itemWidth={SCREEN_WIDTH}
					enableSnap={true}
					inactiveSlideScale={0.9}
					inactiveSlideOpacity={0.9}
					scrollEventThrottle={16}
				/>
			</View>
		);
	}

	private renderItem = (data: {item: IContentItem; index: number}) => {
		return <ContentView item={data.item} />;
	};
}
