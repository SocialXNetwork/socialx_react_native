import * as React from 'react';

import { INavigationProps } from '../../../types';
import { TrendingScreenView } from './TrendingScreen.view';

import {
	IWithTrendingEnhancedActions,
	IWithTrendingEnhancedData,
	WithTrending,
} from '../../../enhancers/screens';

type ITrendingScreenProps = INavigationProps &
	IWithTrendingEnhancedData &
	IWithTrendingEnhancedActions;

interface ITrendingScreenState {
	contentRef: React.RefObject<any>;
}

class Screen extends React.Component<
	ITrendingScreenProps,
	ITrendingScreenState
> {
	public state = {
		contentRef: React.createRef(),
	};

	public render() {
		const { trendingCategoriesItems, trendingContentItems } = this.props;

		return (
			<TrendingScreenView
				navigation={this.props.navigation}
				trendingCategoriesItems={trendingCategoriesItems}
				trendingContentItems={trendingContentItems}
				contentRef={this.state.contentRef}
				passContentRef={(ref: React.RefObject<any>) =>
					this.setState({ contentRef: ref })
				}
				getText={this.props.getText}
			/>
		);
	}
}

export const TrendingScreen = ({ navigation }: INavigationProps) => (
	<WithTrending>
		{({ data, actions }) => (
			<Screen navigation={navigation} {...data} {...actions} />
		)}
	</WithTrending>
);
