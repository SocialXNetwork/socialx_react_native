import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import { IThunkDispatch } from '../../../store/types';
import { IGlobal, IState, setGlobal } from '../../../store/ui/globals';

interface IDataProps {
	globals: IState;
}

interface IActionProps {
	setGlobal: (global: IGlobal) => void;
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

const selectGlobals = createSelector(
	(state: IApplicationState) => state.ui.globals,
	(globals) => globals,
);

const mapStateToProps = (state: IApplicationState) => ({
	globals: selectGlobals(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	setGlobal: (global: IGlobal) => dispatch(setGlobal(global)),
});

export const WithGlobals: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
