import { Platform } from 'react-native';
import { OS_TYPES } from '../consts';

interface IFonts {
	centuryGothic: {
		fontFamily: string;
		fontWeight:
			| 'normal'
			| 'bold'
			| '100'
			| '200'
			| '300'
			| '400'
			| '500'
			| '600'
			| '700'
			| '800'
			| '900'
			| undefined;
		fontStyle: 'normal' | 'italic' | undefined;
	};
	centuryGothicBold: {
		fontFamily: string;
		fontWeight:
			| 'normal'
			| 'bold'
			| '100'
			| '200'
			| '300'
			| '400'
			| '500'
			| '600'
			| '700'
			| '800'
			| '900'
			| undefined;
		fontStyle: 'normal' | 'italic' | undefined;
	};
	centuryGothicItalic: {
		fontFamily: string;
		fontWeight:
			| 'normal'
			| 'bold'
			| '100'
			| '200'
			| '300'
			| '400'
			| '500'
			| '600'
			| '700'
			| '800'
			| '900'
			| undefined;
		fontStyle: 'normal' | 'italic' | undefined;
	};
	centuryGothicBoldItalic: {
		fontFamily: string;
		fontWeight:
			| 'normal'
			| 'bold'
			| '100'
			| '200'
			| '300'
			| '400'
			| '500'
			| '600'
			| '700'
			| '800'
			| '900'
			| undefined;
		fontStyle: 'normal' | 'italic' | undefined;
	};
}

export const Fonts: IFonts = {
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
