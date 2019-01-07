import { boolean, date, text as string, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import moment from 'moment';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { getTextMock } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';
import Provider from '../../../helpers/Provider';

import { AvatarImage, CommentLikes, RichText } from '../../../../src/components';
import { IComment, ITranslatedProps } from '../../../../src/types';

import styles from './CommentCard.style';

const TEXT_LENGTH_TRESHOLD = 15;

interface ICommentCardProps extends ITranslatedProps {
	comment: IComment;
}

const CommentCard: React.SFC<ICommentCardProps> = ({ comment, getText }) => {
	const { text, owner, timestamp, likeIds, likedByCurrentUser, posting } = comment;
	const commentTimestamp = moment(timestamp).fromNow();

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => undefined}>
				<AvatarImage image={owner.avatar} style={styles.avatarImage} />
			</TouchableOpacity>
			<View style={styles.rightContainer}>
				<View>
					<TouchableOpacity style={styles.commentBackground} onPress={() => undefined}>
						<Text style={styles.userFullName} suppressHighlighting={true}>
							{owner.fullName}
						</Text>
						<RichText
							style={styles.commentText}
							childrenProps={{
								suppressHighlighting: true,
							}}
							parse={[
								{
									type: 'hashtag',
									style: styles.hashtag,
									onPress: () => undefined,
								},
								{
									type: 'tags',
									style: styles.tag,
									onPress: () => undefined,
								},
								{
									type: 'url',
									style: styles.url,
									onPress: () => undefined,
								},
							]}
						>
							{text}
						</RichText>
					</TouchableOpacity>
					{likeIds.length > 0 && (
						<CommentLikes
							numberOfLikes={likeIds.length}
							altPosition={comment.text.length < TEXT_LENGTH_TRESHOLD}
							onViewLikes={() => undefined}
						/>
					)}
				</View>
				{posting ? (
					<Text style={styles.timestamp}>{getText('post.card.creating')}</Text>
				) : (
					<View style={styles.actionsContainer}>
						<Text style={styles.timestamp}>{commentTimestamp}</Text>
						<TouchableOpacity onPress={() => undefined}>
							<Text style={styles.actionButtonText}>
								{likedByCurrentUser
									? getText('comments.screen.actions.unlike')
									: getText('comments.screen.actions.like')}
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
	);
};

storiesOf('Components/displayers', module)
	.addDecorator(withKnobs)
	.addDecorator((getStory: any) => (
		<Provider>
			<CenterView>{getStory()}</CenterView>
		</Provider>
	))
	.add('CommentCard', () => {
		const likedByCurrentUser = boolean('likedByCurrentUser', false);
		const text = string('text', 'Sample text comment.');
		const timestamp = date('timestamp', new Date('February 23, 2018 09:45:00'));
		const avatar = string('avatar', 'QmeRnhzwARzbdU8bHXMvsbHuV4Jhs6HBBvAUdjCMQMup1m');
		const fullName = string('name', 'Sharell Watchman');
		const alias = string('alias', 'sw');

		const comment = {
			commentId: 'commentId',
			text,
			owner: {
				alias,
				avatar,
				fullName,
			},
			timestamp,
			likeIds: ['likeId1', 'likeId2'],
			likedByCurrentUser,
			posting: false,
		};

		return <CommentCard comment={comment} getText={getTextMock} />;
	});
