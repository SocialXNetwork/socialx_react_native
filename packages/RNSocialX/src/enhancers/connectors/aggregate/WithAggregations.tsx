import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	findFriendsSuggestions,
	IFindFriendsSuggestionsInput,
	IFriendSuggestionData,
	IProfileData,
	ISearchProfilesByFullNameInput,
	searchProfilesByFullName,
} from '../../../store/aggregations/profiles';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	friendsSuggestions: IFriendSuggestionData[];
	searchResults: IProfileData[];
}

interface IActionProps {
	searchProfilesByFullName: (
		searchProfilesByFullNameInput: ISearchProfilesByFullNameInput,
	) => void;
	findFriendsSuggestions: (
		findFriendsSuggestionsInput: IFindFriendsSuggestionsInput,
	) => void;
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
	(state: IApplicationState) =>
		state.aggregate.profilesAggregation.searchResults,
	(searchResults) => searchResults,
);

const selectFriendSuggestions = createSelector(
	(state: IApplicationState) =>
		state.aggregate.profilesAggregation.friendsSuggestions,
	(friendsSuggestions) => friendsSuggestions,
);

const mapStateToProps = (state: IApplicationState) => ({
	searchResults: selectSearchResults(state),
	friendsSuggestions: selectFriendSuggestions(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	searchProfilesByFullName: (
		searchProfilesByFullNameInput: ISearchProfilesByFullNameInput,
	) => dispatch(searchProfilesByFullName(searchProfilesByFullNameInput)),
	findFriendsSuggestions: (
		findFriendsSuggestionsInput: IFindFriendsSuggestionsInput,
	) => dispatch(findFriendsSuggestions(findFriendsSuggestionsInput)),
});

export const WithAggregations: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
