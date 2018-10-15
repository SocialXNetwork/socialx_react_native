/**
 * TODO list:
 * 1. Props data: topSearchResults, topSuggestions, topHasMoreResults
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

import { ActionTypes } from '../../../store/data/profiles/Types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { getActivity } from '../../helpers';

const mock: IWithSearchEnhancedProps = {
	data: {
		topSearchResults: suggestedItems,
		topSuggestions: suggestedItems,
		topSearching: false,
		topHasMoreResults: true,
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
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
	topSearchResults: ISearchResultData[];
	topSuggestions: ISearchResultData[];
	topSearching: boolean;
	topHasMoreResults: boolean;
}

export interface IWithSearchEnhancedActions
	extends ITranslatedProps,
		INavigationParamsActions {
	searchForMoreResults: () => void;
	search: (term: string, tab: SearchTabs) => void;
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
				{(navigationParamsProps) => (
					<WithI18n>
						{(i18nProps) => (
							<WithActivities>
								{({ activities }) => (
									<WithProfiles>
										{(profilesProps) =>
											this.props.children({
												data: {
													...mock.data,
													topSearching: getActivity(
														activities,
														ActionTypes.SEARCH_PROFILES_BY_FULLNAME,
													),
												},
												actions: {
													...mock.actions,
													search: (term: string, tab: SearchTabs) =>
														profilesProps.searchProfilesByFullName({
															term,
															maxResults: 10,
														}),
													getText: i18nProps.getText,
													setNavigationParams:
														navigationParamsProps.setNavigationParams,
												},
											})
										}
									</WithProfiles>
								)}
							</WithActivities>
						)}
					</WithI18n>
				)}
			</WithNavigationParams>
		);
	}
}
