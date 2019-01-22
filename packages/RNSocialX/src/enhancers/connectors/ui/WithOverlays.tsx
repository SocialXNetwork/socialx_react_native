import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';

import { IApplicationState } from '../../../store';
import { IThunkDispatch } from '../../../store/types';
import {
	hideMedia,
	hideModal,
	hideOptionsMenu,
	IMediaOverlay,
	IModalOverlay,
	showMedia,
	showModal,
	showOptionsMenu,
} from '../../../store/ui/overlays';
import { IOptionsMenuItem } from '../../../types';

interface IDataProps {
	modal: IModalOverlay;
	optionsMenuItems: IOptionsMenuItem[];
	media: IMediaOverlay;
}

interface IActionProps {
	showModal: (input: IModalOverlay) => void;
	hideModal: () => void;
	showOptionsMenu: (items: IOptionsMenuItem[]) => void;
	hideOptionsMenu: () => void;
	showMedia: (input: IMediaOverlay) => void;
	hideMedia: () => void;
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

const selectModal = createSelector(
	(state: IApplicationState) => state.ui.overlays.modal,
	(modal) => modal,
);

const selectOptionsMenuItems = createSelector(
	(state: IApplicationState) => state.ui.overlays.optionsMenu,
	(optionsMenu) => optionsMenu,
);

const selectMedia = createSelector(
	(state: IApplicationState) => state.ui.overlays.media,
	(media) => media,
);

const mapStateToProps = (state: IApplicationState) => ({
	modal: selectModal(state),
	optionsMenuItems: selectOptionsMenuItems(state),
	media: selectMedia(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	showModal: (input: IModalOverlay) => dispatch(showModal(input)),
	hideModal: () => dispatch(hideModal()),
	showOptionsMenu: (items: IOptionsMenuItem[]) => dispatch(showOptionsMenu(items)),
	hideOptionsMenu: () => dispatch(hideOptionsMenu()),
	showMedia: (input: IMediaOverlay) => dispatch(showMedia(input)),
	hideMedia: () => dispatch(hideMedia()),
});

export const WithOverlays: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
