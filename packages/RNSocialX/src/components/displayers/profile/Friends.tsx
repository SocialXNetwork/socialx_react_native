import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { IApplicationState, selectFriends } from '../../../store/selectors';
import { IDictionary } from '../../../types';
import { Avatar } from './';

import styles from './Friends.style';

interface IFriendsProps extends IDictionary {
	alias: string;
	tabs?: boolean;
	onViewFriends: (alias: string) => void;
}

interface IProps extends IFriendsProps {
	friends: string[];
}

export class Component extends React.Component<IProps> {
	public shouldComponentUpdate(nextProps: IProps) {
		return this.props.friends.length !== nextProps.friends.length;
	}

	public render() {
		const { friends, alias, tabs, onViewFriends, dictionary } = this.props;

		return (
			<TouchableOpacity
				style={[styles.container, { borderBottomWidth: tabs ? 0 : 1 }]}
				onPress={() => onViewFriends(alias)}
			>
				{friends.length === 1 && (
					<View style={styles.friends}>
						<Avatar alias={friends[0]} />
					</View>
				)}
				{friends.length === 2 && (
					<View style={[styles.friends, styles.double]}>
						{friends.map((friend, index) => (
							<Avatar alias={friend} index={index + 1} spacey={true} key={friend} />
						))}
					</View>
				)}
				{friends.length === 3 && (
					<View style={[styles.friends, styles.triple]}>
						{friends.map((friend, index) => (
							<Avatar alias={friend} index={index + 1} key={friend} />
						))}
					</View>
				)}
				<Text style={styles.text}>{dictionary.components.buttons.seeAllFriends}</Text>
			</TouchableOpacity>
		);
	}
}

const mapStateToProps = (state: IApplicationState, props: IFriendsProps) => {
	return {
		friends: selectFriends(state.data.profiles, props.alias),
	};
};

export const Friends = connect(mapStateToProps)(Component);
