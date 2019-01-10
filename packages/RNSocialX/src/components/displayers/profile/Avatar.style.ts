import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../../environment/theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(30);

const styles: any = {
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		borderWidth: 2,
		borderColor: Colors.white,
	},
};

export default StyleSheet.create(styles);
