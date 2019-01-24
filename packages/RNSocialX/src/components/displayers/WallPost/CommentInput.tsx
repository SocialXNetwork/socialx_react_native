import * as React from 'react';
import { Animated, Keyboard, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { AvatarImage, InputSizes, PrimaryTextInput, TRKeyboardKeys } from '../../';
import { Colors } from '../../../environment/theme';
import { IDictionary } from '../../../types';

import styles from './CommentInput.style';

interface IAnimationValues {
	width: Animated.Value;
	send: Animated.Value;
}

interface ICommentInputProps extends IDictionary {
	comment: string;
	feed?: boolean;
	avatar?: string;
	animationValues?: IAnimationValues;
	disabled?: boolean;
	autoFocus?: boolean;
	commentInputRef?: React.RefObject<PrimaryTextInput>;
	onCommentInputPress?: () => void;
	onCommentInputBlur?: () => void;
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
	onCommentInputBlur,
	dictionary,
}) => (
	<TouchableOpacity onPress={onCommentInputPress} activeOpacity={1} style={styles.container}>
		{feed && (
			<React.Fragment>
				<AvatarImage image={avatar} style={styles.avatar} />
				<Animated.View
					style={[styles.inputContainer, styles.animatingInput, { width: animationValues.width }]}
				>
					<PrimaryTextInput
						borderWidth={0}
						size={InputSizes.Small}
						placeholder={dictionary.components.inputs.placeholder.comment}
						value={comment}
						autoCorrect={false}
						autoFocus={autoFocus}
						returnKeyType={TRKeyboardKeys.send}
						blurOnSubmit={true}
						multiline={true}
						disabled={disabled}
						onBlur={onCommentInputBlur}
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
							name="ios-paper-plane"
							style={[
								styles.icon,
								{ color: comment.length === 0 ? Colors.dustyGray : Colors.pink },
							]}
						/>
					</TouchableOpacity>
				</Animated.View>
			</React.Fragment>
		)}
		{!feed && (
			<React.Fragment>
				<View style={[styles.inputContainer, { flex: 1 }]}>
					<PrimaryTextInput
						ref={commentInputRef}
						borderWidth={0}
						size={InputSizes.Small}
						placeholder={dictionary.components.inputs.placeholder.comment}
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
							name="ios-paper-plane"
							style={[
								styles.icon,
								{ color: comment.length === 0 ? Colors.dustyGray : Colors.pink },
							]}
						/>
					</TouchableOpacity>
				</View>
			</React.Fragment>
		)}
	</TouchableOpacity>
);
