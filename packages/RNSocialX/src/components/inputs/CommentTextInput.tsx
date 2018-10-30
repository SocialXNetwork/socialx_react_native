import * as React from 'react';
import { Keyboard, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { InputSizes, PrimaryTextInput, TRKeyboardKeys } from '../';
import { ITranslatedProps } from '../../types';

import { Colors } from '../../environment/theme';
import styles from './CommentTextInput.style';

interface ICommentTextInputProps extends ITranslatedProps {
	autoFocus: boolean;
	comment: string;
	onCommentSend: () => void;
	onCommentInputChange: (value: string) => void;
}

export const CommentTextInput = React.forwardRef<TextInput, ICommentTextInputProps>(
	({ autoFocus = true, comment, onCommentInputChange, onCommentSend, getText }, ref) => (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<PrimaryTextInput
					borderWidth={0}
					size={InputSizes.Small}
					placeholder={getText('comments.screen.comment.input.placeholder')}
					value={comment}
					autoFocus={autoFocus}
					onChangeText={onCommentInputChange}
					returnKeyType={TRKeyboardKeys.send}
					onSubmitPressed={comment.length > 0 ? onCommentSend : Keyboard.dismiss}
					blurOnSubmit={true}
				/>
			</View>

			<View style={styles.send}>
				<TouchableOpacity onPress={onCommentSend} activeOpacity={1} disabled={comment.length === 0}>
					<Icon
						name="comment-arrow-right"
						style={[styles.icon, { color: comment.length === 0 ? Colors.grayText : Colors.pink }]}
					/>
				</TouchableOpacity>
			</View>
		</View>
	),
);
