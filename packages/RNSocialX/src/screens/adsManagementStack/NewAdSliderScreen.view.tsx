import * as React from 'react';
import { NativeScrollEvent, ScrollView, View } from 'react-native';

import { CreateAdSteps, Header, HeaderButton } from '../../components';
import { ICreateAdSteps, ITranslatedProps } from '../../types';
import styles from './NewAdSliderScreen.style';

interface INewAdSliderScreenViewProps extends ITranslatedProps {
	onGoBack: () => void;
	sliderStep: ICreateAdSteps;
	onGoToNextStep: () => void;
	canGoBack: boolean;
	isOnLastSlide: boolean;
	onMomentumScrollEnd: (event: { nativeEvent: NativeScrollEvent }) => void;
}

export const NewAdSliderScreenView = React.forwardRef<
	ScrollView,
	INewAdSliderScreenViewProps
>(
	(
		{
			getText,
			onGoBack,
			sliderStep,
			onGoToNextStep,
			children,
			canGoBack,
			onMomentumScrollEnd,
			isOnLastSlide,
		},
		ref,
	) => (
		<View style={styles.rootView}>
			<Header
				title={getText('new.ad.setup.post.screen.title')}
				left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
			/>
			<ScrollView
				ref={ref}
				horizontal={true}
				pagingEnabled={true}
				contentContainerStyle={styles.scrollContent}
				showsHorizontalScrollIndicator={false}
				scrollEnabled={canGoBack}
				onMomentumScrollEnd={onMomentumScrollEnd}
			>
				{children}
			</ScrollView>
			<CreateAdSteps
				currentStep={sliderStep}
				onGoToNextStep={onGoToNextStep}
				isOnLastStep={isOnLastSlide}
			/>
		</View>
	),
);
