import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	acceptFriend,
	addFriend,
	clearFriendResponse,
	getCurrentFriends,
	getCurrentProfile,
	getProfileByAlias,
	IAcceptFriendInput,
	IAddFriendInput,
	IAliasInput,
	IFriends,
	IProfiles,
	IRejectFriendInput,
	IRemoveFriendInput,
	ISearchInput,
	IUpdateProfileInput,
	rejectFriend,
	removeFriend,
	searchForProfiles,
	undoRequest,
	updateCurrentProfile,
} from '../../../store/data/profiles';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	profiles: IProfiles;
	friends: IFriends;
	results: string[];
}

interface IActionProps {
	getCurrentProfile: () => void;
	getCurrentFriends: () => void;
	getProfileByAlias: (alias: string) => void;
	updateCurrentProfile: (input: IUpdateProfileInput) => void;
	addFriend: (addFriendInput: IAddFriendInput) => void;
	removeFriend: (removeFriendInput: IRemoveFriendInput) => void;
	acceptFriend: (acceptFriendInput: IAcceptFriendInput) => void;
	rejectFriend: (rejectFriendInput: IRejectFriendInput) => void;
	undoRequest: (input: IAliasInput) => void;
	searchForProfiles: (input: ISearchInput) => void;
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

const selectFriends = createSelector(
	(state: IApplicationState) => state.data.profiles.friends,
	(friends) => friends,
);

const selectResults = createSelector(
	(state: IApplicationState) => state.data.profiles.results,
	(results) => results,
);

const mapStateToProps = (state: IApplicationState) => ({
	profiles: selectProfiles(state),
	friends: selectFriends(state),
	results: selectResults(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	getCurrentProfile: () => dispatch(getCurrentProfile()),
	getCurrentFriends: () => dispatch(getCurrentFriends()),
	getProfileByAlias: (alias: string) => dispatch(getProfileByAlias(alias)),
	updateCurrentProfile: (input: IUpdateProfileInput) => dispatch(updateCurrentProfile(input)),
	addFriend: (input: IAddFriendInput) => dispatch(addFriend(input)),
	removeFriend: (input: IRemoveFriendInput) => dispatch(removeFriend(input)),
	acceptFriend: (input: IAcceptFriendInput) => dispatch(acceptFriend(input)),
	rejectFriend: (input: IRejectFriendInput) => dispatch(rejectFriend(input)),
	clearFriendResponse: (input: IAliasInput) => dispatch(clearFriendResponse(input)),
	undoRequest: (input: IAliasInput) => dispatch(undoRequest(input)),
	searchForProfiles: (input: ISearchInput) => dispatch(searchForProfiles(input)),
});

export const WithProfiles: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
