/**
 * TODO list:
 * 1. LATER - @Jake, @Serkan, decide what will be used for login: userName, email, phonenumber?
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { IError, IGlobal, ITranslatedProps } from '../../../types';

import { ActionTypes as AcountActionTypes } from '../../../store/data/accounts/Types';
import { ActionTypes as PostActionTypes } from '../../../store/data/posts/Types';
import { ActionTypes as ProfileActionTypes } from '../../../store/data/profiles/Types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { getActivity, resetNavigationToRoute } from '../../helpers/';

const mock: IWithLoginEnhancedProps = {
	data: {
		errors: [],
		loadingAccount: false,
		loadingProfile: false,
		loadingPosts: false,
	},
	actions: {
		login: (userName: string, password: string) => {
			/**/
		},
		getPosts: () => {
			/* */
		},
		setGlobal: (global: IGlobal) => {
			/**/
		},
		resetNavigationToRoute: (
			screenName: string,
			navigation: NavigationScreenProp<any>,
		) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithLoginEnhancedData {
	loadingAccount: boolean;
	loadingProfile: boolean;
	loadingPosts: boolean;
	errors: IError[];
}

export interface IWithLoginEnhancedActions extends ITranslatedProps {
	login: (userName: string, password: string) => void;
	getPosts: () => void;
	setGlobal: (global: IGlobal) => void;
	resetNavigationToRoute: (
		screenName: string,
		navigation: NavigationScreenProp<any>,
	) => void;
}

interface IWithLoginEnhancedProps {
	data: IWithLoginEnhancedData;
	actions: IWithLoginEnhancedActions;
}

interface IWithLoginProps {
	children(props: IWithLoginEnhancedProps): JSX.Element;
}

interface IWithLoginState {}

export class WithLogin extends React.Component<
	IWithLoginProps,
	IWithLoginState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithGlobals>
						{({ setGlobal }) => (
							<WithActivities>
								{({ activities, errors }) => (
									<WithPosts>
										{(postProps) => (
											<WithAccounts>
												{(accountsProps) =>
													this.props.children({
														data: {
															...mock.data,
															errors,
															loadingAccount: getActivity(
																activities,
																AcountActionTypes.GET_CURRENT_ACCOUNT,
															),
															loadingProfile: getActivity(
																activities,
																ProfileActionTypes.GET_CURRENT_PROFILE,
															),
															loadingPosts: getActivity(
																activities,
																PostActionTypes.GET_PUBLIC_POSTS_BY_DATE,
															),
														},
														actions: {
															login: (username: string, password: string) =>
																accountsProps.login({
																	username,
																	password,
																}),
															getPosts: () =>
																postProps.getPublicPostsByDate({
																	date: new Date(Date.now()),
																}),
															setGlobal,
															resetNavigationToRoute,
															getText: i18nProps.getText,
														},
													})
												}
											</WithAccounts>
										)}
									</WithPosts>
								)}
							</WithActivities>
						)}
					</WithGlobals>
				)}
			</WithI18n>
		);
	}
}
