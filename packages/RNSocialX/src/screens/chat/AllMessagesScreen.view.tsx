import React from 'react';
import { Animated, View } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator, SafeAreaView } from 'react-navigation';

import { NoContent, SearchHeader, UserEntries } from '../../components';
import { IDictionary, INavigationProps } from '../../types';

import { Sizes } from '../../environment/theme';
import { styles, tabsStyles } from './AllMessagesScreen.style';
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
const THRESHOLD = Sizes.smartVerticalScale(45);

interface IProps extends INavigationProps, IDictionary {
	messages: string[];
	people: string[];
	scrollY: Animated.Value;
	onRemoveMessage: (alias: string) => void;
	onEntryPress: (alias: string) => void;
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
	const top = props.scrollY.interpolate({
		inputRange: [0, THRESHOLD],
		outputRange: [0, -THRESHOLD],
		extrapolate: 'clamp',
	});

	// return (
	// 	<AnimatedSafeAreaView
	// 		forceInset={{ top: 'never' }}
	// 		style={[styles.container, { transform: [{ translateY: top }] }]}
	// 	>
	// 		<SearchHeader
	// 			cancel={false}
	// 			overlay={true}
	// 			back={true}
	// 			scrollY={props.scrollY}
	// 			navigation={props.navigation}
	// 		/>
	// 		<Tabs screenProps={props} />
	// 	</AnimatedSafeAreaView>
	// );

	return (
		<View style={styles.container}>
			<SearchHeader
				cancel={false}
				overlay={true}
				back={true}
				scrollY={props.scrollY}
				navigation={props.navigation}
			/>
			<Tabs screenProps={props} />
		</View>
	);
};
