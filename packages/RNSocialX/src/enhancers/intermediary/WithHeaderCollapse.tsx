import { throttle } from 'lodash';
import React from 'react';
import {
	Animated,
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { OS_TYPES } from '../../environment/consts';
import { Sizes } from '../../environment/theme';
const HEADER_HEIGHT = Sizes.smartVerticalScale(45);
const STATUS_BAR_HEIGHT = getStatusBarHeight();
const MINIMUM_SCROLL_DISTANCE = 50;
const THROTTLE_TIME = 300;
const ANIMATION_TIME = 300;

export interface IWithHeaderCollapseEnhancedData {
	scrollY: Animated.Value;
	headerTranslate: number | Animated.AnimatedInterpolation;
	listTranslate: number | Animated.AnimatedInterpolation;
	opacity: number | Animated.AnimatedInterpolation;
}

export interface IWithHeaderCollapseEnhancedActions {
	collapse: () => void;
	expand: () => void;
	scrollToTop: (ref: React.RefObject<FlatList<any>>, isActive: boolean) => void;
	onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

interface IWithHeaderCollapsetEnhancedProps {
	data: IWithHeaderCollapseEnhancedData;
	actions: IWithHeaderCollapseEnhancedActions;
}

interface IWithHeaderCollapseProps {
	children(props: IWithHeaderCollapsetEnhancedProps): JSX.Element;
}

export class WithHeaderCollapse extends React.Component<IWithHeaderCollapseProps> {
	private scrollY = new Animated.Value(1);
	private oldPosition = 0;
	private down = true;
	private up = false;

	private throttledCollapse = throttle(() => this.collapse(), THROTTLE_TIME);
	private throttledExpand = throttle(() => this.expand(), THROTTLE_TIME);

	public render() {
		let headerTranslate;
		let listTranslate;
		let opacity;

		if (Platform.OS === OS_TYPES.IOS) {
			const distance = this.scrollY.interpolate({
				inputRange: [MINIMUM_SCROLL_DISTANCE, MINIMUM_SCROLL_DISTANCE + HEADER_HEIGHT],
				outputRange: [0, HEADER_HEIGHT],
			});

			headerTranslate = distance.interpolate({
				inputRange: [0, HEADER_HEIGHT],
				outputRange: [0, -HEADER_HEIGHT],
				extrapolate: 'clamp',
			});

			listTranslate = distance.interpolate({
				inputRange: [0, HEADER_HEIGHT],
				outputRange: [HEADER_HEIGHT + STATUS_BAR_HEIGHT, HEADER_HEIGHT - STATUS_BAR_HEIGHT],
				extrapolate: 'clamp',
			});
			opacity = distance.interpolate({
				inputRange: [0, HEADER_HEIGHT / 3, HEADER_HEIGHT],
				outputRange: [1, 0.3, 0],
				extrapolate: 'clamp',
			});
		} else {
			headerTranslate = Animated.diffClamp(this.scrollY, 0, 1).interpolate({
				inputRange: [0, 1],
				outputRange: [-HEADER_HEIGHT, 0],
				extrapolate: 'clamp',
			});
			listTranslate = Animated.diffClamp(this.scrollY, 0, 1).interpolate({
				inputRange: [0, 1],
				outputRange: [0, HEADER_HEIGHT],
				extrapolate: 'clamp',
			});
			opacity = Animated.diffClamp(this.scrollY, 0, 1).interpolate({
				inputRange: [0, 1 / 3, 1],
				outputRange: [0, 0.3, 1],
				extrapolate: 'clamp',
			});
		}

		return this.props.children({
			data: {
				scrollY: this.scrollY,
				headerTranslate,
				listTranslate,
				opacity,
			},
			actions: {
				collapse: this.collapse,
				expand: this.expand,
				scrollToTop: this.scrollToTop,
				onScroll: this.onScrollHandler,
			},
		});
	}

	private onScrollHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const newPosition = e.nativeEvent.contentOffset.y;

		if (newPosition > 0 && newPosition >= this.oldPosition && this.down && !this.up) {
			this.throttledCollapse();
		} else if (newPosition >= 0 && newPosition < this.oldPosition && this.up && !this.down) {
			this.throttledExpand();
		}

		this.oldPosition = newPosition;
	};

	private expand = () => {
		Animated.timing(this.scrollY, {
			toValue: 1,
			duration: ANIMATION_TIME,
			useNativeDriver: true,
		}).start(() => {
			this.up = false;
			this.down = true;
		});
	};

	private collapse = () => {
		Animated.timing(this.scrollY, {
			toValue: 0,
			duration: ANIMATION_TIME,
			useNativeDriver: true,
		}).start(() => {
			this.down = false;
			this.up = true;
		});
	};

	private scrollToTop = (ref: React.RefObject<FlatList<any>>, isActive: boolean) => {
		if (ref.current && isActive) {
			// @ts-ignore
			ref.current.getNode().scrollToOffset({ offset: 0, animated: true });
			this.expand();
		}
	};
}
