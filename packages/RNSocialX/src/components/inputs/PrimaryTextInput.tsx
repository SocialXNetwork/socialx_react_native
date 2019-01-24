import * as React from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors, Sizes } from '../../environment/theme';
import styles from './PrimaryTextInput.style';

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
	width: number | string;
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
	hasFocus: boolean;
	blurOnSubmit: boolean;
	borderColor: string;
	numberOfLines: number;
	value: string;
	autoFocus: boolean;
	size: InputSizes;
	borderWidth: number;
	multiline: boolean;
	autoCorrect: boolean;
	autoCapitalize: 'none' | 'sentences' | 'characters' | 'words';
	persistCancel: boolean;
	persistKeyboard: boolean;
	onSubmitPressed: (event: any) => void;
	onChangeText: (value: string) => void;
	onSetFocus: (hasFocus: boolean) => void;
	onPressCancel: () => void;
	onBlur?: () => void;
}

interface IPrimaryTextInputState {
	hasFocus: boolean;
	iconColor: string;
}

interface IInputIconProps {
	size: InputSizes;
	icon: string;
	iconColor: string;
}

const InputIcon: React.SFC<IInputIconProps> = ({ size, icon, iconColor }) => {
	let iconHeight = Sizes.smartHorizontalScale(20);
	let containerSize = styles.iconContainerNormal;

	if (size === InputSizes.Small) {
		iconHeight = Sizes.smartHorizontalScale(20);
		containerSize = styles.iconContainerSmall;
	} else if (size === InputSizes.Large) {
		iconHeight = Sizes.smartHorizontalScale(30);
		containerSize = styles.iconContainerLarge;
	}

	return (
		<View style={[styles.iconContainer, containerSize]}>
			<Icon name={icon} size={iconHeight} color={iconColor} />
		</View>
	);
};

interface ICancelButtonProps {
	persistCancel: boolean;
	canCancel: boolean;
	hasFocus: boolean;
	cancelButtonTextColor: string;
	onPressCancel: () => void;
}

const CancelButton: React.SFC<ICancelButtonProps> = ({
	persistCancel,
	canCancel,
	hasFocus,
	onPressCancel,
	cancelButtonTextColor,
}) => {
	if (persistCancel && canCancel) {
		return (
			<TouchableOpacity style={styles.cancelButton} onPress={onPressCancel}>
				<Text style={[styles.cancelButtonText, { color: cancelButtonTextColor }]}>Cancel</Text>
			</TouchableOpacity>
		);
	} else if (hasFocus && canCancel) {
		return (
			<TouchableOpacity
				style={styles.cancelButton}
				onPress={() => {
					Keyboard.dismiss();
					onPressCancel();
				}}
			>
				<Text style={[styles.cancelButtonText, { color: cancelButtonTextColor }]}>Cancel</Text>
			</TouchableOpacity>
		);
	}

	return null;
};

export class PrimaryTextInput extends React.Component<
	IPrimaryTextInputProps,
	IPrimaryTextInputState
> {
	public static defaultProps = {
		width: '100%',
		icon: '',
		value: '',
		iconColor: Colors.iron,
		placeholder: '',
		placeholderColor: Colors.dustyGray,
		disabled: false,
		isPassword: false,
		keyboardType: TKeyboardKeys.default,
		returnKeyType: TRKeyboardKeys.default,
		cancelButtonTextColor: Colors.pink,
		canCancel: false,
		hasFocus: false,
		blurOnSubmit: false,
		borderColor: Colors.pink,
		numberOfLines: 1,
		autoFocus: false,
		size: InputSizes.Normal,
		borderWidth: 2,
		multiline: false,
		autoCorrect: false,
		autoCapitalize: 'none',
		persistCancel: false,
		persistKeyboard: false,
		onSetFocus: () => undefined,
		onPressCancel: () => undefined,
		onChangeText: () => undefined,
		onSubmitPressed: () => undefined,
		onBlur: () => undefined,
	};

	public state = {
		hasFocus: false,
		iconColor: this.props.autoFocus ? Colors.pink : Colors.iron,
	};

	private inputRef: React.RefObject<TextInput> = React.createRef();

	public render() {
		const {
			icon,
			size,
			width,
			disabled,
			canCancel,
			cancelButtonTextColor,
			onPressCancel,
			persistCancel,
			autoFocus,
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
			persistKeyboard,
			onBlur,
			onChangeText,
			onSubmitPressed,
		} = this.props;
		const { hasFocus } = this.state;

		let inputSize = styles.textInputNormal;

		if (size === InputSizes.Small) {
			inputSize = styles.textInputSmall;
		} else if (size === InputSizes.Large) {
			inputSize = styles.textInputLarge;
		}

		const isMultiLine = numberOfLines > 1 || multiline;
		const inputContainerStyles = [styles.inputContainer, { borderColor, borderWidth }];
		const textInputStyles = [
			styles.textInput,
			inputSize,
			...(isMultiLine ? [styles.multilineTextInput, { height: 'auto' }] : []),
		];

		return (
			<View
				style={[styles.container, width ? { width } : {}, disabled ? styles.disabledInput : {}]}
			>
				<View style={inputContainerStyles}>
					{icon !== '' && <InputIcon icon={icon} iconColor={this.state.iconColor} size={size} />}
					<TextInput
						allowFontScaling={false}
						autoFocus={autoFocus}
						value={value || ''}
						onChangeText={onChangeText}
						onSubmitEditing={(event) => {
							onSubmitPressed(event);
							if (!persistKeyboard) {
								Keyboard.dismiss();
							}
						}}
						ref={this.inputRef}
						onFocus={() => this.setFocusHandler(true)}
						onBlur={() => {
							this.setFocusHandler(false);
							if (onBlur) {
								onBlur();
							}
						}}
						returnKeyType={returnKeyType}
						editable={!disabled}
						secureTextEntry={isPassword}
						keyboardType={keyboardType}
						style={textInputStyles}
						placeholder={placeholder}
						placeholderTextColor={placeholderColor}
						autoCorrect={autoCorrect}
						underlineColorAndroid={Colors.transparent}
						autoCapitalize={autoCapitalize}
						clearButtonMode="while-editing"
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
			</View>
		);
	}

	public focusInput = () => {
		if (this.inputRef.current) {
			this.inputRef.current.focus();
		}
	};

	private setFocusHandler = (value: boolean) => {
		this.setState({
			hasFocus: value,
			iconColor: value ? Colors.pink : this.props.iconColor,
		});
		this.props.onSetFocus(value);
	};
}
