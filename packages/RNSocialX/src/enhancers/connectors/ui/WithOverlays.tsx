import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import { IThunkDispatch } from '../../../store/types';
import {
	hideConfirmation,
	hideMessage,
	hideModal,
	IConfirmation,
	IMessage,
	IModal,
	showConfirmation,
	showMessage,
	showModal,
} from '../../../store/ui/overlays';
import {
	hideOptionsMenu,
	showOptionsMenu,
} from '../../../store/ui/overlays/actions';
import { IOptionsMenu } from '../../../store/ui/overlays/Types';

interface IDataProps {
	message: IMessage | null;
	modal: IModal | null;
	confirmation: IConfirmation | null;
	optionsMenu: IOptionsMenu | null;
}

interface IActionProps {
	showMessage: (message: IMessage) => void;
	hideMessage: () => void;
	showModal: (modal: IModal) => void;
	hideModal: () => void;
	showConfirmation: (confirmation: IConfirmation) => void;
	hideConfirmation: () => void;
	showOptionsMenu: (optionsMenu: IOptionsMenu) => void;
	hideOptionsMenu: () => void;
}

type IProps = IDataProps & IActionProps;

interface IChildren {
	children: (props: IProps) => JSX.Element;
}

class Enhancer extends React.Component<IProps & IChildren> {
	render() {
		const { children, ...props } = this.props;
		return children(props);
	}
}

const selectMessage = createSelector(
	(state: IApplicationState) => state.ui.overlays.message,
	(message) => message,
);

const selectModal = createSelector(
	(state: IApplicationState) => state.ui.overlays.modal,
	(modal) => modal,
);

const selectConfirmation = createSelector(
	(state: IApplicationState) => state.ui.overlays.confirmation,
	(confirmation) => confirmation,
);

const selectOptionsMenu = createSelector(
	(state: IApplicationState) => state.ui.overlays.optionsMenu,
	(optionsMenu) => optionsMenu,
);

const mapStateToProps = (state: IApplicationState) => ({
	message: selectMessage(state),
	modal: selectModal(state),
	confirmation: selectConfirmation(state),
	optionsMenu: selectOptionsMenu(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	showMessage: (message: IMessage) => dispatch(showMessage(message)),
	hideMessage: () => dispatch(hideMessage()),
	showModal: (modal: IModal) => dispatch(showModal(modal)),
	hideModal: () => dispatch(hideModal()),
	showConfirmation: (confirmation: IConfirmation) =>
		dispatch(
			showConfirmation({
				...confirmation,
				// Todo: this is a hack because when we make a property optional here,
				// typescript says it is not compatible with the deepreadonly version
				// if we cannot solve it, we can maybe remove deepreadonly
				// or make sure we always pass the default values to this action
				confirmButtonLabel: confirmation.confirmButtonLabel || 'OK',
				cancelButtonLabel: confirmation.cancelButtonLabel || 'CANCEL',
			}),
		),
	hideConfirmation: () => dispatch(hideConfirmation()),
	showOptionsMenu: (optionsMenu: IOptionsMenu) =>
		dispatch(showOptionsMenu(optionsMenu)),
	hideOptionsMenu: () => dispatch(hideOptionsMenu()),
});

export const WithOverlays: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
