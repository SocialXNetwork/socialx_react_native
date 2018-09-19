import * as React from 'react';
import {Platform, View} from 'react-native';

import {
	IWithTermsAndConditionsEnhancedActions,
	IWithTermsAndConditionsEnhancedData,
	WithTermsAndConditions,
} from '../../enhancers/screens';
import {OS_TYPES} from '../../environment/consts';
import {INavigationProps} from '../../types';
// @ts-ignore
import TermsAndConditionsHTML from './terms-and-conditions.html';
import {TermsAndConditionsScreenView} from './TermsAndConditionsScreen.view';

type ITermsAndConditionsScreenProps = INavigationProps &
	IWithTermsAndConditionsEnhancedActions &
	IWithTermsAndConditionsEnhancedData;

const Screen: React.SFC<ITermsAndConditionsScreenProps> = () => {
	const webViewLocalSource =
		Platform.OS === OS_TYPES.IOS
			? TermsAndConditionsHTML
			: {uri: 'file:///android_asset/html/terms_and_conditions.html'};

	return <TermsAndConditionsScreenView localSource={webViewLocalSource} />;
};

export const TermsAndConditionsScreen = ({navigation, navigationOptions}: INavigationProps) => (
	<WithTermsAndConditions>
		{({data, actions}) => (
			<Screen navigation={navigation} navigationOptions={navigationOptions} {...data} {...actions} />
		)}
	</WithTermsAndConditions>
);

// @ts-ignore
TermsAndConditionsScreen.navigationOptions = ({options}: INavigationProps) => ({
	title: options.getText('terms.and.conditions.screen.title'),
	headerRight: <View />,
});
