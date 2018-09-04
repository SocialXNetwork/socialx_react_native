import * as React from 'react';
import {Platform} from 'react-native';

import {OS_TYPES} from '../../environment/consts';
import {ModalManager} from './ModalManager';

export interface IManagedModal {
	onDismiss: () => void;
	onModalHide: () => void;
}

interface IWithManagedTransitionsProps {
	modalVisible: boolean;
	afterDismiss?: () => void;

	children(props: IManagedModal): JSX.Element;
}

export class WithManagedTransitions extends React.Component<IWithManagedTransitionsProps> {
	public componentDidUpdate(prevProps: Readonly<IWithManagedTransitionsProps>): void {
		if (!prevProps.modalVisible && this.props.modalVisible) {
			ModalManager.toggleModalShow(true); // TODO: re-check this pattern later!
		}
	}

	public render() {
		return this.props.children({
			onDismiss: this.onDismiss,
			onModalHide: this.onModalHide,
		});
	}

	private onDismiss = () => {
		if (Platform.OS === OS_TYPES.IOS) {
			this.runAfterDismiss();
		}
	};

	private onModalHide = () => {
		if (Platform.OS === OS_TYPES.Android) {
			this.runAfterDismiss();
		}
	};

	private runAfterDismiss = () => {
		ModalManager.toggleModalShow(false); // TODO: re-check this pattern later!
		if (this.props.afterDismiss) {
			this.props.afterDismiss();
		}
	};
}
