import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';

import {Icons} from '../../environment/theme';
import {FriendsSearchResult} from '../../types';
import styles from './AddFriendsList.style';

interface IAddFriendsListProps {
	showTagFriendsModal: () => void;
	taggedFriends: FriendsSearchResult[];
}

export const AddFriendsList: React.SFC<IAddFriendsListProps> = ({taggedFriends, showTagFriendsModal}) => (
	<View style={styles.tagFriendsContainer}>
		<ScrollView alwaysBounceHorizontal={false} horizontal={true} style={styles.taggedFriendsScroll}>
			{taggedFriends.map((taggedFriend) => (
				<Image
					key={taggedFriend.id}
					source={{uri: taggedFriend.avatarURL}}
					resizeMode={'cover'}
					style={styles.taggedFriendIcon}
				/>
			))}
		</ScrollView>
		<TouchableOpacity onPress={showTagFriendsModal} style={styles.tagFriendsButton}>
			<Image source={Icons.tagFriendSmall} />
		</TouchableOpacity>
	</View>
);
