import React from 'react';
import {
	Animated,
	FlatList,
	GestureResponderEvent,
	PanResponder,
	PanResponderGestureState,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import { OS_TYPES } from '../../environment/consts';
import { Colors } from '../../environment/theme';
import { SCREEN_WIDTH, styles } from './Tabs.style';

interface IProps {
	children: JSX.Element[];
	refs?: Array<React.RefObject<FlatList<any>>>;
	onChangeTab?: () => void;
}

interface IState {
	activeIndex: number;
}

export class Tabs extends React.Component<IProps, IState> {
	private children: JSX.Element[];
	private position = new Animated.Value(0);

	private panResponder = PanResponder.create({
		onMoveShouldSetPanResponderCapture: (event, gestureState) =>
			this.isMovingHorizontally(event, gestureState),
		onPanResponderGrant: () => {
			const { refs } = this.props;
			const { activeIndex } = this.state;

			if (refs && refs[activeIndex].current) {
				// @ts-ignore
				refs[activeIndex].current.setNativeProps({ scrollEnabled: false });
			}
		},
		onPanResponderMove: (event, gestureState) => {
			const newPosition = -gestureState.dx / 400 + this.state.activeIndex;
			this.position.setValue(newPosition);
		},
		onPanResponderRelease: (event, gestureState) => this.onReleaseHandler(event, gestureState),
		onPanResponderTerminate: (event, gestureState) => this.onReleaseHandler(event, gestureState),
		onPanResponderTerminationRequest: () => true,
	});

	public constructor(props: IProps) {
		super(props);

		this.children = React.Children.toArray(props.children);
		this.state = {
			activeIndex: 0,
		};
	}

	public componentDidUpdate(prevProps: IProps, prevState: IState) {
		if (this.props.onChangeTab && prevState.activeIndex !== this.state.activeIndex) {
			this.props.onChangeTab();
		}
	}

	public render() {
		const COUNT = this.children.length;
		const END = this.children.length - 1;

		const SEGMENT = SCREEN_WIDTH - SCREEN_WIDTH / COUNT;
		const indicatorPosition = this.position.interpolate({
			inputRange: [-1, 0, END, END + 1],
			outputRange: [-SCREEN_WIDTH / 3, 0, SEGMENT, SEGMENT + SCREEN_WIDTH / 3],
			extrapolate: 'clamp',
		});

		const tabPosition = this.position.interpolate({
			inputRange: [-1, 0, END, END + 1],
			outputRange: [
				SCREEN_WIDTH / 3,
				0,
				-SCREEN_WIDTH * END,
				-SCREEN_WIDTH * END - SCREEN_WIDTH / 3,
			],
			extrapolate: 'clamp',
		});

		const children = this.children.map((child) =>
			React.cloneElement(child, { translateX: tabPosition }),
		);

		return (
			<View style={styles.container}>
				<View style={styles.headings}>
					{this.children.map((child, index) => (
						<TouchableOpacity
							key={child.props.heading}
							activeOpacity={1}
							style={styles.heading}
							onPress={() => {
								this.transitionTo(index);

								if (child.props.onPress) {
									child.props.onPress(this.state.activeIndex === index);
								}
							}}
						>
							<Text
								style={[
									styles.text,
									{ color: this.state.activeIndex === index ? Colors.pink : Colors.gray },
								]}
							>
								{child.props.heading}
							</Text>
						</TouchableOpacity>
					))}
				</View>
				<Animated.View
					style={[
						styles.indicator,
						{
							width: SCREEN_WIDTH / COUNT,
							transform: [{ translateX: indicatorPosition }],
						},
					]}
				/>
				<View {...this.panResponder.panHandlers} style={styles.children}>
					{children}
				</View>
			</View>
		);
	}

	private onReleaseHandler = (
		event: GestureResponderEvent,
		gestureState: PanResponderGestureState,
	) => {
		const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.6;
		let VELOCITY_THRESHOLD = 0.15;
		const { activeIndex } = this.state;
		let nextIndex = activeIndex;

		if (Platform.OS === OS_TYPES.Android) {
			// Android is using nanoseconds
			VELOCITY_THRESHOLD /= 1000000;
		}

		if (
			Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
			Math.abs(gestureState.vx) > Math.abs(gestureState.vy) &&
			(Math.abs(gestureState.dx) > SWIPE_THRESHOLD ||
				Math.abs(gestureState.vx) > VELOCITY_THRESHOLD)
		) {
			nextIndex = Math.round(
				Math.min(
					Math.max(0, activeIndex - gestureState.dx / Math.abs(gestureState.dx)),
					this.children.length - 1,
				),
			);
		}

		this.transitionTo(nextIndex);
	};

	private isMovingHorizontally = (
		event: GestureResponderEvent,
		gestureState: PanResponderGestureState,
	) => {
		return (
			Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 2) &&
			Math.abs(gestureState.vx) > Math.abs(gestureState.vy * 2)
		);
	};

	private transitionTo = (index: number) => {
		Animated.timing(this.position, {
			toValue: index,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			const { refs } = this.props;
			const { activeIndex } = this.state;

			if (refs && refs[activeIndex] && refs[activeIndex].current) {
				// @ts-ignore
				refs[activeIndex].current.setNativeProps({ scrollEnabled: true });
			}
			this.setState({ activeIndex: index });
		});
	};
}
