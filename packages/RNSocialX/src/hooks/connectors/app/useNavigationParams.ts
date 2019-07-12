import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	clearNavigationParams,
	ISetNavigationParamsInput,
	IState,
	setNavigationParams,
} from '../../../store/app/navigationParams';

const selectNavigationParams = createSelector(
	(state: IApplicationState) => state.app.navigationParams,
	(navigationParams) => navigationParams,
);

export const useNavigationParamsData = () => ({
	navigationParams: useSelector(selectNavigationParams),
});

export const mapDispatchToProps = () => {
	const dispatch = useDispatch();

	return {
		setNavigationParams: (input: ISetNavigationParamsInput) => dispatch(setNavigationParams(input)),
		clearNavigationParams: ({ screenName }: { screenName: string }) =>
			dispatch(clearNavigationParams({ screenName })),
	};
};
