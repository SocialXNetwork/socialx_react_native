import React from 'react';
import { FlatList } from 'react-native';

import { GenericModal, UserEntry } from '../../components';

interface IUserEntriesProps {
	aliases: string[];
	friends?: boolean;
	chat?: boolean;
	removable?: boolean;
	scroll?: boolean;
	emptyComponent?: JSX.Element;
	onEntryPress: (alias: string) => void;
	onRemove?: (alias: string) => void;
}

export class UserEntries extends React.Component<IUserEntriesProps> {
	public shouldComponentUpdate(nextProps: IUserEntriesProps) {
		return this.props.aliases !== nextProps.aliases;
	}

	public render() {
		const {
			aliases,
			friends = false,
			chat = false,
			removable = false,
			scroll = true,
			onEntryPress,
			emptyComponent,
			onRemove = () => undefined,
		} = this.props;

		return (
			<React.Fragment>
				<GenericModal onDeletePress={onRemove} />
				<FlatList
					data={aliases}
					renderItem={({ item }) => (
						<UserEntry
							alias={item}
							friends={friends}
							chat={chat}
							removable={removable}
							onPress={() => onEntryPress(item)}
						/>
					)}
					keyboardShouldPersistTaps="handled"
					keyExtractor={(item) => item}
					showsVerticalScrollIndicator={false}
					scrollEnabled={scroll}
					ListEmptyComponent={emptyComponent}
				/>
			</React.Fragment>
		);
	}
}
