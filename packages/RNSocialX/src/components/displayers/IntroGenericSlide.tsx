import * as React from 'react';
import { Image, ImageRequireSource, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import style from './IntroGenericSlide.style';

interface IIntroGenericSlideProps {
	width: number;
	height: number;
	topSpacer: number;
	bottomSpacer: number;
	key: string;
	title: string;
	description: string;
	gradient: string[];
	image: ImageRequireSource;
}

export const IntroGenericSlide: React.SFC<IIntroGenericSlideProps> = ({
	width,
	height,
	topSpacer,
	bottomSpacer,
	image,
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
		<Image source={image} style={style.slideImage} resizeMode={'contain'} />
		<View style={style.textContainer}>
			<Text style={style.slideTitle}>{title}</Text>
			<Text style={style.slideDescription}>{description}</Text>
		</View>
	</LinearGradient>
);
