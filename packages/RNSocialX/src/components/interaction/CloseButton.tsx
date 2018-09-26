import * as React from 'react';
import { Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors, Sizes } from '../../environment/theme';

interface IScreenCloseButtonProps {
	onClose: () => void;
}

export const CloseButton: React.SFC<IScreenCloseButtonProps> = ({
	onClose = () => {
		/**/
	},
}) => (
	<TouchableOpacity
		onPress={() => {
			Keyboard.dismiss();
			onClose();
		}}
	>
		<Icon
			name={'md-close'}
			size={Sizes.smartHorizontalScale(25)}
			color={Colors.white}
			style={style.closeIcon}
		/>
	</TouchableOpacity>
);

const style = StyleSheet.create({
	closeIcon: {
		marginHorizontal: Sizes.smartHorizontalScale(15),
	},
});
