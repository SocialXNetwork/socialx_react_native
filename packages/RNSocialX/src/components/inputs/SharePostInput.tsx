import * as React from 'react';
import {Text, TextInput, View} from 'react-native';

import {AvatarImage} from '../';
import style, {customStyleProps} from './SharePostInput.style';

const MAX_POST_LENGTH = 500;

interface ISharePostInputProps {
	avatarSource?: string;
	placeholder: string;
	text: string;
	onTextUpdate: (value: string) => void;
}

export const SharePostInput: React.SFC<ISharePostInputProps> = ({avatarSource, placeholder, text, onTextUpdate}) => (
	<View style={style.shareMessageContainer}>
		<AvatarImage image={avatarSource} style={style.avatarImage} />
		<View style={style.captionContainer}>
			<TextInput
				style={style.textInput}
				autoFocus={true}
				autoCorrect={true}
				autoCapitalize={'sentences'}
				underlineColorAndroid={customStyleProps.underlineColorAndroid}
				numberOfLines={1}
				multiline={true}
				placeholder={placeholder}
				onChangeText={onTextUpdate}
				maxLength={MAX_POST_LENGTH}
			>
				<Text style={style.captionTextInput}>{text}</Text>
			</TextInput>
		</View>
	</View>
);
