import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { ITranslatedProps, IUserEntry } from '../../../types';
import { SuggestionCard } from './SuggestionCard';
import styles from './SuggestionsCarousel.style';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (45 / 100) * SCREEN_WIDTH;

interface ISuggestionsCarouselProps extends ITranslatedProps {
	items: IUserEntry[];
}

interface ISuggestionsCarouselState {
	items: IUserEntry[];
}

export class SuggestionsCarousel extends React.Component<
	ISuggestionsCarouselProps,
	ISuggestionsCarouselState
> {
	public static getDerivedStateFromProps(
		props: ISuggestionsCarouselProps,
		state: ISuggestionsCarouselState,
	) {
		if (props.items && state.items.length === 0) {
			return {
				items: props.items,
			};
		}

		return null;
	}

	public state = {
		items: [],
	};

	/* Wierd getText bug here as well */
	public render() {
		return (
			<View style={styles.container}>
				<Text style={styles.header}>{this.props.getText('feed.screen.suggestions')}</Text>
				<Carousel
					data={this.state.items}
					renderItem={this.renderItem}
					sliderWidth={SCREEN_WIDTH}
					itemWidth={ITEM_WIDTH}
					enableSnap={false}
					enableMomentum={true}
					decelerationRate={0.9}
					activeSlideAlignment="start"
					inactiveSlideScale={1}
					inactiveSlideOpacity={1}
					containerCustomStyle={styles.carouselContainer}
				/>
			</View>
		);
	}

	private renderItem = (data: { item: IUserEntry; index: number }) => {
		return (
			<SuggestionCard
				item={data.item}
				deleteCard={() => this.deleteCard(data.index)}
				getText={this.props.getText}
			/>
		);
	};

	private deleteCard = (cardIndex: number) => {
		const newItems = this.state.items.filter(
			(item: IUserEntry, index: number) => index !== cardIndex,
		);
		this.setState({ items: newItems });
	};
}
