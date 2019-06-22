import React, { SFC } from 'react';
import { View } from 'react-native';

import { NAVIGATION, SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { LaunchScreenView } from './LaunchScreen.view';
import { LoadingScreen } from './LoadingScreen';

import {
	IWithLaunchEnhancedActions,
	IWithLaunchEnhancedData,
	WithLaunch,
} from '../../enhancers/screens';

import useLifeCycles from '../../hooks/logic/useLifecycles';

type IProps = INavigationProps & IWithLaunchEnhancedData & IWithLaunchEnhancedActions;

// TODO: rework
const Screen: SFC<IProps> = (props) => {
	let cryptoInterval: number;
	let loginTimeout: NodeJS.Timeout;

	const { login, auth } = props;

	useLifeCycles(() => {
		cryptoInterval = setInterval(() => {
			// @ts-ignore
			if (window.crypto.loaded) {
				clearInterval(cryptoInterval);
				loginTimeout = setTimeout(async () => {
					await login({
						username: auth!.alias || '',
						password: auth!.password || '',
					});
				}, 200);
			}
		});
	}, 500);

	return <View />;
};

export const LaunchScreen = (props: INavigationProps) => (
	<WithLaunch>{({ data, actions }) => <Screen {...props} {...data} {...actions} />}</WithLaunch>
);
