import * as React from 'react';
import {
	Animated,
	Dimensions,
	ImageRequireSource,
	Keyboard,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import { InputSizes, PrimaryTextInput, TRKeyboardKeys } from '../../';
import {
	AnimatedFastImage,
	Colors,
	Images,
	Sizes,
} from '../../../environment/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface IAnimationValues {
	size: Animated.Value;
	radius: Animated.Value;
	border: Animated.Value;
}

interface ICommentInputProps {
	noInput: boolean;
	comment: string;
	disabled: boolean;
	avatarURL: string;
	animationValues: IAnimationValues;
	onCommentInputChange: (comment: string) => void;
	onCommentInputPress: () => void;
	onSubmitComment: () => void;
}

export const CommentInput: React.SFC<ICommentInputProps> = ({
	noInput,
	comment,
	disabled,
	avatarURL,
	animationValues,
	onCommentInputChange,
	onCommentInputPress,
	onSubmitComment,
}) => {
	if (noInput) {
		return null;
	} else {
		return (
			<TouchableOpacity
				onPress={onCommentInputPress}
				activeOpacity={1}
				style={styles.commentInputContainer}
			>
				<AnimatedFastImage
					source={
						avatarURL.length > 0
							? { uri: avatarURL }
							: Images.user_avatar_placeholder
					}
					style={[
						styles.commentInputAvatar,
						{
							width: animationValues.size,
							height: animationValues.size,
							borderRadius: animationValues.radius,
						},
					]}
				/>
				<Animated.View
					style={[
						styles.commentInputView,
						{
							borderWidth: animationValues.border,
						},
					]}
				>
					<PrimaryTextInput
						width={SCREEN_WIDTH - 90}
						borderWidth={0}
						size={InputSizes.Small}
						placeholder="Add a comment..."
						value={comment}
						onChangeText={onCommentInputChange}
						focusUpdateHandler={onCommentInputPress}
						returnKeyType={TRKeyboardKeys.send}
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
		borderRadius: Sizes.smartHorizontalScale(25) / 2,
		marginRight: Sizes.smartHorizontalScale(8),
	},
});
