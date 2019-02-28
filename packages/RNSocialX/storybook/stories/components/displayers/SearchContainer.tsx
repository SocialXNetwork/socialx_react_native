import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { SearchContainer } from '../../../../src/components';
import CenterView from '../../../helpers/CenterView';

const items: string[] = [];

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('SearchContainer', () => {
		const searchTermValue = text('searchTermValue', '');
		const searching = boolean('searching', false);

		return (
			// @ts-ignore
			<SearchContainer
				searching={searching}
				results={items}
				suggestions={items}
				term={searchTermValue}
				onResultPress={action('onResultPress')}
			/>
		);
	});
