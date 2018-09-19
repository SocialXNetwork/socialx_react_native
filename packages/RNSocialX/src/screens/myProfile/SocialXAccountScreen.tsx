import * as React from 'react';
import {Alert} from 'react-native';

import {INavigationProps} from '../../types';
import {SocialXAccountScreenView} from './SocialXAccountScreen.view';

import {
	IWithSocialXAccountEnhancedActions,
	IWithSocialXAccountEnhancedData,
	WithSocialXAccount,
} from '../../enhancers/screens';

type ISocialXAccountScreenProps = IWithSocialXAccountEnhancedActions &
	IWithSocialXAccountEnhancedData &
	INavigationProps<any, any>;
interface ISocialXAccountScreenState {}

class Screen extends React.Component<ISocialXAccountScreenProps, ISocialXAccountScreenState> {
	public static navigationOptions = {
		title: 'SOCIALX ACCOUNT',
	};

	public render() {
		return (
			<SocialXAccountScreenView
				{...this.props.stats}
				sendHandler={this.onSendHandler}
				receiveHandler={this.onReceiveHandler}
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
}

export const SocialXAccountScreen = ({navigation}: INavigationProps<any, any>) => (
	<WithSocialXAccount>
		{({data, actions}) => <Screen navigation={navigation} {...data} {...actions} />}
	</WithSocialXAccount>
);
