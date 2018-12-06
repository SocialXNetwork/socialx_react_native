import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { AnimatedFaIcon, Animations, Colors, Fonts, Sizes } from '../../environment/theme';

const PULSATE_PERIOD = 700;

interface IProps {
	likedByCurrentUser: boolean;
	disabled?: boolean;
	label?: string;
	secondary?: boolean;
	onLikePost: () => void;
}

export class LikeAnimatingButton extends React.Component<IProps> {
	private animatedIconRef: any = React.createRef();

	public render() {
		const { label, secondary, likedByCurrentUser, disabled } = this.props;

		const iconStyles = [styles.icon, { color: secondary ? Colors.white : Colors.black }];

		return (
			<TouchableOpacity style={styles.container} disabled={disabled} onPress={this.onPressHandler}>
				<AnimatedFaIcon
					ref={this.animatedIconRef}
					name={likedByCurrentUser ? 'heart' : 'heart-o'}
					style={iconStyles}
				/>
				{!!label && <Text style={styles.label}>{label}</Text>}
			</TouchableOpacity>
		);
	}

	private onPressHandler = async () => {
		await this.animatedIconRef.current.animate(Animations.custom.pulsate, PULSATE_PERIOD);
		await this.props.onLikePost();
	};
}

const styles: any = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartHorizontalScale(5),
		marginHorizontal: Sizes.smartHorizontalScale(5),
		paddingVertical: Sizes.smartVerticalScale(5),
		alignItems: 'center',
	},
	label: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postButtonColor,
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(24),
	},
});
