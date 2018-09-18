import * as React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import style, {customStyleProps} from './CommentTextInput.style';

interface ICommentTextInputProps {
	placeholder: string;
	autoFocus: boolean;
	showSendButton: boolean;
	commentText: string;
	onCommentSend: () => void;
	onCommentTextChange: (value: string) => void;
}

export const CommentTextInput = React.forwardRef<TextInput, ICommentTextInputProps>(
	({placeholder, autoFocus = true, commentText, onCommentTextChange, showSendButton, onCommentSend}, ref) => (
		<View style={style.inputContainer}>
			<TextInput
				ref={ref}
				onChangeText={onCommentTextChange}
				style={style.textInput}
				placeholder={placeholder}
				autoFocus={autoFocus}
				multiline={true}
				autoCorrect={false}
				underlineColorAndroid={customStyleProps.underlineColorAndroid}
				autoCapitalize={'none'}
				value={commentText}
				placeholderTextColor={customStyleProps.placeholderTextColor}
			/>
			{showSendButton && (
				<View style={style.sendButtonContainer}>
					<TouchableOpacity onPress={onCommentSend} style={style.sendButton}>
						<Icon name={'md-send'} style={style.sendIcon} />
					</TouchableOpacity>
				</View>
			)}
		</View>
	),
);
