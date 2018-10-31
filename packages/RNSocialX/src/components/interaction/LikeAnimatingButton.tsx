import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { AnimatedFaIcon, Animations, Colors, Fonts, Sizes } from '../../environment/theme';
import { ITranslatedProps } from '../../types';

const PULSATE_PERIOD = 700;

interface ILikeAnimatingButtonProps extends ITranslatedProps {
	likedByCurrentUser: boolean;
	likeFailed: boolean;
	label: false | string;
	onLikePress: () => void;
}

interface ILikeAnimatingButtonState {
	disabled: boolean;
	likedByCurrentUser: boolean;
	error: boolean;
}

export class LikeAnimatingButton extends React.Component<
	ILikeAnimatingButtonProps,
	ILikeAnimatingButtonState
> {
	public static defaultProps = {
		label: false,
	};

	public static getDerivedStateFromProps(
		nextProps: ILikeAnimatingButtonProps,
		currentState: ILikeAnimatingButtonState,
	) {
		if (nextProps.likeFailed !== currentState.error) {
			return {
				error: true,
			};
		}

		return null;
	}

	public state = {
		disabled: false,
		likedByCurrentUser: this.props.likedByCurrentUser,
		error: false,
	};

	private animatedIconRef: any = React.createRef();

	public render() {
		const { label, onLikePress } = this.props;
		const { likedByCurrentUser } = this.state;

		const iconStyles = [styles.icon, { color: Colors.black }];

		return (
			<TouchableOpacity
				style={styles.container}
				disabled={!onLikePress || this.state.disabled}
				onPress={this.onPressHandler}
			>
				<AnimatedFaIcon
					ref={this.animatedIconRef}
					name={likedByCurrentUser ? 'heart' : 'heart-o'}
					style={iconStyles}
				/>
				{label && <Text style={styles.label}>{label}</Text>}
			</TouchableOpacity>
		);
	}

	private onPressHandler = async () => {
		this.setState((currentState) => {
			return {
				disabled: true,
				likedByCurrentUser: !currentState.likedByCurrentUser,
				error: false,
			};
		});

		await this.animatedIconRef.current.animate(Animations.custom.pulsate, PULSATE_PERIOD);
		await this.props.onLikePress();

		if (this.state.error) {
			this.setState({ disabled: false, likedByCurrentUser: this.props.likedByCurrentUser });
		} else {
			this.setState({ disabled: false });
		}
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
