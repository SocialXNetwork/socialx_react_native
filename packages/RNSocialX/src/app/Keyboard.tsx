import * as React from 'react';
import { ManagedKeyboard } from '../components';
import { KeyboardContext } from '../environment/consts';

export default class Keyboard extends React.Component<{}> {
	public render() {
		return (
			<ManagedKeyboard>
				{(keyboardContextProps) => (
					<KeyboardContext.Provider value={keyboardContextProps}>
						{this.props.children}
					</KeyboardContext.Provider>
				)}
			</ManagedKeyboard>
		);
	}
}
