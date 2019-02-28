import * as React from 'react';
import { Text, View } from 'react-native';

import { RichText } from '../..';
import { IDictionary } from '../../../types';

import styles from './PostText.style';

const SHORT_POST_LENGTH = 100;
const SHORT_POST_LINES = 3;

interface IProps extends IDictionary {
	text: string;
	fullTextVisible: boolean;
	handleHashTag: (hashTag: string) => void;
	handleUserTag: (userTag: string) => void;
	handleUrls: (url: string) => void;
	onShowFullText: () => void;
}

export const PostText: React.SFC<IProps> = ({
	text,
	fullTextVisible,
	handleHashTag,
	handleUserTag,
	handleUrls,
	dictionary,
	onShowFullText,
}) => {
	const numberOfLines = text.split('\n').length;
	const hasMore =
		(text.length > SHORT_POST_LENGTH || numberOfLines > SHORT_POST_LINES) && !fullTextVisible;

	let description = text;
	if (hasMore) {
		if (numberOfLines > SHORT_POST_LINES) {
			description = description
				.split('\n')
				.slice(0, SHORT_POST_LINES)
				.join('\n');
		}

		if (text.length > SHORT_POST_LENGTH) {
			description = description.substr(0, SHORT_POST_LENGTH);
		}

		description.trim();
		description = description.concat('... ');
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				<RichText
					style={styles.text}
					childrenProps={{ allowFontScaling: false }}
					parse={[
						{
							type: 'hashtag',
							style: styles.hashtag,
							onPress: handleHashTag,
						},
						{
							type: 'tags',
							style: styles.tag,
							onPress: handleUserTag,
						},
						{
							type: 'url',
							style: styles.url,
							onPress: handleUrls,
						},
					]}
				>
					{description}
				</RichText>
				{!!hasMore && (
					<Text style={styles.more} onPress={onShowFullText}>
						{dictionary.components.displayers.wallPost.more}
					</Text>
				)}
			</Text>
		</View>
	);
};
