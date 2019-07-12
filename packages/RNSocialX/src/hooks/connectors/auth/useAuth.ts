import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import { IAuthData } from '../../../store/auth/gun';

const selectAuth = createSelector(
	(state: IApplicationState) => state.auth.database.gun,
	(gun) => gun,
);

export const useAuthData = () => ({
	auth: useSelector(selectAuth),
});

export const useAuthActions = () => ({});
