import * as React from 'react';

import { INavigationProps } from '../../types';
import { LikesScreenView } from './LikesScreen.view';

import {
	IWithLikesEnhancedActions,
	IWithLikesEnhancedData,
	WithLikes,
} from '../../enhancers/screens';

type ILikesScreenProps = INavigationProps & IWithLikesEnhancedActions & IWithLikesEnhancedData;

class Screen extends React.Component<ILikesScreenProps> {
	render() {
		return (
			<LikesScreenView
				likes={this.props.likes}
				onGoBack={this.onGoBackHandler}
				getText={this.props.getText}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const LikesScreen = (nav: INavigationProps) => (
	<WithLikes>{({ data, actions }) => <Screen {...nav} {...data} {...actions} />}</WithLikes>
);
