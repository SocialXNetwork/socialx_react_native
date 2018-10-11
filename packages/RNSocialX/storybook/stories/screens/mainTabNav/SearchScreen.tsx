import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock, suggestedItems } from '../../../../src/mocks';
import { SearchScreenView } from '../../../../src/screens/mainTabNav/SearchScreen/SearchScreen.view';

storiesOf('Screens/mainTabNav', module)
	.addDecorator(withKnobs)
	.add('SearchScreenView', () => {
		const topSearching = boolean('topSearching', false);
		const topHasMoreResults = boolean('topHasMoreResults', false);
		return (
			<SearchScreenView
				getText={getTextMock}
				setNavigationParams={() => {
					/**/
				}}
				loadedTabs={[0, 1, 2, 3]}
				searchTermValue={''}
				topSearchResults={suggestedItems}
				topSuggestions={suggestedItems}
				topSearching={topSearching}
				topHasMoreResults={topHasMoreResults}
				onTabIndexChanged={action('onTabIndexChanged')}
				onSearchTermChange={action('onSearchTermChange')}
				searchForMoreResults={action('searchForMoreResults')}
				addFriend={action('addFriend')}
				// @ts-ignore // This is actually ignoring all props!
				navigation={null}
			/>
		);
	});
