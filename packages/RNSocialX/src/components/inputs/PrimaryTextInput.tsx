import * as React from 'react';
import {Keyboard, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {OS_TYPES} from '../../environment/consts';
import style, {customStyleProps} from './PrimaryTextInput.style';

export enum TKeyboardKeys {
	default = 'default',
	numeric = 'numeric',
	emailAddress = 'email-address',
	phonePad = 'phone-pad',
}

export enum TRKeyboardKeys {
	done = 'done',
	next = 'next',
	search = 'search',
	send = 'send',
	go = 'go',
	default = 'default',
}

export enum InputSizes {
	Small = 'Small',
	Normal = 'Normal',
	Large = 'Large',
}

interface IPrimaryTextInputProps {
	width: number;
	icon: string;
	iconColor: string;
	placeholder: string;
	placeholderColor: string;
	disabled: boolean;
	isPassword: boolean;
	keyboardType: TKeyboardKeys;
	returnKeyType: TRKeyboardKeys;
	cancelButtonTextColor: string;
	canCancel: boolean;
	onSubmitPressed: (event: any) => void;
	onChangeText: (value: string) => void;
	hasFocus: boolean;
	blurOnSubmit: boolean;
	borderColor: string;
	numberOfLines: number;
	value: string;
	autoFocus: boolean;
	size: InputSizes;
	borderWidth: number;
	multiline: boolean;
	focusUpdateHandler: (hasFocus: boolean) => void;
	autoCorrect: boolean;
	autoCapitalize: 'none' | 'sentences' | 'characters' | 'words';
	persistCancel: boolean;
	onPressCancel: () => void;
	canPost: boolean;
	onPressPost: () => void;
	postButtonTextColor: string;
}

interface IPrimaryTextInputState {
	hasFocus: boolean;
}

const InputIcon: React.SFC<{size: InputSizes; icon: string; iconColor: string}> = ({size, icon, iconColor}) => {
	let iconHeight = customStyleProps.iconHeightNormal;
	if (size === InputSizes.Small) {
		iconHeight = customStyleProps.iconHeightSmall;
	} else if (size === InputSizes.Large) {
		iconHeight = customStyleProps.iconHeightLarge;
	}
	return (
		<View style={[style.iconContainer, style['iconContainer' + size]]}>
			<Icon name={icon} size={iconHeight} color={iconColor} />
		</View>
	);
};

const CancelButton: React.SFC<{
	persistCancel: boolean;
	canCancel: boolean;
	hasFocus: boolean;
	onPressCancel: () => void;
	cancelButtonTextColor: string;
}> = ({persistCancel, canCancel, hasFocus, onPressCancel, cancelButtonTextColor}) => {
	if (persistCancel && canCancel && Platform.OS === OS_TYPES.IOS) {
		return (
			<TouchableOpacity style={style.cancelButton} onPress={onPressCancel}>
				<Text style={[style.cancelButtonText, {color: cancelButtonTextColor}]}>Cancel</Text>
			</TouchableOpacity>
		);
	} else if (hasFocus && canCancel && Platform.OS === OS_TYPES.IOS) {
		return (
			<TouchableOpacity style={style.cancelButton} onPress={() => Keyboard.dismiss()}>
				<Text style={[style.cancelButtonText, {color: cancelButtonTextColor}]}>Cancel</Text>
			</TouchableOpacity>
		);
	}
	return null;
};

const PostButton: React.SFC<{
	canPost: boolean;
	hasFocus: boolean;
	onPressPost: () => void;
	postButtonTextColor: string;
}> = ({canPost, hasFocus, onPressPost, postButtonTextColor}) => {
	if (hasFocus && canPost) {
		return (
			<TouchableOpacity style={style.cancelButton} onPress={() => Keyboard.dismiss()}>
				<Text style={[style.cancelButtonText, {color: postButtonTextColor}]}>Post</Text>
			</TouchableOpacity>
		);
	}
	return null;
};

export class PrimaryTextInput extends React.Component<IPrimaryTextInputProps, IPrimaryTextInputState> {
	public static defaultProps = {
		width: 0,
		icon: '',
		value: '',
		iconColor: customStyleProps.defaultIconColor,
		placeholder: '',
		placeholderColor: customStyleProps.defaultPlaceholderColor,
		disabled: false,
		isPassword: false,
		keyboardType: TKeyboardKeys.default,
		returnKeyType: TRKeyboardKeys.default,
		cancelButtonTextColor: customStyleProps.defaultCancelButtonTextColor,
		canCancel: false,
		hasFocus: false,
		blurOnSubmit: false,
		borderColor: customStyleProps.defaultBorderColor,
		numberOfLines: 1,
		autoFocus: false,
		size: InputSizes.Normal,
		borderWidth: customStyleProps.defaultBorderWidth,
		multiline: false,
		autoCorrect: false,
		autoCapitalize: 'none',
		persistCancel: false,
		focusUpdateHandler: (hasFocus: boolean) => {
			/**/
		},
		onPressCancel: () => {
			/**/
		},
		onSubmitPressed: (event: any) => {
			/**/
		},
	};

	public state = {
		hasFocus: false,
	};

	private inputRef: React.RefObject<TextInput> = React.createRef();

	public render() {
		const {
			icon,
			iconColor,
			size,
			width,
			disabled,
			canCancel,
			cancelButtonTextColor,
			onPressCancel,
			persistCancel,
			autoFocus,
			onChangeText,
			onSubmitPressed,
			returnKeyType,
			isPassword,
			keyboardType,
			placeholder,
			placeholderColor,
			autoCorrect,
			autoCapitalize,
			blurOnSubmit,
			numberOfLines,
			multiline,
			value,
			borderColor,
			borderWidth,
			canPost,
			postButtonTextColor,
			onPressPost,
		} = this.props;
		const {hasFocus} = this.state;

		const isMultiLine = numberOfLines > 1 || multiline;
		const inputContainerStyles = [style.inputContainer, {borderColor, borderWidth}];
		const textInputStyles = [
			style.textInput,
			style['textInput' + size],
			...(isMultiLine ? [style.multilineTextInput] : []),
		];

		return (
			<View style={[style.container, width ? {width} : {}, disabled ? style.disabledInput : {}]}>
				<View style={inputContainerStyles}>
					{icon !== '' && <InputIcon icon={icon} iconColor={iconColor} size={size} />}
					<TextInput
						allowFontScaling={false}
						autoFocus={autoFocus}
						value={value || ''}
						onChangeText={onChangeText}
						onSubmitEditing={onSubmitPressed}
						ref={this.inputRef}
						onFocus={() => this.updateFocusHandler(true)}
						onBlur={() => this.updateFocusHandler(false)}
						returnKeyType={returnKeyType}
						editable={!disabled}
						secureTextEntry={isPassword}
						keyboardType={keyboardType}
						style={textInputStyles}
						placeholder={placeholder}
						placeholderTextColor={placeholderColor}
						autoCorrect={autoCorrect}
						underlineColorAndroid={customStyleProps.defaultUnderlineColorAndroid}
						autoCapitalize={autoCapitalize}
						clearButtonMode={'while-editing'} // only works on iOS
						blurOnSubmit={blurOnSubmit}
						numberOfLines={numberOfLines}
						multiline={isMultiLine}
					/>
				</View>
				<CancelButton
					canCancel={canCancel}
					hasFocus={hasFocus}
					cancelButtonTextColor={cancelButtonTextColor}
					onPressCancel={onPressCancel}
					persistCancel={persistCancel}
				/>
				<PostButton
					canPost={canPost}
					hasFocus={hasFocus}
					postButtonTextColor={postButtonTextColor}
					onPressPost={onPressPost}
				/>
			</View>
		);
	}

	public focusInput = () => {
		if (this.inputRef.current) {
			this.inputRef.current.focus();
		}
	};

	private updateFocusHandler = (value: boolean) => {
		this.setState({
			hasFocus: value,
		});
		this.props.focusUpdateHandler(value);
	};
}
