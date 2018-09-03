import * as React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import style, {customStyleProps} from './CommentTextInput.style';

interface ICommentTextInputProps {
	placeholder: string;
	autoFocus?: boolean;
	showSendButton: boolean;
	commentText: string;
	onCommentSend: () => void;
	onCommentTextChange: (value: string) => void;
}

const textInput: React.RefObject<TextInput> = React.createRef();

const sendCommentHandler = (onCommentSend: () => void) => {
	if (textInput.current) {
		textInput.current.blur();
	}
	onCommentSend();
};

export const CommentTextInput: React.SFC<ICommentTextInputProps> = ({
	placeholder,
	autoFocus,
	commentText,
	onCommentTextChange,
	showSendButton,
	onCommentSend,
}) => (
	<View style={style.inputContainer}>
		<TextInput
			ref={textInput}
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
				<TouchableOpacity onPress={() => sendCommentHandler(onCommentSend)} style={style.sendButton}>
					<Icon name={'md-send'} style={style.sendIcon} />
				</TouchableOpacity>
			</View>
		)}
	</View>
);

CommentTextInput.defaultProps = {
	autoFocus: true,
};
