import * as React from 'react';
import { Alert } from 'react-native';

import { INavigationProps } from '../../types';
import { SocialXAccountScreenView } from './SocialXAccountScreen.view';

import {
	IWithSocialXAccountEnhancedActions,
	IWithSocialXAccountEnhancedData,
	WithSocialXAccount,
} from '../../enhancers/screens';

type ISocialXAccountScreenProps = IWithSocialXAccountEnhancedActions &
	IWithSocialXAccountEnhancedData &
	INavigationProps<any, any>;
interface ISocialXAccountScreenState {}

class Screen extends React.Component<
	ISocialXAccountScreenProps,
	ISocialXAccountScreenState
> {
	public render() {
		return (
			<SocialXAccountScreenView
				{...this.props.stats}
				onSend={this.onSendHandler}
				onReceive={this.onReceiveHandler}
				onGoBack={this.onGoBackHandler}
				getText={this.props.getText}
			/>
		);
	}

	private onSendHandler = () => {
		Alert.alert('onSendHandler');
	};

	private onReceiveHandler = () => {
		Alert.alert('onReceiveHandler');
	};

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const SocialXAccountScreen = ({
	navigation,
}: INavigationProps<any, any>) => (
	<WithSocialXAccount>
		{({ data, actions }) => (
			<Screen navigation={navigation} {...data} {...actions} />
		)}
	</WithSocialXAccount>
);
