import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	acceptFriend,
	addFriend,
	getCurrentProfile,
	getProfileByUsername,
	IAcceptFriendInput,
	IAddFriendInput,
	IProfileData,
	IRemoveFriendInput,
	ISearchProfilesByFullNameInput,
	ISearchProfilesInput,
	IUpdateProfileInput,
	IUsernameInput,
	removeFriend,
	searchProfilesByFullName,
	updateCurrentProfile,
} from '../../../store/data/profiles';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	profiles: IProfileData[];
}

interface IActionProps {
	getCurrentProfile: () => void;
	getProfileByUsername: (getProfileByUsernameInput: IUsernameInput) => void;
	updateCurrentProfile: (updateProfileInput: IUpdateProfileInput) => void;
	addFriend: (addFriendInput: IAddFriendInput) => void;
	removeFriend: (removeFriendInput: IRemoveFriendInput) => void;
	searchProfilesByFullName: (
		searchProfilesByFullNameInput: ISearchProfilesByFullNameInput,
	) => void;
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
	getCurrentProfile: () => dispatch(getCurrentProfile()),
	getProfileByUsername: (getProfileByUsernameInput: IUsernameInput) =>
		dispatch(getProfileByUsername(getProfileByUsernameInput)),
	addFriend: (addFriendInput: IAddFriendInput) =>
		dispatch(addFriend(addFriendInput)),
	removeFriend: (removeFriendInput: IRemoveFriendInput) =>
		dispatch(removeFriend(removeFriendInput)),
	searchProfilesByFullName: (
		searchProfilesByFullNameInput: ISearchProfilesByFullNameInput,
	) => dispatch(searchProfilesByFullName(searchProfilesByFullNameInput)),
	acceptFriend: (acceptFriendInput: IAcceptFriendInput) =>
		dispatch(acceptFriend(acceptFriendInput)),
	updateCurrentProfile: (updateProfileInput: IUpdateProfileInput) =>
		dispatch(updateCurrentProfile(updateProfileInput)),
});

export const WithProfiles: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
