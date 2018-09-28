import { ICreateProfileInput } from '@socialx/api-data';
import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	createProfile,
	getCurrentProfile,
	getProfileByUsername,
	getPublicKeyByUsername,
	IProfile,
	IUsernameInput,
} from '../../../store/data/profiles';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	profiles: IProfile[];
}

interface IActionProps {
	getPublicKeyByUsername: (getPublicKeyByUsernameInput: IUsernameInput) => void;
	getCurrentProfile: () => void;
	getProfileByUsername: (getProfileByUsernameInput: IUsernameInput) => void;
	createProfile: (createProfileInput: ICreateProfileInput) => void;
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

const selectProfiles = createSelector(
	(state: IApplicationState) => state.data.profiles.profiles,
	(profiles) => profiles,
);

const mapStateToProps = (state: IApplicationState) => ({
	profiles: selectProfiles(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	getPublicKeyByUsername: (getPublicKeyByUsernameInput: IUsernameInput) =>
		dispatch(getPublicKeyByUsername(getPublicKeyByUsernameInput)),
	getCurrentProfile: () => dispatch(getCurrentProfile()),
	getProfileByUsername: (getProfileByUsernameInput: IUsernameInput) =>
		dispatch(getProfileByUsername(getProfileByUsernameInput)),
	createProfile: (createProfileInput: ICreateProfileInput) =>
		dispatch(createProfile(createProfileInput)),
});

export const WithProfiles: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
