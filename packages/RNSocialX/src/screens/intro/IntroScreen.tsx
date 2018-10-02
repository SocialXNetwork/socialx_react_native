/**
 * old screen -> screens/IntroScreen/index.tsx
 */

import * as React from 'react';

import {
	IWithIntroEnhancedActions,
	IWithIntroEnhancedData,
	WithIntro,
} from '../../enhancers/screens';
import { INavigationProps } from '../../types';
import { IntroScreenView } from './IntroScreen.view';

type IIntroScreenProps = IWithIntroEnhancedData &
	IWithIntroEnhancedActions &
	INavigationProps;

const Screen: React.SFC<IIntroScreenProps> = ({
	resetNavigationToRoute,
	navigation,
	getText,
}) => (
	<IntroScreenView
		doneButtonHandler={() => resetNavigationToRoute('MainScreen', navigation)}
		skipButtonHandler={() => resetNavigationToRoute('MainScreen', navigation)}
		getText={getText}
	/>
);

export const IntroScreen = ({ navigation }: INavigationProps) => (
	<WithIntro>
		{({ data, actions }) => (
			<Screen navigation={navigation} {...data} {...actions} />
		)}
	</WithIntro>
);
