import { StyleSheet } from 'react-native';
import { Animations, Colors, Sizes } from '../../environment/theme';

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: Colors.white,
	},
	icon: {
		width: '100%',
	},
	text: {
		paddingHorizontal: Sizes.smartHorizontalScale(25),
		fontSize: Sizes.smartHorizontalScale(30),
		textAlign: 'center',
	},
});

export const animations = Animations;
