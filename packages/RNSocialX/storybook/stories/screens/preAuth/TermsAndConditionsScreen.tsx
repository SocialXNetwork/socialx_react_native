import {storiesOf} from '@storybook/react-native';
import * as React from 'react';
import {Platform} from 'react-native';

import {OS_TYPES} from '../../../../src/environment/consts';

// @ts-ignore
import TermsAndConditionsHTML from '../../../../src/screens/preAuth/terms-and-conditions.html';
import {TermsAndConditionsScreenView} from '../../../../src/screens/preAuth/TermsAndConditionsScreen.view';

storiesOf('Screens/preAuth', module).add('TermsAndConditionsScreen', () => {
	const localSource =
		Platform.OS === OS_TYPES.IOS
			? TermsAndConditionsHTML
			: {uri: 'file:///android_asset/html/terms_and_conditions.html'};

	return <TermsAndConditionsScreenView localSource={localSource} />;
});
