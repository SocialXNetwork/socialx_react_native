import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

export const CONTAINER_HEIGHT_FULL = Sizes.smartHorizontalScale(60);
export const CONTAINER_HEIGHT_NAME_ONLY = Sizes.smartHorizontalScale(40);

const style: any = {
	container: {
		height: CONTAINER_HEIGHT_FULL,
		paddingVertical: Sizes.smartVerticalScale(10),
		justifyContent: 'space-between',
	},
	fullName: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		textAlign: 'center',
	},
	userName: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(17),
		textAlign: 'center',
	},
};

export const fullNameDefaultColor = Colors.userAvatarFullName;
export const userNameDefaultColor = Colors.postText;
export const styles = StyleSheet.create(style);
