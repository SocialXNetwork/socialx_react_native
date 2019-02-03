import React from 'react';
import {
	Animated,
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

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
	expandHeader: () => void;
	liftRef?: (ref: React.RefObject<FlatList<any>>) => void;
	onEntryPress: (alias: string) => void;
	onRemove?: (alias: string) => void;
	onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export class UserEntries extends React.PureComponent<IUserEntriesProps> {
	private ref: React.RefObject<FlatList<any>> = React.createRef();

	public componentDidMount() {
		if (this.props.liftRef) {
			this.props.liftRef(this.ref);
		}
	}

	public render() {
		const {
			aliases,
			friends = false,
			chat = false,
			removable = false,
			scroll = true,
			emptyComponent,
			scrollY,
			expandHeader,
			onEntryPress,
			onRemove,
			onScroll,
		} = this.props;

		const Component = scrollY || onScroll ? AnimatedFlatList : FlatList;

		return (
			<React.Fragment>
				<GenericModal onDeletePress={onRemove} />
				{Platform.OS === OS_TYPES.Android && <NavigationEvents onWillFocus={expandHeader} />}
				<Component
					ref={this.ref}
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
					onScroll={
						Platform.OS === OS_TYPES.IOS &&
						scrollY &&
						Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
							useNativeDriver: true,
						})
					}
					onScrollBeginDrag={onScroll}
					onScrollEndDrag={onScroll}
					onMomentumScrollBegin={onScroll}
					onMomentumScrollEnd={onScroll}
					ListEmptyComponent={emptyComponent}
				/>
			</React.Fragment>
		);
	}
}
