import * as React from 'react';
import {Dimensions, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {ITrendingCategoriesItem} from '../../../types';
import {CategoryCard} from './CategoryCard';
import styles from './TrendingCategoriesCarousel.style';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (32 / 100) * SCREEN_WIDTH;

interface ITrendingCategoriesCarouselProps {
	items: ITrendingCategoriesItem[];
	contentRef: any;
}

interface ITrendingCategoriesCarouselState {
	activeIndex: number;
}

export class TrendingCategoriesCarousel extends React.Component<
	ITrendingCategoriesCarouselProps,
	ITrendingCategoriesCarouselState
> {
	public state = {
		activeIndex: 0,
	};
	private categoryRef: React.RefObject<any> = React.createRef();

	public render() {
		return (
			<View style={styles.container}>
				<Carousel
					ref={this.categoryRef}
					data={this.props.items}
					renderItem={this.renderItem}
					sliderWidth={SCREEN_WIDTH}
					itemWidth={ITEM_WIDTH}
					enableSnap={true}
					enableMomentum={true}
					decelerationRate={0.7}
					activeSlideAlignment={'start'}
					inactiveSlideScale={1}
					inactiveSlideOpacity={1}
					containerCustomStyle={styles.categoryContainer}
					contentContainerCustomStyle={{width: ITEM_WIDTH * this.props.items.length + 10}}
				/>
			</View>
		);
	}

	private renderItem = (data: {item: ITrendingCategoriesItem; index: number}) => {
		if (data.index === this.state.activeIndex) {
			return (
				<CategoryCard item={data.item} onCategoryPress={() => this.onCategoryPressHandler(data.index)} active={true} />
			);
		}

		return <CategoryCard item={data.item} onCategoryPress={() => this.onCategoryPressHandler(data.index)} />;
	};

	private onCategoryPressHandler = (index: number) => {
		const {items, contentRef} = this.props;

		if (this.state.activeIndex !== index) {
			this.setState({activeIndex: index});
		}

		if (contentRef.current) {
			contentRef.current.snapToItem(index);
		}

		if (index !== items.length - 1 && index !== items.length - 2) {
			this.categoryRef.current.snapToItem(index);
		}

		if (index === items.length - 2) {
			this.categoryRef.current.snapToItem(index - 1);
		}

		if (index === items.length - 1) {
			this.categoryRef.current.snapToItem(index - 2);
		}
	};
}
