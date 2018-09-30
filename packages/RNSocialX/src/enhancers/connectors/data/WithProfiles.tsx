import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	acceptFriend,
	addFriend,
	createProfile,
	getCurrentProfile,
	getProfileByUsername,
	getPublicKeyByUsername,
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IProfileData,
	IRemoveFriendInput,
	IUpdateProfileInput,
	IUsernameInput,
	removeFriend,
} from '../../../store/data/profiles';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	profiles: IProfileData[];
}

interface IActionProps {
	getPublicKeyByUsername: (getPublicKeyByUsernameInput: IUsernameInput) => void;
	getCurrentProfile: () => void;
	getProfileByUsername: (getProfileByUsernameInput: IUsernameInput) => void;
	// ! should not expose this
	// createProfile: (createProfileInput: ICreateProfileInput) => void;
	updateProfile: (updateProfileInput: IUpdateProfileInput) => void;
	addFriend: (addFriendInput: IAddFriendInput) => void;
	removeFriend: (removeFriendInput: IRemoveFriendInput) => void;
	acceptFriend: (acceptFriendInput: IAcceptFriendInput) => void;
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
	// createProfile: (createProfileInput: ICreateProfileInput) =>
	// 	dispatch(createProfile(createProfileInput)),
	addFriend: (addFriendInput: IAddFriendInput) =>
		dispatch(addFriend(addFriendInput)),
	removeFriend: (removeFriendInput: IRemoveFriendInput) =>
		dispatch(removeFriend(removeFriendInput)),
	acceptFriend: (acceptFriendInput: IAcceptFriendInput) =>
		dispatch(acceptFriend(acceptFriendInput)),
});

export const WithProfiles: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
