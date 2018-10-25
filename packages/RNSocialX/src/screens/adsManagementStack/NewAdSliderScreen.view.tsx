import * as React from 'react';
import { ScrollView, View } from 'react-native';

import { CreateAdSteps, Header, HeaderButton } from '../../components';
import { ICreateAdSteps, ITranslatedProps } from '../../types';
import styles from './NewAdSliderScreen.style';

interface INewAdSliderScreenViewProps extends ITranslatedProps {
	onGoBack: () => void;
	sliderStep: ICreateAdSteps;
	onGoToNextStep: () => void;
}

export const NewAdSliderScreenView = React.forwardRef<
	ScrollView,
	INewAdSliderScreenViewProps
>(({ getText, onGoBack, sliderStep, onGoToNextStep, children }, ref) => (
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
			scrollEnabled={false}
		>
			{children}
		</ScrollView>
		<CreateAdSteps currentStep={sliderStep} onGoToNextStep={onGoToNextStep} />
	</View>
));
