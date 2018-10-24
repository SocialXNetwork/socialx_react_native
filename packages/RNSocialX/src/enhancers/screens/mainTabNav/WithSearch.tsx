/**
 * TODO list:
 * 1. Props data: results, topSuggestions, hasMoreResults
 * 2. Props actions: searchForMoreResults
 * 3. LATER - add more enhancers to support other tabs: People, Tags, Places
 * 4. Talk with Jake to simplify this
 */

import * as React from 'react';

import { suggestedItems } from '../../../mocks';
import {
	INavigationParamsActions,
	ISearchResultData,
	ITranslatedProps,
	SearchTabs,
} from '../../../types';

import { ActionTypes } from '../../../store/aggregations/profiles/Types';
import { WithAggregations } from '../../connectors/aggregations/WithAggregations';
import { WithConfig } from '../../connectors/app/WithConfig';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { getActivity } from '../../helpers';

const mock: IWithSearchEnhancedProps = {
	data: {
		results: suggestedItems,
		suggestions: suggestedItems,
		searching: false,
		hasMoreResults: true,
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
		findFriendsSuggestions: () => {
			/**/
		},
		search: (term: string, tab: SearchTabs) => {
			/**/
		},
		searchForMoreResults: () => {
			/**/
		},
		setNavigationParams: () => {
			/**/
		},
	},
};

export interface IWithSearchEnhancedData {
	results: ISearchResultData[];
	suggestions: ISearchResultData[];
	searching: boolean;
	hasMoreResults: boolean;
}

export interface IWithSearchEnhancedActions
	extends ITranslatedProps,
		INavigationParamsActions {
	searchForMoreResults: () => void;
	search: (term: string, tab: SearchTabs) => void;
	findFriendsSuggestions: () => void;
}

interface IWithSearchEnhancedProps {
	data: IWithSearchEnhancedData;
	actions: IWithSearchEnhancedActions;
}

interface IWithSearchProps {
	children(props: IWithSearchEnhancedProps): JSX.Element;
}

interface IWithSearchState {}

export class WithSearch extends React.Component<
	IWithSearchProps,
	IWithSearchState
> {
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
												{({
													searchResults,
													friendsSuggestions,
													searchProfilesByFullName,
													findFriendsSuggestions,
												}) => {
													return this.props.children({
														data: {
															...mock.data,
															// @Alexandre @Alex, this should be determined by the offset/length ratio
															hasMoreResults: false,
															searching: getActivity(
																activities,
																ActionTypes.SEARCH_PROFILES_BY_FULLNAME,
															),
															results: searchResults.map((profile) => ({
																userId: profile.alias,
																fullName: profile.fullName,
																userName: profile.alias,
																location: '',
																avatarURL:
																	profile.avatar.length > 0
																		? appConfig.ipfsConfig.ipfs_URL +
																		  profile.avatar  // tslint:disable-line
																		: '',
															})),
															suggestions: friendsSuggestions.map(
																(profile) => ({
																	userId: profile.alias,
																	fullName: profile.fullName,
																	userName: profile.alias,
																	location: '',
																	avatarURL:
																		profile.avatar.length > 0
																			? appConfig.ipfsConfig.ipfs_URL +
																			  profile.avatar // tslint:disable-line
																			: '',
																}),
															),
														},
														actions: {
															...mock.actions,
															search: async (term: string, tab: SearchTabs) => {
																await searchProfilesByFullName({
																	term,
																	maxResults: 10,
																});
															},
															findFriendsSuggestions: async () => {
																await findFriendsSuggestions({
																	maxResults: 10,
																});
															},
															getText,
															setNavigationParams,
														},
													});
												}}
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
