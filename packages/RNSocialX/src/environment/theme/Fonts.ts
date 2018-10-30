import { Platform } from 'react-native';
import { OS_TYPES } from '../consts';

export const Fonts = {
	centuryGothic: {
		fontFamily: Platform.OS === OS_TYPES.Android ? 'century_gothic' : 'CenturyGothic',
		fontWeight: 'normal',
		fontStyle: 'normal',
	},
	centuryGothicBold: {
		fontFamily: Platform.OS === OS_TYPES.Android ? 'century_gothic_bold' : 'CenturyGothic-Bold',
		fontWeight: 'bold',
		fontStyle: 'normal',
	},
	centuryGothicItalic: {
		fontFamily: Platform.OS === OS_TYPES.Android ? 'century_gothic_italic' : 'CenturyGothic-Italic',
		fontWeight: 'normal',
		fontStyle: Platform.OS === OS_TYPES.Android ? 'normal' : 'italic',
	},
	centuryGothicBoldItalic: {
		fontFamily:
			Platform.OS === OS_TYPES.Android ? 'century_gothic_bold_italic' : 'CenturyGothic-BoldItalic',
		fontWeight: 'bold',
		fontStyle: 'italic',
	},
};
