import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Colors, colorWithAlpha } from '../../environment/theme';

interface IActivityIndicatorModalProps {
	visible: boolean;
	alpha: number;
	loader?: boolean;
}

export const TransparentOverlayModal: React.SFC<IActivityIndicatorModalProps> = ({
	visible,
	alpha,
	loader,
}) => (
	<View
		pointerEvents={visible ? 'auto' : 'none'}
		style={[
			styles.container,
			{
				backgroundColor: visible ? colorWithAlpha(Colors.black, alpha) : Colors.transparent,
			},
		]}
	>
		{loader && <ActivityIndicator size="large" color={Colors.white} />}
	</View>
);

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

/**
 * Sample usage below:
 */

// private showAndHideTransparentOverlay = () => {
//   this.props.setGlobal({
//     transparentOverlay: {
//       visible: true,
//       alpha: 0.5,
//     },
//   });
//   setTimeout(
//     () =>
//       this.props.setGlobal({
//         transparentOverlay: {
//           visible: false,
//         },
//       }),
//     2000,
//   );
// };
