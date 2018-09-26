import * as React from 'react';
import { Platform } from 'react-native';

import {
	IWithTermsAndConditionsEnhancedActions,
	IWithTermsAndConditionsEnhancedData,
	WithTermsAndConditions,
} from '../../enhancers/screens';
import { OS_TYPES } from '../../environment/consts';
import { INavigationProps } from '../../types';
// @ts-ignore
import TermsAndConditionsHTML from './terms-and-conditions.html';
import { TermsAndConditionsScreenView } from './TermsAndConditionsScreen.view';

type ITermsAndConditionsScreenProps = INavigationProps &
	IWithTermsAndConditionsEnhancedActions &
	IWithTermsAndConditionsEnhancedData;

const onGoBackHandler = (navigation: any) => {
	navigation.goBack(null);
};

const Screen: React.SFC<ITermsAndConditionsScreenProps> = ({
	navigation,
	getText,
}) => {
	const webViewLocalSource =
		Platform.OS === OS_TYPES.IOS
			? TermsAndConditionsHTML
			: { uri: 'file:///android_asset/html/terms_and_conditions.html' };

	return (
		<TermsAndConditionsScreenView
			localSource={webViewLocalSource}
			onGoBack={() => onGoBackHandler(navigation)}
			getText={getText}
		/>
	);
};

export const TermsAndConditionsScreen = ({
	navigation,
	navigationOptions,
}: INavigationProps) => (
	<WithTermsAndConditions>
		{({ data, actions }) => (
			<Screen
				navigation={navigation}
				navigationOptions={navigationOptions}
				{...data}
				{...actions}
			/>
		)}
	</WithTermsAndConditions>
);
