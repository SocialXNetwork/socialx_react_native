import * as React from 'react';
import {StyleSheet, View} from 'react-native';
// @ts-ignore
import Spinner from 'react-native-spinkit';

import {Colors, Sizes} from '../../environment/theme';

export enum SpinnerTypes {
	NineCubeGrid = '9CubeGrid',
	ChasingDots = 'ChasingDots',
	CircleFlip = 'CircleFlip',
	Bounce = 'Bounce',
	Wave = 'Wave',
	WanderingCubes = 'WanderingCubes',
	ThreeBounce = 'ThreeBounce',
	Circle = 'Circle',
	FadingCircle = 'FadingCircle',
	FadingCircleAlt = 'FadingCircleAlt',
}

const style = StyleSheet.create({
	spinnerContainer: {
		width: '100%',
		paddingTop: Sizes.smartVerticalScale(20),
		alignItems: 'center',
	},
});

const customStyleProps = {
	defaultSpinnerSize: Sizes.smartHorizontalScale(30),
	defaultSpinnerColor: Colors.pink,
};

interface ISpinKitLoaderProps {
	spinnerType?: SpinnerTypes;
	spinnerSize?: number;
	spinnerColor?: string;
}

export const SpinKitLoader: React.SFC<ISpinKitLoaderProps> = ({spinnerSize, spinnerColor, spinnerType}) => (
	<View style={style.spinnerContainer}>
		<Spinner isVisible={true} size={spinnerSize} type={spinnerType} color={spinnerColor} />
	</View>
);

SpinKitLoader.defaultProps = {
	spinnerType: SpinnerTypes.NineCubeGrid,
	spinnerSize: customStyleProps.defaultSpinnerSize,
	spinnerColor: customStyleProps.defaultSpinnerColor,
};
