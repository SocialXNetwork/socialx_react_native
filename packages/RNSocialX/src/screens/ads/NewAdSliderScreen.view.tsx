import * as React from 'react';
import { NativeScrollEvent, ScrollView, View } from 'react-native';

import { CreateAdSteps, Header } from '../../components';
import { ICreateAdSteps, ITranslatedProps } from '../../types';
import styles from './NewAdSliderScreen.style';

interface INewAdSliderScreenViewProps extends ITranslatedProps {
	onGoBack: () => void;
	sliderStep: ICreateAdSteps;
	onGoToNextStep: () => void;
	onGoToPreviousStep: () => void;
	isOnFirstSlide: boolean;
	isOnLastSlide: boolean;
	onMomentumScrollEnd: (event: { nativeEvent: NativeScrollEvent }) => void;
}

export const NewAdSliderScreenView = React.forwardRef<ScrollView, INewAdSliderScreenViewProps>(
	(
		{
			getText,
			onGoBack,
			sliderStep,
			onGoToNextStep,
			onGoToPreviousStep,
			children,
			onMomentumScrollEnd,
			isOnFirstSlide,
			isOnLastSlide,
		},
		ref,
	) => (
		<View style={styles.rootView}>
			<Header
				title={getText('new.ad.setup.post.screen.title')}
				back={true}
				onPressBack={onGoBack}
			/>
			<ScrollView
				ref={ref}
				horizontal={true}
				pagingEnabled={true}
				scrollEnabled={false}
				contentContainerStyle={styles.scrollContent}
				showsHorizontalScrollIndicator={false}
				onMomentumScrollEnd={onMomentumScrollEnd}
			>
				{children}
			</ScrollView>
			<CreateAdSteps
				currentStep={sliderStep}
				onGoToNextStep={onGoToNextStep}
				onGoToPreviousStep={onGoToPreviousStep}
				isOnFirstStep={isOnFirstSlide}
				isOnLastStep={isOnLastSlide}
			/>
		</View>
	),
);
