import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import { IThunkDispatch } from '../../../store/types';
import {
	beginActivity,
	endActivity,
	IActivity,
} from '../../../store/ui/activities';

interface IDataProps {
	activities: IActivity[];
}

interface IActionProps {
	beginActivity: (activity: IActivity) => void;
	endActivity: ({ uuid }: { uuid: string }) => void;
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
	(state: IApplicationState) => state.ui.activities,
	(activities) => activities,
);

const mapStateToProps = (state: IApplicationState) => ({
	activities: selectActivities(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	beginActivity: (activity: IActivity) => dispatch(beginActivity(activity)),
	endActivity: ({ uuid }: { uuid: string }) => dispatch(endActivity({ uuid })),
});

export const WithActivities: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
