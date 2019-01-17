import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	clearNavigationParams,
	ISetNavigationParamsInput,
	IState,
	setNavigationParams,
} from '../../../store/app/navigationParams';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	navigationParams: IState;
}

interface IActionProps {
	setNavigationParams: (input: ISetNavigationParamsInput) => void;
	clearNavigationParams: ({ screenName }: { screenName: string }) => void;
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

const selectNavigationParams = createSelector(
	(state: IApplicationState) => state.app.navigationParams,
	(navigationParams) => navigationParams,
);

const mapStateToProps = (state: IApplicationState) => ({
	navigationParams: selectNavigationParams(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	setNavigationParams: (input: ISetNavigationParamsInput) => dispatch(setNavigationParams(input)),
	clearNavigationParams: ({ screenName }: { screenName: string }) =>
		dispatch(clearNavigationParams({ screenName })),
});

export const WithNavigationParams: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
