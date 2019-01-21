import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';

import { IApplicationState } from '../../../store';
import { getMessages, IMessages } from '../../../store/data/messages';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	messages: IMessages;
}

interface IActionProps {
	getMessages: () => void;
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

const selectMessages = createSelector(
	(state: IApplicationState) => state.data.messages.messages,
	(messages) => messages,
);

const mapStateToProps = (state: IApplicationState) => ({
	messages: selectMessages(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	getNotifications: () => dispatch(getMessages()),
});

export const WithMessages: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
