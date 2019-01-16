import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	acceptFriend,
	addFriend,
	clearFriendResponse,
	clearSearchResults,
	getCurrentFriends,
	getCurrentProfile,
	getProfileByAlias,
	getProfileFriendsByAlias,
	IAliasInput,
	IFriends,
	IProfiles,
	ISearchInput,
	IUpdateProfileInput,
	rejectFriend,
	removeFriend,
	searchForProfiles,
	searchForProfilesLocally,
	undoRequest,
	updateCurrentProfile,
} from '../../../store/data/profiles';
import { ISearchWithAliasInput } from '../../../store/data/profiles/Types';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	profiles: IProfiles;
	friends: IFriends;
	search: {
		results: string[];
		previousTerms: {
			[term: string]: boolean;
		};
	};
}

interface IActionProps {
	getCurrentProfile: () => void;
	getCurrentFriends: () => void;
	getProfileByAlias: (alias: string) => void;
	getProfileFriendsByAlias: (alias: string) => void;
	updateCurrentProfile: (input: IUpdateProfileInput) => void;
	addFriend: (input: IAliasInput) => void;
	removeFriend: (input: IAliasInput) => void;
	acceptFriend: (input: IAliasInput) => void;
	rejectFriend: (input: IAliasInput) => void;
	undoRequest: (input: IAliasInput) => void;
	searchForProfiles: (input: ISearchInput) => void;
	searchForProfilesLocally: (input: ISearchWithAliasInput) => void;
	clearSearchResults: () => void;
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

const selectSearch = createSelector(
	(state: IApplicationState) => state.data.profiles.search,
	(search) => search,
);

const mapStateToProps = (state: IApplicationState) => ({
	profiles: selectProfiles(state),
	friends: selectFriends(state),
	search: selectSearch(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	getCurrentProfile: () => dispatch(getCurrentProfile()),
	getCurrentFriends: () => dispatch(getCurrentFriends()),
	getProfileByAlias: (alias: string) => dispatch(getProfileByAlias(alias)),
	getProfileFriendsByAlias: (alias: string) => dispatch(getProfileFriendsByAlias(alias)),
	updateCurrentProfile: (input: IUpdateProfileInput) => dispatch(updateCurrentProfile(input)),
	addFriend: (input: IAliasInput) => dispatch(addFriend(input)),
	removeFriend: (input: IAliasInput) => dispatch(removeFriend(input)),
	acceptFriend: (input: IAliasInput) => dispatch(acceptFriend(input)),
	rejectFriend: (input: IAliasInput) => dispatch(rejectFriend(input)),
	clearFriendResponse: (input: IAliasInput) => dispatch(clearFriendResponse(input)),
	undoRequest: (input: IAliasInput) => dispatch(undoRequest(input)),
	searchForProfiles: (input: ISearchInput) => dispatch(searchForProfiles(input)),
	searchForProfilesLocally: (input: ISearchWithAliasInput) =>
		dispatch(searchForProfilesLocally(input)),
	clearSearchResults: () => dispatch(clearSearchResults()),
});

export const WithProfiles: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
