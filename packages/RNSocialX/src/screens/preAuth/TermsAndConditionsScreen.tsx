import * as React from 'react';
import { Platform } from 'react-native';

import {
	IWithTermsAndConditionsEnhancedActions,
	IWithTermsAndConditionsEnhancedData,
	WithTermsAndConditions,
} from '../../enhancers/screens';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import { OS_TYPES } from '../../environment/consts';
import { INavigationProps } from '../../types';
// @ts-ignore
import TermsAndConditionsHTML from './terms-and-conditions.html';
import { TermsAndConditionsScreenView } from './TermsAndConditionsScreen.view';

interface IProps
	extends INavigationProps,
		IWithTermsAndConditionsEnhancedActions,
		IWithTermsAndConditionsEnhancedData {
	onGoBack: () => void;
}

const Screen: React.SFC<IProps> = ({ dictionary, onGoBack }) => {
	const source =
		Platform.OS === OS_TYPES.IOS
			? TermsAndConditionsHTML
			: { uri: 'file:///android_asset/html/terms_and_conditions.html' };

	return (
		<TermsAndConditionsScreenView source={source} dictionary={dictionary} onGoBack={onGoBack} />
	);
};

export const TermsAndConditionsScreen = (props: INavigationProps) => (
	<WithNavigationHandlers>
		{(nav) => (
			<WithTermsAndConditions>
				{({ data, actions }) => (
					<Screen {...props} {...data} {...actions} onGoBack={nav.actions.onGoBack} />
				)}
			</WithTermsAndConditions>
		)}
	</WithNavigationHandlers>
);
