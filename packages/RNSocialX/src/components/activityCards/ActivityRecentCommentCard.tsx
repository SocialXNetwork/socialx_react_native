import moment from 'moment';
import * as React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {AvatarImage} from '../';
import {ITranslatedProps} from '../../types';
import style from './ActivityRecentCommentCard.style';

interface IActivityRecentCommentCardPosts {
	postThumbURL: string;
	postId: string;
}

interface IActivityRecentCommentCardProps extends ITranslatedProps {
	avatarURL: string;
	fullName: string;
	timestamp: Date;
	wallPosts: IActivityRecentCommentCardPosts[];
	onThumbPress: (postId: string) => void;
}

interface IWallPostsProps {
	wallPosts: IActivityRecentCommentCardPosts[];
	onThumbPress: (postId: string) => void;
}

const WallPostThumbs: React.SFC<IWallPostsProps> = ({wallPosts, onThumbPress}) => (
	<ScrollView
		horizontal={true}
		alwaysBounceHorizontal={false}
		showsHorizontalScrollIndicator={false}
		contentContainerStyle={style.wallPostsThumbsContainer}
	>
		{wallPosts.map((wallPost: IActivityRecentCommentCardPosts, index: number) => (
			<TouchableOpacity key={index} style={style.postThumbTouchContainer} onPress={() => onThumbPress(wallPost.postId)}>
				<Image source={{uri: wallPost.postThumbURL}} resizeMode={'contain'} style={style.postThumbImage} />
			</TouchableOpacity>
		))}
	</ScrollView>
);

export const ActivityRecentCommentCard: React.SFC<IActivityRecentCommentCardProps> = ({
	avatarURL,
	fullName,
	timestamp,
	wallPosts,
	onThumbPress,
	getText,
}) => (
	<View style={style.container}>
		<AvatarImage image={avatarURL} style={style.avatarImage} />
		<View style={style.rightContainer}>
			<View style={style.topRightRow}>
				<Text style={style.fullName}>{fullName}</Text>
				<Text style={style.notificationTimestamp}>{moment(timestamp).fromNow()}</Text>
			</View>
			<Text style={style.activityActionText}>
				{getText('notifications.card.recent.comment.title', wallPosts.length)}
			</Text>
			<WallPostThumbs wallPosts={wallPosts} onThumbPress={onThumbPress} />
		</View>
	</View>
);
