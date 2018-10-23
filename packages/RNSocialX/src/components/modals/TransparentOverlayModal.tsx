import * as React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import { Colors } from '../../environment/theme';
import { WithManagedTransitions } from '../managedTransitions';

interface IActivityIndicatorModalProps {
	visible: boolean;
	alpha: number;
}

export const TransparentOverlayModal: React.SFC<
	IActivityIndicatorModalProps
> = ({ visible, alpha }) => (
	<WithManagedTransitions modalVisible={visible}>
		{({ onDismiss, onModalHide }) => (
			<Modal
				// avoidKeyboard={true} // would expect that this way this can show and keyboard remain open, but NOT!
				onDismiss={onDismiss}
				onModalHide={onModalHide}
				isVisible={visible}
				backdropOpacity={alpha}
				backdropTransitionInTiming={50}
				backdropTransitionOutTiming={50}
				backdropColor={Colors.black}
				animationIn="fadeIn"
				animationOut="fadeOut"
				hideModalContentWhileAnimating={true}
			>
				<View />
			</Modal>
		)}
	</WithManagedTransitions>
);

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
