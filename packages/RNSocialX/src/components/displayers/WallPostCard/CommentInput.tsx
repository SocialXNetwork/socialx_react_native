import * as React from 'react';
import {Animated, Dimensions, ImageRequireSource, Keyboard, StyleSheet, TouchableOpacity} from 'react-native';

import {InputSizes, PrimaryTextInput, TRKeyboardKeys} from '../../';
import {AnimatedImage, Colors, Images, Sizes} from '../../../environment/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface IAnimationValues {
	width: Animated.Value;
	height: Animated.Value;
	border: Animated.Value;
}

interface ICommentInputProps {
	noInput: boolean;
	comment: string;
	disabled: boolean;
	avatarURL?: string | ImageRequireSource;
	animationValues: IAnimationValues;
	onCommentInputChange: (comment: string) => void;
	onCommentInputPress: () => void;
	onSubmitComment: () => void;
}

export const CommentInput: React.SFC<ICommentInputProps> = ({
	noInput,
	comment,
	disabled,
	avatarURL = Images.user_avatar_placeholder,
	animationValues,
	onCommentInputChange,
	onCommentInputPress,
	onSubmitComment,
}) => {
	if (noInput) {
		return null;
	} else {
		return (
			<TouchableOpacity onPress={onCommentInputPress} activeOpacity={1} style={styles.commentInputContainer}>
				<AnimatedImage
					source={typeof avatarURL === 'string' ? {uri: avatarURL} : avatarURL}
					style={[styles.commentInputAvatar, {width: animationValues.width, height: animationValues.height}]}
				/>
				<Animated.View style={[styles.commentInputView, {borderWidth: animationValues.border}]}>
					<PrimaryTextInput
						width={SCREEN_WIDTH - 90}
						borderWidth={0}
						size={InputSizes.Small}
						placeholder={'Add a comment...'}
						value={comment}
						onChangeText={onCommentInputChange}
						focusUpdateHandler={onCommentInputPress}
						returnKeyType={TRKeyboardKeys.done}
						onSubmitPressed={Keyboard.dismiss}
						blurOnSubmit={true}
						disabled={disabled}
						canPost={true}
						postButtonTextColor={Colors.pink}
						onPressPost={onSubmitComment}
					/>
				</Animated.View>
			</TouchableOpacity>
		);
	}
};

const styles: any = StyleSheet.create({
	commentInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		marginTop: Sizes.smartVerticalScale(5),
	},
	commentInputView: {
		borderRadius: Sizes.smartHorizontalScale(6),
		borderColor: Colors.grayText,
	},
	commentInputAvatar: {
		width: Sizes.smartHorizontalScale(25),
		height: Sizes.smartHorizontalScale(25),
		borderRadius: Sizes.smartHorizontalScale(40) / 2,
		marginRight: Sizes.smartHorizontalScale(8),
	},
});
