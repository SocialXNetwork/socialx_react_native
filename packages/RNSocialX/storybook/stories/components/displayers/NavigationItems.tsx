import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {NavigationItems} from '../../../../src/components/';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('NavigationItems', () => (
		<NavigationItems
			notifications={5}
			selectedTab={'UserFeedTab'}
			showPhotoOptionsMenu={action('showPhotoOptionsMenu')}
			tabChange={action('tabChange')}
		/>
	));
