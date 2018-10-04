import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import { IThunkDispatch } from '../../../store/types';
import {
	beginActivity,
	clearError,
	endActivity,
	IActivity,
	IError,
	setError,
} from '../../../store/ui/activities';

interface IDataProps {
	activities: IActivity[];
	errors: IError[];
}

// TODO: do we want to expose these? should these maybe stay within redux code
// and be dispatched across other redux thunk actions?
interface IActionProps {
	beginActivity: (activity: IActivity) => void;
	endActivity: ({ uuid }: { uuid: string }) => void;
	setError: (error: IError) => void;
	clearError: ({ uuid }: { uuid: string }) => void;
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

const selectActivities = createSelector(
	(state: IApplicationState) => state.ui.activities.activities,
	(activities) => activities,
);

const selectErrors = createSelector(
	(state: IApplicationState) => state.ui.activities.errors,
	(errors) => errors,
);

const mapStateToProps = (state: IApplicationState) => ({
	activities: selectActivities(state),
	errors: selectErrors(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	beginActivity: (activity: IActivity) => dispatch(beginActivity(activity)),
	endActivity: ({ uuid }: { uuid: string }) => dispatch(endActivity({ uuid })),
	setError: (error: IError) => dispatch(setError(error)),
	clearError: ({ uuid }: { uuid: string }) => dispatch(clearError({ uuid })),
});

export const WithActivities: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
