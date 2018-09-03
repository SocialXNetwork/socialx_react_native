import React, {Component} from 'react';
import {Keyboard, Platform, Text, TextInput, TextInputProps, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {OS_TYPES} from '../../environment/consts';
import {Colors, Sizes} from '../../environment/theme';
import style from './SXTextInput.style';

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
	// here the values and keys should be the same!
	Normal = 'Normal',
	Small = 'Small',
	Large = 'Large',
}

interface ISXTextInputProps {
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
}

interface ISXTextInputState {
	hasFocus: boolean;
}

export class SXTextInput extends Component<ISXTextInputProps, ISXTextInputState> {
	public static defaultProps = {
		width: 0,
		icon: '',
		iconColor: Colors.shuttleGray,
		placeholder: '',
		placeholderColor: Colors.grayText,
		disabled: false,
		isPassword: false,
		keyboardType: TKeyboardKeys.default,
		returnKeyType: TRKeyboardKeys.default,
		cancelButtonTextColor: Colors.white,
		canCancel: false,
		hasFocus: false,
		blurOnSubmit: false,
		borderColor: Colors.pink,
		numberOfLines: 1,
		autoFocus: false,
		size: InputSizes.Normal,
		borderWidth: Sizes.smartHorizontalScale(2),
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
	};

	public state = {
		hasFocus: false,
	};

	public inputComponent: any;

	public render() {
		const isMultiline = this.props.numberOfLines > 1 || this.props.multiline;
		const inputContainerStyles = [
			style.inputContainer,
			{
				borderColor: this.props.borderColor,
				borderWidth: this.props.borderWidth,
			},
		];
		const textInputStyles = [
			style.textInput,
			style['textInput' + this.props.size],
			...(isMultiline ? [style.multilineTextInput] : []),
		];

		const valueProps: Partial<TextInputProps> = {};
		if ('value' in this.props) {
			valueProps.value = this.props.value;
		}

		return (
			<View style={this.getContainerStyles()}>
				<View style={inputContainerStyles}>
					{this.renderInputIcon()}
					<TextInput
						allowFontScaling={false}
						autoFocus={this.props.autoFocus}
						{...valueProps}
						onChangeText={this.textChangedHandler}
						onSubmitEditing={this.props.onSubmitPressed}
						ref={(component: any) => (this.inputComponent = component)}
						onFocus={() => this.updateFocusHandler(true)}
						onBlur={() => this.updateFocusHandler(false)}
						returnKeyType={this.props.returnKeyType}
						editable={!this.props.disabled}
						secureTextEntry={this.props.isPassword}
						keyboardType={this.props.keyboardType}
						style={textInputStyles}
						placeholder={this.props.placeholder}
						placeholderTextColor={this.props.placeholderColor}
						autoCorrect={this.props.autoCorrect}
						underlineColorAndroid={Colors.transparent}
						autoCapitalize={this.props.autoCapitalize}
						clearButtonMode={'while-editing'} // only works on iOS
						blurOnSubmit={this.props.blurOnSubmit}
						numberOfLines={this.props.numberOfLines}
						multiline={isMultiline}
					/>
				</View>
				{this.renderCancelButton()}
			</View>
		);
	}

	public focusInput = () => {
		if (this.inputComponent) {
			this.inputComponent.focus();
		}
	};

	// todo @serkan @jake is this worth creating a function instance per mount?
	private getContainerStyles = () => [
		style.container,
		...(this.props.width ? [{width: this.props.width}] : []),
		...(this.props.disabled ? [style.disabledInput] : []),
	];

	private renderInputIcon = () => {
		if (this.props.icon) {
			return (
				<View style={[style.iconContainer, style['iconContainer' + this.props.size]]}>
					<Icon name={this.props.icon} size={this.getIconHeight()} color={this.props.iconColor} />
				</View>
			);
		}
		return null;
	};

	private renderCancelButton = () => {
		if (this.props.persistCancel && this.props.canCancel && Platform.OS === OS_TYPES.IOS) {
			return (
				<TouchableOpacity style={style.cancelButton} onPress={this.props.onPressCancel}>
					<Text style={[style.cancelButtonText, {color: this.props.cancelButtonTextColor}]}>Cancel</Text>
				</TouchableOpacity>
			);
		} else if (this.state.hasFocus && this.props.canCancel && Platform.OS === OS_TYPES.IOS) {
			return (
				<TouchableOpacity style={style.cancelButton} onPress={() => Keyboard.dismiss()}>
					<Text style={[style.cancelButtonText, {color: this.props.cancelButtonTextColor}]}>Cancel</Text>
				</TouchableOpacity>
			);
		}
		return null;
	};

	private updateFocusHandler = (value: boolean) => {
		this.setState({
			hasFocus: value,
		});
		if (this.props.focusUpdateHandler) {
			this.props.focusUpdateHandler(value);
		}
	};

	private textChangedHandler = (value: string) => {
		if (this.props.onChangeText) {
			this.props.onChangeText(value);
		}
	};

	private getIconHeight = () => {
		let ret = Sizes.smartHorizontalScale(30);
		if (this.props.size === InputSizes.Small) {
			ret = Sizes.smartHorizontalScale(15);
		} else if (this.props.size === InputSizes.Large) {
			ret = Sizes.smartHorizontalScale(40);
		}
		return ret;
	};
}
