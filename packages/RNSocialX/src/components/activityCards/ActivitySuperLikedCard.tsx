import moment from 'moment';
import * as React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {AvatarImage} from '../';
import {ITranslatedProps} from '../../types';
import style from './ActivityRecentCommentCard.style';

interface IActivitySuperLikedCardPosts {
	postThumbURL: string;
	postId: string;
}

interface IActivitySuperLikedCardProps extends ITranslatedProps {
	avatarURL: string;
	fullName: string;
	timestamp: Date;
	wallPosts: IActivitySuperLikedCardPosts[];
	onThumbPress: (postId: string) => void;
}

interface IWallPostsProps {
	wallPosts: IActivitySuperLikedCardPosts[];
	onThumbPress: (postId: string) => void;
}

// TODO: @serkan @jake did I see this exact component in recent comment card?
// Answer: Yes, UI is 99% similar but these are different concerns and might change in future.
// See design reference: https://projects.invisionapp.com/d/main#/console/13318223/278859790/preview
// *UPDATE*: @Serkan: please review here and let's settle this one.
const WallPostThumbs: React.SFC<IWallPostsProps> = ({wallPosts, onThumbPress}) => (
	<ScrollView
		horizontal={true}
		alwaysBounceHorizontal={false}
		showsHorizontalScrollIndicator={false}
		contentContainerStyle={style.wallPostsThumbsContainer}
	>
		{wallPosts.map((wallPost: IActivitySuperLikedCardPosts, index: number) => (
			<TouchableOpacity key={index} style={style.postThumbTouchContainer} onPress={() => onThumbPress(wallPost.postId)}>
				<Image source={{uri: wallPost.postThumbURL}} resizeMode={'contain'} style={style.postThumbImage} />
			</TouchableOpacity>
		))}
	</ScrollView>
);

export const ActivitySuperLikedCard: React.SFC<IActivitySuperLikedCardProps> = ({
	avatarURL,
	fullName,
	timestamp,
	wallPosts,
	onThumbPress,
	getText,
}) => {
	return (
		<View style={style.container}>
			<AvatarImage image={avatarURL} style={style.avatarImage} />
			<View style={style.rightContainer}>
				<View style={style.topRightRow}>
					<Text style={style.fullName}>{fullName}</Text>
					<Text style={style.notificationTimestamp}>{moment(timestamp).fromNow()}</Text>
				</View>
				<Text style={style.activityActionText}>
					<Text style={style.pinkText}>{`${getText('notifications.card.super.liked.part1')} `}</Text>
					{getText('notifications.card.super.liked.part2', wallPosts.length)}
				</Text>
				<WallPostThumbs wallPosts={wallPosts} onThumbPress={onThumbPress} />
			</View>
		</View>
	);
};
