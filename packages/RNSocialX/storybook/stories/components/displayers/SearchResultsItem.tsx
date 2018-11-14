import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { SearchResultsItem } from '../../../../src/components/';
import { FRIEND_TYPES, ISearchResultData } from '../../../../src/types';
import CenterView from '../../../helpers/CenterView';

const item: ISearchResultData = {
	userId: '1',
	relationship: FRIEND_TYPES.NOT_FRIEND,
	fullName: 'Alex Sirbu',
	userName: 'alexsirbu',
	location: 'Timisoara',
	avatar: 'https://www.w3schools.com/w3css/img_lights.jpg',
};

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('SearchResultsItem', () => (
		<SearchResultsItem item={item} onResultPress={action('onResultPress')} />
	));
