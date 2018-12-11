import * as React from 'react';
import { Animated, Dimensions, Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AvatarImage, InputSizes, PrimaryTextInput, TRKeyboardKeys } from '../../';
import { Colors, Sizes } from '../../../environment/theme';
import { ITranslatedProps } from '../../../types';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface IAnimationValues {
	width: Animated.Value;
	send: Animated.Value;
}

interface ICommentInputProps extends ITranslatedProps {
	comment: string;
	feed?: boolean;
	avatar?: string;
	animationValues?: IAnimationValues;
	disabled?: boolean;
	autoFocus?: boolean;
	commentInputRef?: React.RefObject<PrimaryTextInput>;
	onCommentInputPress?: () => void;
	onCommentInputChange: (comment: string) => void;
	onSubmitComment: () => void;
}

export const CommentInput: React.SFC<ICommentInputProps> = ({
	comment,
	feed = false,
	avatar = '',
	animationValues = {
		width: 0,
		send: 0,
	},
	disabled = false,
	autoFocus = false,
	commentInputRef,
	onCommentInputChange,
	onCommentInputPress,
	onSubmitComment,
	getText,
}) => (
	<TouchableOpacity onPress={onCommentInputPress} activeOpacity={1} style={styles.container}>
		{feed && (
			<React.Fragment>
				<AvatarImage image={avatar} style={styles.avatar} />
				<Animated.View style={[styles.inputContainer, { width: animationValues.width }]}>
					<PrimaryTextInput
						borderWidth={0}
						size={InputSizes.Small}
						placeholder={getText('comments.screen.comment.input.placeholder')}
						value={comment}
						autoCorrect={false}
						autoFocus={autoFocus}
						returnKeyType={TRKeyboardKeys.send}
						blurOnSubmit={true}
						multiline={true}
						disabled={disabled}
						onSetFocus={onCommentInputPress}
						onChangeText={onCommentInputChange}
						onSubmitPressed={comment.length > 0 ? onSubmitComment : Keyboard.dismiss}
					/>
				</Animated.View>
				<Animated.View style={[styles.send, { transform: [{ translateX: animationValues.send }] }]}>
					<TouchableOpacity
						onPress={comment.length > 0 ? onSubmitComment : Keyboard.dismiss}
						activeOpacity={1}
						disabled={comment.length === 0}
					>
						<Icon
							name="comment-arrow-right"
							style={[styles.icon, { color: comment.length === 0 ? Colors.grayText : Colors.pink }]}
						/>
					</TouchableOpacity>
				</Animated.View>
			</React.Fragment>
		)}
		{!feed && (
			<React.Fragment>
				<View style={styles.inputContainer}>
					<PrimaryTextInput
						ref={commentInputRef}
						borderWidth={0}
						size={InputSizes.Small}
						placeholder={getText('comments.screen.comment.input.placeholder')}
						value={comment}
						autoCorrect={false}
						autoFocus={autoFocus}
						returnKeyType={TRKeyboardKeys.send}
						blurOnSubmit={true}
						multiline={true}
						disabled={disabled}
						onChangeText={onCommentInputChange}
						onSubmitPressed={comment.length > 0 ? onSubmitComment : Keyboard.dismiss}
					/>
				</View>
				<View style={styles.send}>
					<TouchableOpacity
						onPress={comment.length > 0 ? onSubmitComment : Keyboard.dismiss}
						activeOpacity={1}
						disabled={comment.length === 0}
					>
						<Icon
							name="comment-arrow-right"
							style={[styles.icon, { color: comment.length === 0 ? Colors.grayText : Colors.pink }]}
						/>
					</TouchableOpacity>
				</View>
			</React.Fragment>
		)}
	</TouchableOpacity>
);

const styles: any = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		marginTop: Sizes.smartVerticalScale(5),
	},
	inputContainer: {
		borderWidth: Sizes.smartHorizontalScale(1),
		borderRadius: Sizes.smartHorizontalScale(6),
		borderColor: Colors.grayText,
		width: SCREEN_WIDTH - Sizes.smartHorizontalScale(85),
		maxWidth: SCREEN_WIDTH - Sizes.smartHorizontalScale(85),
	},
	avatar: {
		width: Sizes.smartHorizontalScale(35),
		height: Sizes.smartHorizontalScale(35),
		borderRadius: Sizes.smartHorizontalScale(35) / 2,
		marginRight: Sizes.smartHorizontalScale(10),
	},
	send: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginLeft: Sizes.smartHorizontalScale(5),
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(30),
		transform: [{ translateY: 2 }],
	},
});
