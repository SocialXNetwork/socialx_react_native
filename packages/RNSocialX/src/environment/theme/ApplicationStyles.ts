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
};

export const ApplicationStyles = StyleSheet.create(ApplicationStylesTi);
