import React from 'react';
import {
	Animated,
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { NoContent, SearchHeader, Tab, Tabs, UserEntries } from '../../components';
import { IDictionary, INavigationProps } from '../../types';

import { OS_TYPES } from '../../environment/consts';
import { HEADER_HEIGHT, MINIMUM_SCROLL_DISTANCE, styles } from './AllMessagesScreen.style';
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

interface IProps extends INavigationProps, IDictionary {
	messages: string[];
	people: string[];
	scrollY: Animated.Value;
	expandHeader: () => void;
	scrollToTop: (ref: React.RefObject<FlatList<any>>) => void;
	onRemoveMessage: (alias: string) => void;
	onEntryPress: (alias: string) => void;
	onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const AllMessagesScreenView: React.SFC<IProps> = ({
	messages,
	people,
	scrollY,
	dictionary,
	navigation,
	expandHeader,
	scrollToTop,
	onRemoveMessage,
	onEntryPress,
	onScroll,
}) => {
	let translateY;
	if (Platform.OS === OS_TYPES.IOS) {
		const distance = scrollY.interpolate({
			inputRange: [MINIMUM_SCROLL_DISTANCE, MINIMUM_SCROLL_DISTANCE + HEADER_HEIGHT],
			outputRange: [0, HEADER_HEIGHT],
			extrapolateLeft: 'clamp',
		});

		translateY = distance.interpolate({
			inputRange: [0, HEADER_HEIGHT],
			outputRange: [0, -HEADER_HEIGHT],
			extrapolate: 'clamp',
		});
	} else {
		translateY = Animated.diffClamp(scrollY, 0, 1).interpolate({
			inputRange: [0, 1],
			outputRange: [0, -HEADER_HEIGHT],
			extrapolate: 'clamp',
		});
	}

	let messagesRef: React.RefObject<FlatList<any>>;
	let friendsRef: React.RefObject<FlatList<any>>;

	return (
		<AnimatedSafeAreaView
			forceInset={{ top: 'never' }}
			style={[styles.container, { transform: [{ translateY }] }]}
		>
			<SearchHeader
				cancel={false}
				overlay={true}
				back={true}
				scrollY={scrollY}
				scrollThreshold={HEADER_HEIGHT}
				minimumScrollDistance={MINIMUM_SCROLL_DISTANCE}
				navigation={navigation}
			/>
			<Tabs>
				<Tab heading="Messages" onPress={() => scrollToTop(messagesRef)}>
					<UserEntries
						aliases={messages}
						chat={true}
						removable={true}
						scrollY={scrollY}
						expandHeader={expandHeader}
						emptyComponent={<NoContent messages={true} dictionary={dictionary} />}
						liftRef={(ref) => (messagesRef = ref)}
						onEntryPress={onEntryPress}
						onRemove={onRemoveMessage}
						onScroll={onScroll}
					/>
				</Tab>
				<Tab heading="Friends" onPress={() => scrollToTop(friendsRef)}>
					<UserEntries
						aliases={people}
						chat={true}
						removable={true}
						scrollY={scrollY}
						expandHeader={expandHeader}
						emptyComponent={<NoContent messages={true} dictionary={dictionary} />}
						liftRef={(ref) => (friendsRef = ref)}
						onEntryPress={onEntryPress}
						onRemove={onRemoveMessage}
						onScroll={onScroll}
					/>
				</Tab>
			</Tabs>
		</AnimatedSafeAreaView>
	);
};
