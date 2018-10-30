import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	IApplicationConfig,
	ISetAppConfigInput,
	ISetCustomGunSuperPeersInput,
	setAppConfig,
	setCustomGunSuperPeers,
} from '../../../store/app/config';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	appConfig: IApplicationConfig;
	customGunSuperPeers: string[];
}

interface IActionProps {
	setAppConfig: (setAppConfigInput: ISetAppConfigInput) => void;
	setCustomGunSuperPeers: (setCustomGunSuperPeersInput: ISetCustomGunSuperPeersInput) => void;
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

const selectAppConfig = createSelector(
	(state: IApplicationState) => state.app.config.appConfig,
	(appConfig) => appConfig,
);

const selectCustomGunSuperPeers = createSelector(
	(state: IApplicationState) => state.app.config.customGunSuperPeers,
	(customGunSuperPeers) => customGunSuperPeers,
);

const mapStateToProps = (state: IApplicationState) => ({
	appConfig: selectAppConfig(state),
	customGunSuperPeers: selectCustomGunSuperPeers(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	setAppConfig: (setAppConfigInput: ISetAppConfigInput) =>
		dispatch(setAppConfig(setAppConfigInput)),
	setCustomGunSuperPeers: (setCustomGunSuperPeersInput: ISetCustomGunSuperPeersInput) =>
		dispatch(setCustomGunSuperPeers(setCustomGunSuperPeersInput)),
});

export const WithConfig: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
