import * as React from 'react';
import { Keyboard } from 'react-native';

import { IKeyboardContextProps } from '../../environment/consts';

interface IManagedKeyboardProps {
	children(props: IKeyboardContextProps): JSX.Element;
}

interface IManagedKeyboardState {
	marginBottom: number;
	keyboardIsHidden: boolean;
}

export class ManagedKeyboard extends React.Component<IManagedKeyboardProps, IManagedKeyboardState> {
	public state = {
		marginBottom: 0,
		keyboardIsHidden: true,
	};

	private onHideHandlers: Array<() => void> = [];

	private keyboardDidShowListener: any;
	private keyboardDidHideListener: any;

	public componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
	}

	public componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	public render() {
		return this.props.children({
			marginBottom: this.state.marginBottom,
			safeRunAfterKeyboardHide: this.safeRunAfterKeyboardHideHandler,
		});
	}

	private keyboardDidShow = (event: any) => {
		this.setState({
			keyboardIsHidden: false,
			marginBottom: event.endCoordinates.height,
		});
	};

	private keyboardDidHide = () => {
		this.setState({
			keyboardIsHidden: true,
			marginBottom: 0,
		});
		// todo: @serkan @jake what???
		this.onHideHandlers.forEach((handler) => {
			handler();
		});
		this.onHideHandlers = [];
	};

	private safeRunAfterKeyboardHideHandler = (handler: () => void) => {
		if (this.state.keyboardIsHidden) {
			handler(); // Keyboard is already hidden run the handler right away
		} else {
			// todo: @serkan @jake what???
			this.onHideHandlers.push(handler); // Added handler to run after keyboard hide
		}
	};
}
