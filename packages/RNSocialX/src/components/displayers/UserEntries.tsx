import React from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, Platform } from 'react-native';
// @ts-ignore
import { FlatList } from 'react-navigation';

import { GenericModal, UserEntry } from '../../components';
import { OS_TYPES } from '../../environment/consts';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface IUserEntriesProps {
	aliases: string[];
	friends?: boolean;
	chat?: boolean;
	removable?: boolean;
	scroll?: boolean;
	emptyComponent?: JSX.Element;
	scrollY?: Animated.Value;
	onEntryPress: (alias: string) => void;
	onRemove?: (alias: string) => void;
	onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export class UserEntries extends React.PureComponent<IUserEntriesProps> {
	public render() {
		const {
			aliases,
			friends = false,
			chat = false,
			removable = false,
			scroll = true,
			onEntryPress,
			emptyComponent,
			scrollY,
			onScroll,
			onRemove,
		} = this.props;

		const Component = scrollY && onScroll ? AnimatedFlatList : FlatList;

		return (
			<React.Fragment>
				<GenericModal onDeletePress={onRemove} />
				<Component
					data={aliases}
					renderItem={({ item, index }: { item: string; index: number }) => (
						<UserEntry
							alias={item}
							friends={friends}
							chat={chat}
							removable={removable}
							first={index === 0}
							last={index === aliases.length - 1}
							onPress={() => onEntryPress(item)}
						/>
					)}
					keyboardShouldPersistTaps="handled"
					keyExtractor={(item: string, index: number) => item + index}
					showsVerticalScrollIndicator={false}
					scrollEnabled={scroll}
					scrollEventThrottle={16}
					onScroll={this.onScrollHandler}
					ListEmptyComponent={emptyComponent}
				/>
			</React.Fragment>
		);
	}

	private onScrollHandler = () => {
		const { scrollY, onScroll } = this.props;

		if (scrollY && onScroll) {
			return Platform.select({
				ios: Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
					useNativeDriver: true,
				}),
				android: onScroll,
			});
		}
	};
}
