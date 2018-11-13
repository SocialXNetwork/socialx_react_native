import * as React from 'react';
import { TextInput, View } from 'react-native';

import { AvatarImage } from '../';
import style, { customStyleProps } from './SharePostInput.style';

const MAX_POST_LENGTH = 500;

interface ISharePostInputProps {
	avatar: string;
	placeholder: string;
	value: string;
	onChangeText: (value: string) => void;
}

export const SharePostInput: React.SFC<ISharePostInputProps> = ({
	avatar,
	placeholder,
	value,
	onChangeText,
}) => (
	<View style={style.container}>
		<AvatarImage image={avatar} style={style.avatar} />
		<View style={style.inputContainer}>
			<TextInput
				value={value}
				autoFocus={true}
				autoCorrect={false}
				autoCapitalize="sentences"
				underlineColorAndroid={customStyleProps.underlineColorAndroid}
				multiline={true}
				placeholder={placeholder}
				maxLength={MAX_POST_LENGTH}
				onChangeText={onChangeText}
				style={style.input}
			/>
		</View>
	</View>
);
