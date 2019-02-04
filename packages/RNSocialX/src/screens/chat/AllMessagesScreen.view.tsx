import React from 'react';
import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { NoContent, SearchHeader, Tab, Tabs, UserEntries } from '../../components';
import { IDictionary, INavigationProps } from '../../types';
import { styles } from './AllMessagesScreen.style';

interface IProps extends INavigationProps, IDictionary {
	messages: string[];
	people: string[];
	scrollY: Animated.Value;
	headerTranslate: Animated.AnimatedInterpolation | number;
	listTranslate: Animated.AnimatedInterpolation | number;
	opacity: Animated.AnimatedInterpolation | number;
	expandHeader: () => void;
	scrollToTop: (ref: React.RefObject<FlatList<any>>, isActive: boolean) => void;
	onRemoveMessage: (alias: string) => void;
	onEntryPress: (alias: string) => void;
	onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

let messagesRef: React.RefObject<FlatList<any>>;
let friendsRef: React.RefObject<FlatList<any>>;

export const AllMessagesScreenView: React.SFC<IProps> = ({
	messages,
	people,
	scrollY,
	headerTranslate,
	listTranslate: translateY,
	opacity,
	dictionary,
	navigation,
	expandHeader,
	scrollToTop,
	onRemoveMessage,
	onEntryPress,
	onScroll,
}) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
		<SearchHeader
			cancel={false}
			overlay={true}
			back={true}
			opacity={opacity}
			translateY={headerTranslate}
			navigation={navigation}
		/>
		<Animated.View style={[styles.inner, { transform: [{ translateY }] }]}>
			<Tabs refs={[messagesRef, friendsRef]} onChangeTab={expandHeader}>
				<Tab
					heading={dictionary.screens.chat.messages.messages}
					onPress={(isActive) => scrollToTop(messagesRef, isActive)}
				>
					<UserEntries
						aliases={messages}
						chat={true}
						removable={true}
						scrollY={scrollY}
						emptyComponent={<NoContent messages={true} dictionary={dictionary} />}
						liftRef={(ref) => (messagesRef = ref)}
						onEntryPress={onEntryPress}
						onRemove={onRemoveMessage}
						onScroll={onScroll}
					/>
				</Tab>
				<Tab
					heading={dictionary.screens.chat.messages.friends}
					onPress={(isActive) => scrollToTop(friendsRef, isActive)}
				>
					<UserEntries
						aliases={people}
						chat={true}
						removable={true}
						scrollY={scrollY}
						emptyComponent={<NoContent messages={true} dictionary={dictionary} />}
						liftRef={(ref) => (friendsRef = ref)}
						onEntryPress={onEntryPress}
						onRemove={onRemoveMessage}
						onScroll={onScroll}
					/>
				</Tab>
			</Tabs>
		</Animated.View>
	</SafeAreaView>
);
