import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	getUserPosts,
	IGetUserPostsInput,
	IPostReturnData,
} from '../../../store/aggregations/posts';
import {
	findFriendsSuggestions,
	IFindFriendsSuggestionsInput,
	IFriendData,
	IFriendSuggestionData,
	ISearchProfilesByFullNameInput,
	searchProfilesByFullName,
} from '../../../store/aggregations/profiles';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	friendsSuggestions: IFriendSuggestionData[];
	searchResults: IFriendData[];
	userPosts: {
		[owner: string]: IPostReturnData[];
	};
}

interface IActionProps {
	searchProfilesByFullName: (searchProfilesByFullNameInput: ISearchProfilesByFullNameInput) => void;
	findFriendsSuggestions: (findFriendsSuggestionsInput: IFindFriendsSuggestionsInput) => void;
	getUserPosts: (getUserPostsInput: IGetUserPostsInput) => void;
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

const selectSearchResults = createSelector(
	(state: IApplicationState) => state.aggregate.profilesAggregation.searchResults,
	(searchResults) => searchResults,
);

const selectFriendSuggestions = createSelector(
	(state: IApplicationState) => state.aggregate.profilesAggregation.friendsSuggestions,
	(friendsSuggestions) => friendsSuggestions,
);

const selectUserPosts = createSelector(
	(state: IApplicationState) => state.aggregate.postsAggregation.userPosts,
	(userPosts) => userPosts,
);

const mapStateToProps = (state: IApplicationState) => ({
	searchResults: selectSearchResults(state),
	friendsSuggestions: selectFriendSuggestions(state),
	userPosts: selectUserPosts(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	searchProfilesByFullName: (searchProfilesByFullNameInput: ISearchProfilesByFullNameInput) =>
		dispatch(searchProfilesByFullName(searchProfilesByFullNameInput)),
	findFriendsSuggestions: (findFriendsSuggestionsInput: IFindFriendsSuggestionsInput) =>
		dispatch(findFriendsSuggestions(findFriendsSuggestionsInput)),
	getUserPosts: (getUserPostsInput: IGetUserPostsInput) =>
		dispatch(getUserPosts(getUserPostsInput)),
});

export const WithAggregations: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
