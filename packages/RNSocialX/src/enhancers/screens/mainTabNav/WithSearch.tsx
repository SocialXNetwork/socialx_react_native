/**
 * TODO list:
 * 1. Props data: topSearchResults, topSuggestions, topSearching, topHasMoreResults
 * 2. Props actions: search, searchForMoreResults, addFriend
 * 3. LATER - add more enhancers to support other tabs: People, Tags, Places
 */

import * as React from 'react';

import { suggestedItems } from '../../../mocks';
import {
	INavigationParamsActions,
	ISearchResultData,
	ITranslatedProps,
	SearchTabs,
} from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';

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
		addFriend: (userId: string) => {
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
	addFriend: (userId: string) => void;
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
						{(i18nProps) =>
							this.props.children({
								data: mock.data,
								actions: {
									...mock.actions,
									getText: i18nProps.getText,
									setNavigationParams:
										navigationParamsProps.setNavigationParams,
								},
							})
						}
					</WithI18n>
				)}
			</WithNavigationParams>
		);
	}
}
