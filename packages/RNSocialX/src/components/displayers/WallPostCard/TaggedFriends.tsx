import * as React from 'react';
import {StyleSheet, Text} from 'react-native';

import {Colors} from '../../../environment/theme';
import {ITranslatedProps} from '../../../types';

interface ITaggedFriendsProps extends ITranslatedProps {
	friends: Array<{fullName: string}>;
}

export const TaggedFriends: React.SFC<ITaggedFriendsProps> = ({friends, getText}) => {
	const hasFriends = friends.length > 0;
	const hasMoreThanOneFriend = friends.length > 1;

	return (
		<React.Fragment>
			{hasFriends && (
				<React.Fragment>
					<Text style={styles.grayText}>{getText('text.with')}</Text>
					<Text key={1}>{friends[0].fullName}</Text>
				</React.Fragment>
			)}
			{hasMoreThanOneFriend && (
				<React.Fragment>
					<Text style={styles.grayText}>{getText('text.and')}</Text>
					<Text>{`${friends.length - 1} ${getText('text.others')}`}</Text>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

const styles: any = StyleSheet.create({
	grayText: {
		color: Colors.postText,
	},
});
