import React from 'react';
import { View } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator, SafeAreaView } from 'react-navigation';

import { BountiesList, Header } from '../../components';
import { IDictionary, INavigationProps } from '../../types';

import { IBounty } from '../../store/data/bounties';
import { styles, tabsStyles } from './AllBountiesScreen.style';

interface IProps extends INavigationProps, IDictionary {
	bounties: IBounty[];
	onClaimBounty: (id: string) => void;
}

const AllBountiesTabs = createMaterialTopTabNavigator(
	{
		Sponsored: {
			screen: ({ screenProps }: { screenProps: IProps }) => (
				<View style={styles.entries}>
					<BountiesList
						dictionary={screenProps.dictionary}
						bounties={screenProps.bounties}
						onClaimBounty={screenProps.onClaimBounty}
					/>
				</View>
			),
		},
		Hot: {
			screen: ({ screenProps }: { screenProps: IProps }) => (
				<View style={styles.entries}>
					<BountiesList
						dictionary={screenProps.dictionary}
						bounties={screenProps.bounties}
						onClaimBounty={screenProps.onClaimBounty}
					/>
				</View>
			),
		},
		New: {
			screen: ({ screenProps }: { screenProps: IProps }) => (
				<View style={styles.entries}>
					<BountiesList
						dictionary={screenProps.dictionary}
						bounties={screenProps.bounties}
						onClaimBounty={screenProps.onClaimBounty}
					/>
				</View>
			),
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
			title={props.dictionary.screens.bounties.title.toUpperCase()}
			back={true}
			onPressBack={props.navigation.goBack}
		/>
		<Tabs screenProps={props} />
	</SafeAreaView>
);
