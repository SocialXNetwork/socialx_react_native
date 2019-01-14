import { Platform } from 'react-native';
import { OS_TYPES } from '../environment/consts';
import { Colors, Sizes } from '../environment/theme';

export default {
	feed: {
		activeTintColor: Colors.pink,
		inactiveTintColor: Colors.background,
		indicatorStyle: {
			height: 1,
			backgroundColor: Colors.pink,
		},
		pressOpacity: 1,
		upperCaseLabel: false,
		labelStyle: {
			fontSize: 14,
			fontFamily: Platform.OS === OS_TYPES.Android ? 'century_gothic' : 'CenturyGothic',
		},
		style: {
			backgroundColor: Colors.white,
		},
	},
	chat: {
		color: Colors.white,
		fontSize: Sizes.smartHorizontalScale(25),
	},
	tabs: {
		backgroundColor: Colors.alabaster,
	},
};
