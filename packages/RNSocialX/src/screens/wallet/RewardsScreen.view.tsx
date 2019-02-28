import { Button, Card, Segment, Text } from 'native-base';
import * as React from 'react';
import { Animated, Dimensions, LayoutChangeEvent, Platform, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-navigation';

import { AnimatedBar, Header, PrimaryButton } from '../../components';
import { IRewardsDate, IRewardsHistoryData, OS_TYPES } from '../../environment/consts';
import { ITranslatedProps } from '../../types';

import styles, { BARS_HEIGHT, CARD_WIDTH, customStyles } from './RewardsScreen.style';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface IRewardsScreenViewProps extends ITranslatedProps {
	dailyHistory: IRewardsHistoryData[];
	monthlyHistory: IRewardsHistoryData[];
	selectedDateButton: IRewardsDate;
	translateXValue: Animated.Value;
	totalAmountSOCX: string;
	referralsAmount: string;
	refBarWidth: Animated.Value;
	postsAmount: string;
	ptsBarWidth: Animated.Value;
	bountiesAmount: string;
	bntsBarWidth: Animated.Value;
	startDailyIndex: number;
	startMonthlyIndex: number;
	handleDateChange: (text: IRewardsDate) => void;
	dailyCarouselOnLayout: (event: LayoutChangeEvent) => void;
	onGoBack: () => void;
}

const REWARDS_DATE_BUTTONS = [
	{
		label: 'rewards.date.buttons.daily',
		value: IRewardsDate.daily,
	},
	{
		label: 'rewards.date.buttons.monthly',
		value: IRewardsDate.monthly,
	},
];

export const RewardsScreenView: React.SFC<IRewardsScreenViewProps> = ({
	dailyHistory,
	monthlyHistory,
	startDailyIndex,
	startMonthlyIndex,
	dailyCarouselOnLayout,
	onGoBack,
	getText,
	selectedDateButton,
	handleDateChange,
	totalAmountSOCX,
	referralsAmount,
	refBarWidth,
	postsAmount,
	ptsBarWidth,
	bountiesAmount,
	bntsBarWidth,
	translateXValue,
}) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
		<Header title={getText('rewards.title')} back={true} onPressBack={onGoBack} />
		<View style={styles.contentContainer}>
			<Segment style={styles.segmentContainer}>
				{REWARDS_DATE_BUTTONS.map((rewardsDateButton, index) => (
					<Button
						key={rewardsDateButton.value}
						style={
							selectedDateButton === rewardsDateButton.value
								? styles.segmentButtonDateActive
								: styles.segmentButtonDateInactive
						}
						first={index === 0}
						last={index === REWARDS_DATE_BUTTONS.length - 1}
						active={selectedDateButton === rewardsDateButton.value}
						onPress={() => {
							handleDateChange(rewardsDateButton.value);
						}}
					>
						<Text
							style={
								selectedDateButton === rewardsDateButton.value
									? styles.segmentTitleActive
									: styles.segmentTitleInactive
							}
						>
							{getText(rewardsDateButton.label).toLowerCase()}
						</Text>
					</Button>
				))}
			</Segment>
			<View style={styles.overviewContainer}>
				<Text style={styles.overviewTitle}>{getText('rewards.overview.title')}</Text>
				<View style={styles.overviewItem}>
					<View style={styles.itemDescription}>
						<View style={styles.abbreviationContainer}>
							<View style={styles.abbreviation}>
								<Text style={styles.abbreviationShort}>
									{getText('rewards.overview.referrals.short')}
								</Text>
							</View>
							<Text style={styles.abbreviationText}>
								{getText('rewards.overview.referrals.text')}
							</Text>
						</View>
						<Text style={styles.grayText}>{referralsAmount}</Text>
					</View>
					<View style={styles.itemBar}>
						<AnimatedBar
							barColor={customStyles.referralsColor}
							barWidth={refBarWidth}
							barHeight={BARS_HEIGHT}
						/>
					</View>
				</View>
				<View style={styles.overviewItem}>
					<View style={styles.itemDescription}>
						<View style={styles.abbreviationContainer}>
							<View style={styles.abbreviation}>
								<Text style={styles.abbreviationShort}>
									{getText('rewards.overview.posts.short')}
								</Text>
							</View>
							<Text style={styles.abbreviationText}>{getText('rewards.overview.posts.text')}</Text>
						</View>
						<Text style={styles.grayText}>{postsAmount}</Text>
					</View>
					<View style={styles.itemBar}>
						<AnimatedBar
							barColor={customStyles.postsColor}
							barWidth={ptsBarWidth}
							barHeight={BARS_HEIGHT}
						/>
					</View>
				</View>
				<View style={styles.overviewItem}>
					<View style={styles.itemDescription}>
						<View style={styles.abbreviationContainer}>
							<View style={styles.abbreviation}>
								<Text style={styles.abbreviationShort}>
									{getText('rewards.overview.bounties.short')}
								</Text>
							</View>
							<Text style={styles.abbreviationText}>
								{getText('rewards.overview.bounties.text')}
							</Text>
						</View>
						<Text style={styles.grayText}>{bountiesAmount}</Text>
					</View>
					<View style={styles.itemBar}>
						<AnimatedBar
							barColor={customStyles.bountiesColor}
							barWidth={bntsBarWidth}
							barHeight={BARS_HEIGHT}
						/>
					</View>
				</View>
			</View>
			<View style={styles.separator} />
			<View style={styles.totalAmountContainer}>
				<Text style={styles.grayText}>{getText('rewards.total.amount.text')}</Text>
				<Text style={styles.textAmount}>{totalAmountSOCX}</Text>
			</View>
		</View>
		<View style={styles.carousels}>
			<View style={styles.animatedViewport}>
				<Animated.View
					style={[styles.animatedView, { transform: [{ translateX: translateXValue }] }]}
				>
					<View style={styles.fullWidth} onLayout={dailyCarouselOnLayout}>
						<Carousel
							data={dailyHistory}
							renderItem={({ item }) => (
								<Card key={item.date} style={styles.card}>
									<Text style={styles.cardDate}>{item.date}</Text>
									<Text style={styles.cardAmount}>{item.amount}</Text>
									<Text style={styles.cardCurrency}>{item.currency}</Text>
								</Card>
							)}
							firstItem={startDailyIndex}
							sliderWidth={SCREEN_WIDTH}
							itemWidth={CARD_WIDTH}
							removeClippedSubviews={false}
							inactiveSlideOpacity={0.6}
							useScrollView={Platform.OS === OS_TYPES.Android ? true : false}
						/>
					</View>
					<View style={styles.fullWidth}>
						<Carousel
							data={monthlyHistory}
							renderItem={({ item }) => (
								<Card key={item.date} style={styles.card}>
									<Text style={styles.cardDate}>{item.date}</Text>
									<Text style={styles.cardAmount}>{item.amount}</Text>
									<Text style={styles.cardCurrency}>{item.currency}</Text>
								</Card>
							)}
							firstItem={startMonthlyIndex}
							sliderWidth={SCREEN_WIDTH}
							itemWidth={CARD_WIDTH}
							removeClippedSubviews={false}
							inactiveSlideOpacity={0.6}
							useScrollView={Platform.OS === OS_TYPES.Android ? true : false}
						/>
					</View>
				</Animated.View>
			</View>
		</View>
		<View style={styles.backButtonContainer}>
			<PrimaryButton label={getText('rewards.button.back').toUpperCase()} onPress={onGoBack} />
		</View>
	</SafeAreaView>
);
