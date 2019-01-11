/**
 * old screen -> screens/IntroScreen/index.tsx
 */

import * as React from 'react';

import { NAVIGATION } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { IntroScreenView } from './IntroScreen.view';

import {
	IWithIntroEnhancedActions,
	IWithIntroEnhancedData,
	WithIntro,
} from '../../enhancers/screens';

type IIntroScreenProps = IWithIntroEnhancedData & IWithIntroEnhancedActions & INavigationProps;

const Screen: React.SFC<IIntroScreenProps> = ({ resetNavigationToRoute, navigation, getText }) => (
	<IntroScreenView
		doneButtonHandler={() => resetNavigationToRoute(NAVIGATION.Home, navigation)}
		skipButtonHandler={() => resetNavigationToRoute(NAVIGATION.Home, navigation)}
		getText={getText}
	/>
);

export const IntroScreen = ({ navigation }: INavigationProps) => (
	<WithIntro>
		{({ data, actions }) => <Screen navigation={navigation} {...data} {...actions} />}
	</WithIntro>
);
