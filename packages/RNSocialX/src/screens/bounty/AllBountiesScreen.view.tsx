import React from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator, SafeAreaView } from 'react-navigation';

import { Header } from '../../components';
import { IDictionary, INavigationProps } from '../../types';

import { styles, tabsStyles } from './AllBountiesScreen.style';

interface IProps extends INavigationProps, IDictionary {
	bounties: string[];
	onClaimBounty: (alias: string) => void;
}

const AllBountiesTabs = createMaterialTopTabNavigator(
	{
		Sponsored: {
			screen: ({ screenProps }: { screenProps: IProps }) => <View style={styles.entries} />,
		},
		Hot: {
			screen: ({ screenProps }: { screenProps: IProps }) => <View style={styles.entries} />,
		},
		New: {
			screen: ({ screenProps }: { screenProps: IProps }) => <View style={styles.entries} />,
		},
	},
	{
		animationEnabled: true,
		swipeEnabled: true,
		// @ts-ignore
		optimizationsEnabled: true,
		tabBarOptions: tabsStyles,
	},
);

const Tabs = createAppContainer(AllBountiesTabs);

export const AllBountiesScreenView: React.SFC<IProps> = (props) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
		<Header
			title={props.dictionary.screens.bounty.title.toUpperCase()}
			back={true}
			onPressBack={props.navigation.goBack}
		/>
		<Tabs screenProps={props} />
	</SafeAreaView>
);
