import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { AnimatedFaIcon, Animations, Colors, Sizes } from '../../environment/theme';

const PULSATE_PERIOD = 700;

interface IProps {
	likedByCurrentUser: boolean;
	disabled?: boolean;
	secondary?: boolean;
	onLikePost: () => void;
}

export class LikeAnimatingButton extends React.Component<IProps> {
	private ref: React.RefObject<any> = React.createRef();

	public render() {
		const { secondary, likedByCurrentUser, disabled } = this.props;

		const iconStyles = [styles.icon, { color: secondary ? Colors.white : Colors.black }];

		return (
			<TouchableOpacity style={styles.container} disabled={disabled} onPress={this.onPressHandler}>
				<AnimatedFaIcon
					ref={this.ref}
					name={likedByCurrentUser ? 'heart' : 'heart-o'}
					style={iconStyles}
				/>
			</TouchableOpacity>
		);
	}

	private onPressHandler = async () => {
		if (this.ref && this.ref.current) {
			await this.ref.current.animate(Animations.custom.pulsate, PULSATE_PERIOD);
		}

		await this.props.onLikePost();
	};
}

const styles: any = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(24),
	},
});
