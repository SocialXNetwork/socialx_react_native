import { Animated, Image, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

export const AnimatedImage = Animatable.createAnimatableComponent(Image);
export const AnimatedText = Animatable.createAnimatableComponent(Text);
export const AnimatedIonicon = Animatable.createAnimatableComponent(Ionicon);
export const AnimatedFaIcon = Animatable.createAnimatableComponent(FontAwesome);
export const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

export const Animations = {
	dragon: require('./assets/animations/dragonAnimation.json'),
	globe: require('./assets/animations/globeAnimation.json'),
	globe2: require('./assets/animations/globe2Animation.json'),
	heart: require('./assets/animations/heartAnimation.json'),
	pulsate: {
		0: {
			scale: 1,
		},
		0.5: {
			scale: 1.2,
		},
		1: {
			scale: 1,
		},
	},
};
