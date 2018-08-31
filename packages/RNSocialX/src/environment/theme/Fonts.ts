import {Platform} from 'react-native';
import {AndroidType} from '../consts';

export const Fonts = {
	centuryGothic: {
		fontFamily: Platform.OS === AndroidType ? 'century_gothic' : 'CenturyGothic',
		fontWeight: 'normal',
		fontStyle: 'normal',
	},
	centuryGothicBold: {
		fontFamily: Platform.OS === AndroidType ? 'century_gothic_bold' : 'CenturyGothic-Bold',
		fontWeight: 'bold',
		fontStyle: 'normal',
	},
	centuryGothicItalic: {
		fontFamily: Platform.OS === AndroidType ? 'century_gothic_italic' : 'CenturyGothic-Italic',
		fontWeight: 'normal',
		fontStyle: Platform.OS === AndroidType ? 'normal' : 'italic',
	},
	centuryGothicBoldItalic: {
		fontFamily: Platform.OS === AndroidType ? 'century_gothic_bold_italic' : 'CenturyGothic-BoldItalic',
		fontWeight: 'bold',
		fontStyle: 'italic',
	},
};
