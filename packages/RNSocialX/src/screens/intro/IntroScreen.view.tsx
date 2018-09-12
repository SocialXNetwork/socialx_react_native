import * as React from 'react';
import {Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';

import {IntroFirstSlide, IntroGenericSlide} from '../../components';
import {ITranslatedProps} from '../../types';
import style, {customStyleProps} from './IntroScreen.style';

const SLIDES = [
	{
		key: 'Slide1',
		title: 'intro.first.slide.title',
		description: 'intro.first.slide.description',
		gradient: [customStyleProps.slide1GradientStart, customStyleProps.slide1GradientEnd],
	},
	{
		key: 'Slide2',
		title: 'intro.second.slide.title',
		description: 'intro.second.slide.description',
		gradient: [customStyleProps.slide2GradientStart, customStyleProps.slide2GradientEnd],
		image: customStyleProps.slide2BackgroundImage,
	},
	{
		key: 'Slide3',
		title: 'intro.third.slide.title',
		description: 'intro.third.slide.description',
		gradient: [customStyleProps.slide3GradientStart, customStyleProps.slide3GradientEnd],
		image: customStyleProps.slide3BackgroundImage,
	},
];

const SkipButton: React.SFC<ITranslatedProps> = ({getText}) => (
	<Text style={style.skipButton}>{getText('intro.skip.label')}</Text>
);

const NextButton: React.SFC = () => (
	<View style={style.buttonCircle}>
		<Icon name={'ios-arrow-forward'} style={style.pinkIcon} />
	</View>
);

const DoneButton: React.SFC = () => (
	<View style={style.buttonCircle}>
		<Icon name={'md-checkmark'} style={style.pinkIcon} />
	</View>
);

const SlideItem: React.SFC = (props: any) => (
	<React.Fragment>
		{!!props.image && <IntroGenericSlide {...props} />}
		{!props.image && <IntroFirstSlide {...props} />}
	</React.Fragment>
);

interface IIntroScreenViewProps extends ITranslatedProps {
	doneButtonHandler: () => void;
	skipButtonHandler: () => void;
}

export const IntroScreenView: React.SFC<IIntroScreenViewProps> = ({doneButtonHandler, skipButtonHandler, getText}) => {
	return (
		<AppIntroSlider
			slides={SLIDES.map((slide) => ({
				...slide,
				title: getText(slide.title),
				description: getText(slide.description),
			}))}
			activeDotColor={customStyleProps.activeDotColor}
			dotColor={customStyleProps.dotColor}
			renderItem={<SlideItem />}
			renderNextButton={NextButton}
			renderDoneButton={DoneButton}
			onDone={doneButtonHandler}
			onSkip={skipButtonHandler}
			showSkipButton={true}
			renderSkipButton={SkipButton}
		/>
	);
};
