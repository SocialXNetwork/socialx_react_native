import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import { IGlobal, IState, setGlobal } from '../../../store/ui/globals';

const selectGlobals = createSelector(
	(state: IApplicationState) => state.ui.globals,
	(globals) => globals,
);

export const useGlobalsData = () => ({
	globals: useSelector(selectGlobals),
});

export const useGlobalsActions = () => {
	const dispatch = useDispatch();

	return {
		setGlobal: (global: IGlobal) => dispatch(setGlobal(global)),
	};
};
