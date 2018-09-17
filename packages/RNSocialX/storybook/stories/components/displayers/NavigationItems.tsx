import {storiesOf} from '@storybook/react-native';
import * as React from 'react';
import {Alert} from 'react-native';

import {NavigationItems} from '../../../../src/components/';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('NavigationItems', () => (
		<NavigationItems
			notifications={new Array(5)}
			selectedTab={'UserFeedTab'}
			showPhotoOptionsMenu={() => Alert.alert('showPhotoOptionsMenu')}
			tabChange={(tab: string) => Alert.alert('tabChange: ' + tab)}
		/>
	));
