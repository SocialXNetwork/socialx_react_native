import * as React from 'react';
import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import style, { customStyleProps } from './IntroFirstSlide.style';

interface IIntroFirstSlideProps {
	width: number;
	height: number;
	topSpacer: number;
	bottomSpacer: number;
	key: string;
	title: string;
	description: string;
	gradient: string[];
}

export const IntroFirstSlide: React.SFC<IIntroFirstSlideProps> = ({
	width,
	height,
	topSpacer,
	bottomSpacer,
	title,
	description,
	gradient,
}) => (
	<LinearGradient
		style={[
			style.container,
			{
				paddingTop: topSpacer,
				paddingBottom: bottomSpacer,
				width,
				height,
			},
		]}
		colors={gradient}
		start={{ x: 0, y: 0 }}
		end={{ x: 0, y: 1 }}
	>
		<Image source={customStyleProps.slideLogoImage} style={style.logoImage} />
		<Image source={customStyleProps.slideBackgroundImage} style={style.slideImage} />
		<View style={style.textContainer}>
			<Text style={style.slideTitle}>{title}</Text>
			<Text style={style.slideDescription}>{description}</Text>
		</View>
	</LinearGradient>
);
