import * as React from 'react';
import { Text, View } from 'react-native';

import { RichText } from '../..';
import { ITranslatedProps } from '../../../types';

import styles from './PostText.style';

const POST_SHORT_LENGTH = 100;
const POST_SHORT_MAX_LINES = 3;

interface IPostTextProps extends ITranslatedProps {
	text: string;
	fullTextVisible: boolean;
	handleHashTag: (hashTag: string) => void;
	handleUserTag: (userTag: string) => void;
	handleUrls: (url: string) => void;
	onShowFullText: () => void;
}

export const PostText: React.SFC<IPostTextProps> = ({
	text,
	fullTextVisible,
	handleHashTag,
	handleUserTag,
	handleUrls,
	onShowFullText,
	getText,
}) => {
	const numberOfLines = text.split('\n').length;

	const hasMore =
		(text.length > POST_SHORT_LENGTH || numberOfLines > POST_SHORT_MAX_LINES) && !fullTextVisible;

	let textToRender = text;

	if (hasMore) {
		if (numberOfLines > POST_SHORT_MAX_LINES) {
			textToRender = textToRender
				.split('\n')
				.slice(0, POST_SHORT_MAX_LINES)
				.join('\n');
		}

		if (text.length > POST_SHORT_LENGTH) {
			textToRender = textToRender.substr(0, POST_SHORT_LENGTH);
		}

		textToRender = textToRender + '...';
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
					<Text>{textToRender}</Text>
				</RichText>
				{!!hasMore && (
					<Text style={styles.showMoreText} onPress={onShowFullText}>
						{getText('text.more')}
					</Text>
				)}
			</Text>
		</View>
	);
};
