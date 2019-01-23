import { sampleSize } from 'lodash';
import * as React from 'react';

import { IDictionary } from '../../../types';

import { ActionTypes } from '../../../store/data/profiles/Types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { getActivity } from '../../helpers';
import { WithCurrentUser } from '../../intermediary';

export interface IWithSearchEnhancedData extends IDictionary {
	results: string[];
	previousTerms: {
		[term: string]: boolean;
	};
	suggestions: string[];
	searching: boolean;
}

export interface IWithSearchEnhancedActions {
	search: (term: string, limit: number) => void;
	searchLocally: (term: string) => void;
	clearSearchResults: () => void;
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
			<WithI18n>
				{({ dictionary }) => (
					<WithActivities>
						{({ activities }) => (
							<WithProfiles>
								{({
									profiles,
									search,
									searchForProfiles,
									searchForProfilesLocally,
									clearSearchResults,
								}) => (
									<WithCurrentUser>
										{({ currentUser }) => {
											const aliases = Object.keys(profiles).filter(
												(key) => key !== currentUser.alias,
											);
											const { results, previousTerms } = search;

											return this.props.children({
												data: {
													searching: getActivity(activities, ActionTypes.SEARCH_FOR_PROFILES),
													results,
													previousTerms,
													suggestions: sampleSize(aliases, 5),
													dictionary,
												},
												actions: {
													search: (term, limit) =>
														searchForProfiles({
															term,
															limit,
														}),
													searchLocally: (term) =>
														searchForProfilesLocally({ term, alias: currentUser.alias }),
													clearSearchResults,
												},
											});
										}}
									</WithCurrentUser>
								)}
							</WithProfiles>
						)}
					</WithActivities>
				)}
			</WithI18n>
		);
	}
}
