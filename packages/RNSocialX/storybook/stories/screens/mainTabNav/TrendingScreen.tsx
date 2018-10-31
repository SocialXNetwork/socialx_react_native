import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { trendingCategoriesItems, trendingContentItems } from '../../../../src/mocks';
import { TrendingScreenView } from '../../../../src/screens/mainTabNav/SearchScreen/TrendingScreen.view';

class TrendingScreenStory extends React.Component {
	public state = {
		contentRef: React.createRef(),
	};

	public render() {
		return (
			<TrendingScreenView
				trendingCategoriesItems={trendingCategoriesItems}
				trendingContentItems={trendingContentItems}
				contentRef={this.state.contentRef}
				passContentRef={this.passContentRef}
				// @ts-ignore
				navigation={null}
			/>
		);
	}

	private passContentRef = (ref: React.RefObject<any>) => {
		this.setState({ contentRef: ref });
	};
}

storiesOf('Screens/mainTabNav', module).add('TrendingScreen', () => <TrendingScreenStory />);
