import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { IApplicationState } from '../../../store';
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

export const useOverlaysData = () => ({
	modal: useSelector(selectModal),
	optionsMenuItems: useSelector(selectOptionsMenuItems),
	media: useSelector(selectMedia),
});

export const useOverlaysActions = () => {
	const dispatch = useDispatch();

	return {
		showModal: (input: IModalOverlay) => dispatch(showModal(input)),
		hideModal: () => dispatch(hideModal()),
		showOptionsMenu: (items: IOptionsMenuItem[]) => dispatch(showOptionsMenu(items)),
		hideOptionsMenu: () => dispatch(hideOptionsMenu()),
		showMedia: (input: IMediaOverlay) => dispatch(showMedia(input)),
		hideMedia: () => dispatch(hideMedia()),
	};
};
