import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RichText } from '../..';
import { Colors, Fonts, Sizes } from '../../../environment/theme';
import { ISimpleComment } from '../../../types';

interface IBestCommentsProps {
	bestComments: ISimpleComment[];
	onUserPress: (userId: string) => void;
	onCommentPress: () => void;
}

export const BestComments: React.SFC<IBestCommentsProps> = ({
	bestComments,
	onUserPress,
	onCommentPress,
}) => (
	<React.Fragment>
		{bestComments.length > 0 && (
			<View style={styles.container}>
				{bestComments.map((comment: ISimpleComment, index: number) => (
					<Text style={styles.commentContainer} numberOfLines={2} key={index}>
						<Text
							style={styles.user}
							onPress={() => onUserPress(comment.owner.userId)}
							suppressHighlighting={true}
						>
							{comment.owner.userName}
						</Text>
						<RichText
							style={styles.text}
							childrenProps={{
								onPress: onCommentPress,
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
							{'  ' + comment.text}
						</RichText>
					</Text>
				))}
			</View>
		)}
	</React.Fragment>
);

const style: any = {
	container: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
	},
	commentContainer: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.cloudBurst,
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	user: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(15),
	},
	text: {
		fontSize: Sizes.smartHorizontalScale(15),
	},
	hashtag: {
		color: Colors.pink,
	},
	tag: {
		color: Colors.pink,
	},
	url: {
		color: Colors.pink,
	},
};

const styles = StyleSheet.create(style);
