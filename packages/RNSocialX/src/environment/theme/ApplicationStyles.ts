import {StyleSheet} from 'react-native';

import {Colors} from './Colors';
import {Fonts} from './Fonts';
import {Sizes} from './Sizes';

const ApplicationStylesTi: any = {
	screenHeader: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(13),
		letterSpacing: 1,
		color: Colors.white,
		textAlign: 'center',
		flex: 1,
	},
	inputErrorText: {
		...Fonts.centuryGothic,
		color: Colors.monza,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartHorizontalScale(16),
	},
	buttonDisabled: {
		opacity: 0.3,
	},
};

export const ApplicationStyles = StyleSheet.create(ApplicationStylesTi);
