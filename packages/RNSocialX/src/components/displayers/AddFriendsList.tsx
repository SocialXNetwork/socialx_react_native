import * as React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';

import { Icons } from '../../environment/theme';
import { IFriendsSearchResult } from '../../types';
import styles from './AddFriendsList.style';

interface IAddFriendsListProps {
	taggedFriends: IFriendsSearchResult[];
	onShowTagFriends: () => void;
}

export const AddFriendsList: React.SFC<IAddFriendsListProps> = ({
	taggedFriends,
	onShowTagFriends,
}) => (
	<View style={styles.tagFriendsContainer}>
		<ScrollView alwaysBounceHorizontal={false} horizontal={true} style={styles.taggedFriendsScroll}>
			{taggedFriends.map((taggedFriend) => (
				<Image
					key={taggedFriend.id}
					source={{ uri: taggedFriend.avatar }}
					resizeMode={'cover'}
					style={styles.taggedFriendIcon}
				/>
			))}
		</ScrollView>
		<TouchableOpacity onPress={onShowTagFriends} style={styles.tagFriendsButton}>
			<Image source={Icons.tagFriendSmall} />
		</TouchableOpacity>
	</View>
);
