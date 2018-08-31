import {IosType} from '../consts';

import {Dimensions, Platform} from 'react-native';
import {Sizes} from './Sizes';

const {width, height} = Dimensions.get('window');

// Used via Metrics.baseMargin
export const Metrics = {
	// marginHorizontal: 10,
	// marginVertical: 10,
	// section: 25,
	// baseMargin: 10,
	// doubleBaseMargin: 20,
	// smallMargin: 5,
	// doubleSection: 50,
	// horizontalLineHeight: 1,
	// screenWidth: width < height ? width : height,
	// screenHeight: width < height ? height : width,
	navBarHeight: Platform.OS === IosType ? 54 : 47, // not very reliable should be done else!
	// buttonRadius: 4,
	// icons: {
	// 	tiny: 15,
	// 	small: 20,
	// 	medium: 30,
	// 	large: 45,
	// 	xl: 50,
	// },
	// images: {
	// 	small: 20,
	// 	medium: 40,
	// 	large: 60,
	// 	logo: 200,
	// },
};
