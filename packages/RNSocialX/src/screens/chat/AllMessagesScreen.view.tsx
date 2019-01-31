import React from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, Platform, View } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator, SafeAreaView } from 'react-navigation';

import { NoContent, SearchHeader, UserEntries } from '../../components';
import { IDictionary, INavigationProps } from '../../types';

import { OS_TYPES } from '../../environment/consts';
import {
	HEADER_HEIGHT,
	MINIMUM_SCROLL_DISTANCE,
	styles,
	tabsStyles,
} from './AllMessagesScreen.style';
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

interface IProps extends INavigationProps, IDictionary {
	messages: string[];
	people: string[];
	scrollY: Animated.Value;
	onRemoveMessage: (alias: string) => void;
	onEntryPress: (alias: string) => void;
	onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const AllMessagesTabs = createMaterialTopTabNavigator(
	{
		Messages: {
			screen: ({ screenProps }: { screenProps: IProps }) => (
				<View style={styles.entries}>
					<UserEntries
						aliases={screenProps.messages}
						chat={true}
						removable={true}
						scrollY={screenProps.scrollY}
						emptyComponent={<NoContent messages={true} dictionary={screenProps.dictionary} />}
						onEntryPress={screenProps.onEntryPress}
						onRemove={screenProps.onRemoveMessage}
						onScroll={screenProps.onScroll}
					/>
				</View>
			),
		},
		Friends: {
			screen: ({ screenProps }: { screenProps: IProps }) => (
				<View style={styles.entries}>
					<UserEntries
						aliases={screenProps.people}
						chat={true}
						removable={true}
						scrollY={screenProps.scrollY}
						emptyComponent={<NoContent messages={true} dictionary={screenProps.dictionary} />}
						onEntryPress={screenProps.onEntryPress}
						onRemove={screenProps.onRemoveMessage}
						onScroll={screenProps.onScroll}
					/>
				</View>
			),
		},
	},
	{
		animationEnabled: true,
		swipeEnabled: true,
		// @ts-ignore
		optimizationsEnabled: true,
		tabBarOptions: tabsStyles,
	},
);

const Tabs = createAppContainer(AllMessagesTabs);

export const AllMessagesScreenView: React.SFC<IProps> = (props) => {
	let translateY;
	if (Platform.OS === OS_TYPES.IOS) {
		const distance = props.scrollY.interpolate({
			inputRange: [MINIMUM_SCROLL_DISTANCE, MINIMUM_SCROLL_DISTANCE + HEADER_HEIGHT],
			outputRange: [0, HEADER_HEIGHT],
			extrapolateLeft: 'clamp',
		});

		translateY = distance.interpolate({
			inputRange: [0, HEADER_HEIGHT],
			outputRange: [0, -HEADER_HEIGHT],
			extrapolate: 'clamp',
		});
	} else if (Platform.OS === OS_TYPES.Android) {
		translateY = Animated.diffClamp(props.scrollY, 0, 1).interpolate({
			inputRange: [0, 1],
			outputRange: [0, -HEADER_HEIGHT],
			extrapolate: 'clamp',
		});
	}

	return (
		<AnimatedSafeAreaView
			forceInset={{ top: 'never' }}
			style={[styles.container, { transform: [{ translateY }] }]}
		>
			<SearchHeader
				cancel={false}
				overlay={true}
				back={true}
				scrollY={props.scrollY}
				scrollThreshold={HEADER_HEIGHT}
				minimumScrollDistance={MINIMUM_SCROLL_DISTANCE}
				navigation={props.navigation}
			/>
			<Tabs screenProps={props} />
		</AnimatedSafeAreaView>
	);
};
