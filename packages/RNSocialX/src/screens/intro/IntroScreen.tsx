/**
 * old screen -> screens/IntroScreen/index.tsx
 * TODO list:
 * 1. Props actions: navigateToMainScreen
 */

import * as React from 'react';

import {ITranslatedProps} from '../../types';
import {IntroScreenView} from './IntroScreen.view';

interface IIntroScreenProps extends ITranslatedProps {
	navigateToMainScreen: () => void;
}

export const IntroScreen: React.SFC<IIntroScreenProps> = ({navigateToMainScreen, getText}) => (
	<IntroScreenView
		doneButtonHandler={navigateToMainScreen}
		skipButtonHandler={navigateToMainScreen}
		getText={getText}
	/>
);

// @ts-ignore
IntroScreen.navigationOptions = {
	header: null,
};
