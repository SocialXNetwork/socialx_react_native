import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';

import { IApplicationState } from '../../../store';
import { IThunkDispatch } from '../../../store/types';
import {
	hideMedia,
	hideOptionsMenu,
	IMediaInput,
	IOptionsMenuItem,
	showMedia,
	showOptionsMenu,
} from '../../../store/ui/overlays';

interface IDataProps {
	optionsMenuItems: IOptionsMenuItem[];
	media: IMediaInput;
}

interface IActionProps {
	showOptionsMenu: (items: IOptionsMenuItem[]) => void;
	hideOptionsMenu: () => void;
	showMedia: (input: IMediaInput) => void;
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

const selectOptionsMenuItems = createSelector(
	(state: IApplicationState) => state.ui.overlays.optionsMenu,
	(optionsMenu) => optionsMenu,
);

const selectMedia = createSelector(
	(state: IApplicationState) => state.ui.overlays.media,
	(media) => media,
);

const mapStateToProps = (state: IApplicationState) => ({
	optionsMenuItems: selectOptionsMenuItems(state),
	media: selectMedia(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	showOptionsMenu: (items: IOptionsMenuItem[]) => dispatch(showOptionsMenu(items)),
	hideOptionsMenu: () => dispatch(hideOptionsMenu()),
	showMedia: (input: IMediaInput) => dispatch(showMedia(input)),
	hideMedia: () => dispatch(hideMedia()),
});

export const WithOverlays: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
