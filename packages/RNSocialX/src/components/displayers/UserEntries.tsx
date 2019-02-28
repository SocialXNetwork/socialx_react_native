import React from 'react';
import {
	Animated,
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
} from 'react-native';

import {
	IWithHeaderCollapseEnhancedActions,
	WithHeaderCollapse,
} from '../../enhancers/intermediary';

import { GenericModal, UserEntry } from '../../components';
import { OS_TYPES } from '../../environment/consts';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface IUserEntriesProps {
	aliases: string[];
	friends?: boolean;
	chat?: boolean;
	removable?: boolean;
	scroll?: boolean;
	scrollY?: Animated.Value;
	emptyComponent?: JSX.Element;
	liftRef?: (ref: React.RefObject<FlatList<any>>) => void;
	onEntryPress: (alias: string) => void;
	onRemove?: (alias: string) => void;
}

interface IProps extends IUserEntriesProps, IWithHeaderCollapseEnhancedActions {}

class Compoenent extends React.Component<IProps> {
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
			scrollY,
			emptyComponent,
			onEntryPress,
			onRemove,
			onScroll,
		} = this.props;

		const List = scrollY || onScroll ? AnimatedFlatList : FlatList;

		return (
			<React.Fragment>
				<GenericModal onDeletePress={onRemove} />
				<List
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
							space={Platform.OS === OS_TYPES.IOS && scrollY && index === aliases.length - 1}
							onPress={() => onEntryPress(item)}
						/>
					)}
					keyboardShouldPersistTaps="handled"
					keyExtractor={(item: string, index: number) => item + index}
					showsVerticalScrollIndicator={false}
					scrollEnabled={scroll}
					scrollEventThrottle={1}
					onScroll={
						scrollY &&
						Platform.select({
							ios: Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
								useNativeDriver: true,
								listener: (event: NativeSyntheticEvent<NativeScrollEvent>) =>
									onScroll(event, this.ref),
							}),
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

export const UserEntries = (props: IUserEntriesProps) => (
	<WithHeaderCollapse>{({ actions }) => <Compoenent {...props} {...actions} />}</WithHeaderCollapse>
);
