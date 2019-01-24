import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

export const INPUT_SIZE = Sizes.smartHorizontalScale(300);

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	messages: {
		flex: 1,
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: Sizes.smartHorizontalScale(5),
	},
	emojiContainer: {
		marginHorizontal: Sizes.smartHorizontalScale(7.5),
	},
	addContainer: {
		marginHorizontal: Sizes.smartHorizontalScale(7.5),
	},
	emojiIcon: {
		fontSize: Sizes.smartHorizontalScale(25),
		color: Colors.pink,
	},
	addIcon: {
		fontSize: Sizes.smartHorizontalScale(32),
		color: Colors.pink,
	},
});

export const customStyles = {
	inputBorderColor: Colors.dustGray,
};
