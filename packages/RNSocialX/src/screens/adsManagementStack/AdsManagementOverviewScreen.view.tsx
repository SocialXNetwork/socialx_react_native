import { Tab, Tabs } from 'native-base';
import * as React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { CloseButton as CloseModal, Header } from '../../components';
import { ITranslatedProps } from '../../types';
import styles from './AdsManagementOverviewScreen.style';

interface IAdCard {
	thumbURL: string;
	title: string;
	description: string;
	id: string;
}

interface IAdCardActions {
	onEditAd: () => void;
}

interface IAdCardProps extends IAdCard, IAdCardActions {}

const AdCard: React.SFC<IAdCardProps> = ({
	thumbURL,
	title,
	description,
	onEditAd,
}) => (
	<View style={styles.adCardContainer}>
		<Image
			source={{ uri: thumbURL }}
			style={styles.adCardThumbnail}
			resizeMode={'cover'}
		/>
		<View style={styles.adCardTitleRow}>
			<Text style={styles.adCardTitle}>{title}</Text>
			<TouchableOpacity
				onPress={onEditAd}
				hitSlop={{ top: 10, bottom: 10, left: 15, right: 10 }}
			>
				<Icon name={'md-create'} style={styles.editAdIcon} />
			</TouchableOpacity>
		</View>
		<Text style={styles.adCardDescription}>{description}</Text>
	</View>
);

interface IAdsManagementOverviewScreenViewProps
	extends IAdCardActions,
		ITranslatedProps {
	currentDate: string;
	lastSevenDays: string;
	adCards: IAdCard[];
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
	adCards,
	onEditAd,
	lastSevenDays,
	onSeePastPerformance,
}) => {
	return (
		<View style={styles.rootView}>
			<Header
				title={getText('ad.management.overview.screen.title')}
				left={<CloseModal onClose={onClose} />}
			/>
			<ScrollView style={styles.contentView}>
				<Text style={styles.currentDate}>{currentDate}</Text>
				<Text style={styles.adsListTitle}>
					{getText('ad.management.overview.screen.ads.list.title')}
				</Text>
				{adCards.map((adCard) => (
					<AdCard {...adCard} onEditAd={onEditAd} key={adCard.id} />
				))}
				<View style={styles.performanceContainer}>
					<View style={styles.accountPerformanceTitleBorder}>
						<Text style={styles.accountPerformanceTitle}>
							{getText('ad.management.overview.screen.account.performance')}
						</Text>
					</View>
					<Tabs
						locked={true}
						tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
					>
						<Tab
							tabStyle={styles.tabStyle}
							activeTabStyle={styles.tabStyle}
							textStyle={styles.tabTitleTextInactive}
							activeTextStyle={styles.tabTitleTextActive}
							heading={getText(
								'ad.management.overview.screen.account.performance.spent',
							)}
						>
							<Text>{'Tab spend content'}</Text>
						</Tab>
						<Tab
							tabStyle={styles.tabStyle}
							activeTabStyle={styles.tabStyle}
							textStyle={styles.tabTitleTextInactive}
							activeTextStyle={styles.tabTitleTextActive}
							heading={getText(
								'ad.management.overview.screen.account.performance.people.reached',
							)}
						>
							<Text>{'Tab people content'}</Text>
						</Tab>
					</Tabs>
				</View>
				<View style={styles.seePastPerformanceContainer}>
					<TouchableOpacity onPress={onSeePastPerformance}>
						<Text style={styles.seePastPerformanceButton}>
							{getText('ad.management.overview.screen.see.past.performance')}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
			<TouchableOpacity
				style={styles.createAdButtonContainer}
				onPress={onCreateAd}
			>
				<Icon name={'ios-add'} style={styles.createAdButtonIcon} />
			</TouchableOpacity>
		</View>
	);
};
