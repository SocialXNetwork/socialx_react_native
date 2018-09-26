import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { SearchResultsItem } from '../../../../src/components/';
import { ISearchResultData, SearchResultKind } from '../../../../src/types';
import CenterView from '../../../helpers/CenterView';

const item: ISearchResultData = {
	userId: '1',
	relationship: SearchResultKind.NotFriend,
	fullName: 'Alex Sirbu',
	userName: 'alexsirbu',
	location: 'Timisoara',
	avatarURL: 'https://www.w3schools.com/w3css/img_lights.jpg',
};

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('SearchResultsItem', () => (
		<SearchResultsItem
			item={item}
			onAddFriend={action('onAddFriend')}
			onResultPress={action('onResultPress')}
		/>
	));
