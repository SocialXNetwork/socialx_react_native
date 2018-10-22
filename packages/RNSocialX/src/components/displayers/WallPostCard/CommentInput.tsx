import * as React from 'react';
import {
	Animated,
	Dimensions,
	Keyboard,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { InputSizes, PrimaryTextInput, TRKeyboardKeys } from '../../';
import {
	AnimatedFastImage,
	Colors,
	Images,
	Sizes,
} from '../../../environment/theme';
import { ITranslatedProps } from '../../../types';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface IAnimationValues {
	size: Animated.Value;
	radius: Animated.Value;
	border: Animated.Value;
	send: Animated.Value;
}

interface ICommentInputProps extends ITranslatedProps {
	noInput: boolean | undefined;
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
	getText,
}) => {
	if (noInput) {
		return null;
	} else {
		return (
			<TouchableOpacity
				onPress={onCommentInputPress}
				activeOpacity={1}
				style={styles.container}
			>
				<AnimatedFastImage
					source={
						avatarURL.length > 0
							? { uri: avatarURL }
							: Images.user_avatar_placeholder
					}
					style={[
						styles.avatar,
						{
							width: animationValues.size,
							height: animationValues.size,
							borderRadius: animationValues.radius,
						},
					]}
				/>
				<Animated.View
					style={[
						styles.inputContainer,
						{
							borderWidth: animationValues.border,
						},
					]}
				>
					<PrimaryTextInput
						width={SCREEN_WIDTH - 115}
						borderWidth={0}
						size={InputSizes.Small}
						placeholder={getText('comments.screen.comment.input.placeholder')}
						value={comment}
						onChangeText={onCommentInputChange}
						focusUpdateHandler={onCommentInputPress}
						returnKeyType={TRKeyboardKeys.send}
						onSubmitPressed={
							comment.length > 0 ? onSubmitComment : Keyboard.dismiss
						}
						blurOnSubmit={true}
						disabled={disabled}
					/>
				</Animated.View>
				<Animated.View
					style={[
						styles.send,
						{ transform: [{ translateX: animationValues.send }] },
					]}
				>
					<TouchableOpacity
						onPress={comment.length > 0 ? onSubmitComment : Keyboard.dismiss}
						activeOpacity={1}
						disabled={comment.length === 0}
					>
						<Icon
							name="comment-arrow-right"
							style={[
								styles.icon,
								{ color: comment.length === 0 ? Colors.grayText : Colors.pink },
							]}
						/>
					</TouchableOpacity>
				</Animated.View>
			</TouchableOpacity>
		);
	}
};

const styles: any = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		marginTop: Sizes.smartVerticalScale(5),
	},
	inputContainer: {
		borderRadius: Sizes.smartHorizontalScale(6),
		borderColor: Colors.grayText,
	},
	avatar: {
		width: Sizes.smartHorizontalScale(25),
		height: Sizes.smartHorizontalScale(25),
		borderRadius: Sizes.smartHorizontalScale(25) / 2,
		marginRight: Sizes.smartHorizontalScale(8),
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
