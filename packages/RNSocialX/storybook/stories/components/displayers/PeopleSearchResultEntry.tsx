import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { PeopleSearchResultEntry } from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

const image = 'https://www.w3schools.com/w3css/img_lights.jpg';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('PeopleSearchResultEntry', () => (
		<PeopleSearchResultEntry
			avatarURL={image}
			fullName={'Alex Sirbu'}
			location={'Timisoara'}
			selected={true}
			addHandler={action('addHandler')}
			getText={(text) => text}
		/>
	));
