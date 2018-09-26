/**
 * old screen -> screens/IntroScreen/index.tsx
 */

import * as React from 'react';

import {
	IWithIntroEnhancedActions,
	IWithIntroEnhancedData,
	WithIntro,
} from '../../enhancers/screens';
import { IntroScreenView } from './IntroScreen.view';

type IIntroScreenProps = IWithIntroEnhancedData & IWithIntroEnhancedActions;

const Screen: React.SFC<IIntroScreenProps> = ({
	navigateToMainScreen,
	getText,
}) => (
	<IntroScreenView
		doneButtonHandler={navigateToMainScreen}
		skipButtonHandler={navigateToMainScreen}
		getText={getText}
	/>
);

export const IntroScreen = () => (
	<WithIntro>
		{({ data, actions }) => <Screen {...data} {...actions} />}
	</WithIntro>
);
