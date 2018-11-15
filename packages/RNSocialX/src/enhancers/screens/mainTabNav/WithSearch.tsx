/**
 * TODO list:
 * 1. Props data: results, topSuggestions, hasMoreResults
 * 2. Props actions: searchForMoreResults
 * 3. LATER - add more enhancers to support other tabs: People, Tags, Places
 * 4. Talk with Jake to simplify this
 */

import * as React from 'react';

import { INavigationParamsActions, ITranslatedProps, IUserEntry, SearchTabs } from '../../../types';

import { IPostReturnData } from '../../../store/aggregations/posts';
import { ActionTypes } from '../../../store/aggregations/profiles/Types';
import { WithAggregations } from '../../connectors/aggregations/WithAggregations';
import { WithConfig } from '../../connectors/app/WithConfig';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { getActivity } from '../../helpers';

export interface IWithSearchEnhancedData {
	results: IUserEntry[];
	suggestions: IUserEntry[];
	searching: boolean;
	hasMoreResults: boolean;
	userPosts: { [owner: string]: IPostReturnData[] };
}

export interface IWithSearchEnhancedActions extends ITranslatedProps, INavigationParamsActions {
	search: (term: string, tab: SearchTabs) => void;
	searchForMoreResults: () => void;
	findFriendsSuggestions: () => void;
	getPostsForUser: (userName: string) => void;
}

interface IWithSearchEnhancedProps {
	data: IWithSearchEnhancedData;
	actions: IWithSearchEnhancedActions;
}

interface IWithSearchProps {
	children(props: IWithSearchEnhancedProps): JSX.Element;
}

interface IWithSearchState {}

export class WithSearch extends React.Component<IWithSearchProps, IWithSearchState> {
	render() {
		return (
			<WithNavigationParams>
				{({ setNavigationParams }) => (
					<WithConfig>
						{({ appConfig }) => (
							<WithI18n>
								{({ getText }) => (
									<WithActivities>
										{({ activities }) => (
											<WithAggregations>
												{(aggregations) =>
													this.props.children({
														data: {
															hasMoreResults: false,
															searching: getActivity(
																activities,
																ActionTypes.SEARCH_PROFILES_BY_FULLNAME,
															),
															results: aggregations.searchResults.map((profile) => ({
																userId: profile.alias,
																fullName: profile.fullName,
																userName: profile.alias,
																location: '',
																avatar:
																	profile.avatar.length > 0
																			? appConfig.ipfsConfig.ipfs_URL +
																		  profile.avatar  // tslint:disable-line
																		: '',
																relationship: profile.status,
															})),
															suggestions: aggregations.friendsSuggestions.map((profile) => ({
																userId: profile.alias,
																fullName: profile.fullName,
																userName: profile.alias,
																location: '',
																avatar:
																	profile.avatar.length > 0
																			? appConfig.ipfsConfig.ipfs_URL +
																			  profile.avatar // tslint:disable-line
																		: '',
																relationship: profile.status,
															})),
															userPosts: aggregations.userPosts,
														},
														actions: {
															search: async (term: string, tab: SearchTabs) => {
																await aggregations.searchProfilesByFullName({
																	term,
																	maxResults: 10,
																});
															},
															findFriendsSuggestions: async () => {
																await aggregations.findFriendsSuggestions({
																	maxResults: 10,
																});
															},
															getPostsForUser: async (username: string) => {
																await aggregations.getUserPosts({ username });
															},
															searchForMoreResults: () => undefined,
															setNavigationParams,
															getText,
														},
													})
												}
											</WithAggregations>
										)}
									</WithActivities>
								)}
							</WithI18n>
						)}
					</WithConfig>
				)}
			</WithNavigationParams>
		);
	}
}
