import { sampleSize } from 'lodash';
import * as React from 'react';

import { ITranslatedProps, SearchTabs } from '../../../types';

import { ActionTypes } from '../../../store/data/profiles/Types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { getActivity } from '../../helpers';
import { WithCurrentUser } from '../../intermediary';

export interface IWithSearchEnhancedData {
	results: string[];
	suggestions: string[];
	searching: boolean;
	hasMoreResults: boolean;
}

export interface IWithSearchEnhancedActions extends ITranslatedProps {
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

export class WithSearch extends React.Component<IWithSearchProps, IWithSearchState> {
	render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithActivities>
						{({ activities }) => (
							<WithProfiles>
								{({ profiles, results, searchForProfiles }) => (
									<WithCurrentUser>
										{({ currentUser }) => {
											const aliases = Object.keys(profiles).filter(
												(key) => key !== currentUser.userName,
											);

											return this.props.children({
												data: {
													hasMoreResults: false,
													searching: getActivity(activities, ActionTypes.SEARCH_FOR_PROFILES),
													results,
													suggestions: sampleSize(aliases, 5),
												},
												actions: {
													search: async (term: string) => {
														await searchForProfiles({
															term,
															limit: 10,
														});
													},
													getText,
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
