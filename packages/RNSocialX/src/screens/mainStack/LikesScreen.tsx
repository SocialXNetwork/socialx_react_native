import * as React from 'react';

import { SCREENS, TABS } from '../../environment/consts';
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
				onViewUserProfile={this.onViewUserProfileHandler}
				onGoBack={this.onGoBackHandler}
				getText={this.props.getText}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};

	private onViewUserProfileHandler = (userId: string) => {
		const { navigation, setNavigationParams } = this.props;
		setNavigationParams({
			screenName: SCREENS.UserProfile,
			params: { userId, origin: TABS.Feed },
		});
		navigation.navigate(SCREENS.UserProfile);
	};
}

export const LikesScreen = (nav: INavigationProps) => (
	<WithLikes>{({ data, actions }) => <Screen {...nav} {...data} {...actions} />}</WithLikes>
);
