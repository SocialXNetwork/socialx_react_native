import { Tab, Tabs } from 'native-base';
import * as React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
	ChartAccountPerformance,
	CloseButton as CloseModal,
	Header,
	PrimaryButton,
} from '../../components';
import {
	IAd,
	IAdsAccountPerformanceValues,
	ITranslatedProps,
} from '../../types';

import styles, { BUTTON_WIDTH } from './AdsManagementOverviewScreen.style';

interface IAdActions {
	onEditAd: () => void;
}

interface IAdProps extends IAd, IAdActions {}

const AdCard: React.SFC<IAdProps> = ({ url, title, description, onEditAd }) => (
	<View style={styles.card}>
		<Image source={{ uri: url }} style={styles.image} resizeMode="cover" />
		<View style={styles.cardHeader}>
			<Text style={styles.title}>{title}</Text>
			<TouchableOpacity
				onPress={onEditAd}
				hitSlop={{ top: 10, bottom: 10, left: 15, right: 10 }}
			>
				<Icon name="md-create" style={styles.editIcon} />
			</TouchableOpacity>
		</View>
		<Text style={styles.description}>{description}</Text>
	</View>
);

interface IAdsManagementOverviewScreenViewProps
	extends IAdActions,
		ITranslatedProps {
	currentDate: string;
	currentWeek: string;
	lastSevenDays: string;
	ads: IAd[];
	spentValues: IAdsAccountPerformanceValues[];
	peopleReachedValues: IAdsAccountPerformanceValues[];
	impressionsValues: IAdsAccountPerformanceValues[];
	onClose: () => void;
	onCreateAd: () => void;
	onSeePastPerformance: () => void;
}

export const AdsManagementOverviewScreenView: React.SFC<
	IAdsManagementOverviewScreenViewProps
> = ({
	onClose,
	getText,
	currentDate,
	onCreateAd,
	ads,
	onEditAd,
	onSeePastPerformance,
	currentWeek,
	spentValues,
	impressionsValues,
	peopleReachedValues,
}) => {
	return (
		<View style={styles.container}>
			<Header
				title={getText('ad.management.overview.screen.title')}
				left={<CloseModal onClose={onClose} />}
				right={<Icon name="ios-add" onPress={onCreateAd} style={styles.icon} />}
			/>
			<ScrollView style={styles.content}>
				<Text style={styles.currentDate}>{currentDate}</Text>
				<View style={styles.section}>
					<Text style={styles.heading}>
						{getText('ad.management.overview.screen.ads.list.title')}
					</Text>
					{ads.map((ad) => (
						<AdCard {...ad} onEditAd={onEditAd} key={ad.id} />
					))}
				</View>
				<View style={styles.section}>
					<View style={styles.headingContainer}>
						<Text style={styles.heading}>
							{getText('ad.management.overview.screen.account.performance')}
						</Text>
					</View>
					<Tabs tabBarUnderlineStyle={styles.activeTab}>
						<Tab
							tabStyle={styles.tab}
							activeTabStyle={styles.tab}
							textStyle={styles.tabText}
							activeTextStyle={styles.activeTabText}
							heading={getText(
								'ad.management.overview.screen.account.performance.spent',
							)}
						>
							<ChartAccountPerformance
								week={currentWeek}
								performanceValues={spentValues}
							/>
						</Tab>
						<Tab
							tabStyle={styles.tab}
							activeTabStyle={styles.tab}
							textStyle={styles.tabText}
							activeTextStyle={styles.activeTabText}
							heading={getText(
								'ad.management.overview.screen.account.performance.people.reached',
							)}
						>
							<ChartAccountPerformance
								week={currentWeek}
								performanceValues={peopleReachedValues}
							/>
						</Tab>
						<Tab
							tabStyle={styles.tab}
							activeTabStyle={styles.tab}
							textStyle={styles.tabText}
							activeTextStyle={styles.activeTabText}
							heading={getText(
								'ad.management.overview.screen.account.performance.impressions',
							)}
						>
							<ChartAccountPerformance
								week={currentWeek}
								performanceValues={impressionsValues}
							/>
						</Tab>
					</Tabs>
					<View style={styles.button}>
						<PrimaryButton
							label={getText(
								'ad.management.overview.screen.see.past.performance',
							)}
							width={BUTTON_WIDTH}
							onPress={onSeePastPerformance}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};
