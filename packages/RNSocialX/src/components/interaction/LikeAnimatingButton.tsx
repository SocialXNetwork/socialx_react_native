/**
 * TODO list:
 * 1. Check timings here. What will happen if tapping multiple times in row the button, and async calls take longer?
 */

import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import {
	AnimatedFaIcon,
	Animations,
	Colors,
	Fonts,
	Sizes,
} from '../../environment/theme';
import { ITranslatedProps } from '../../types';

const PULSATE_PERIOD = 700;

interface ILikeAnimatingButtonProps extends ITranslatedProps {
	likedByMe: boolean;
	label: false | string;
	onPress: () => void;
}

interface ILikeAnimatingButtonState {
	touchDisabled: boolean;
	optimisticLikedByMe: boolean;
}

export class LikeAnimatingButton extends React.Component<
	ILikeAnimatingButtonProps,
	ILikeAnimatingButtonState
> {
	public static defaultProps = {
		label: false,
	};
	public static getDerivedStateFromProps(
		nextProps: Readonly<ILikeAnimatingButtonProps>,
		prevState: Readonly<ILikeAnimatingButtonState>,
	) {
		if (nextProps.likedByMe !== prevState.optimisticLikedByMe) {
			// TODO: investigate NativeBase as this crashes the app
			// showToastMessage(nextProps.getText('toast.message.on.like.failed'));
			return {
				optimisticLikedByMe: nextProps.likedByMe,
			};
		}
		return null;
	}

	public state = {
		touchDisabled: false,
		optimisticLikedByMe: this.props.likedByMe,
	};

	private animatedIconRef: any = React.createRef();

	public render() {
		const { label, onPress } = this.props;
		const { optimisticLikedByMe } = this.state;
		const likeStyles = [
			styles.likeButton,
			{ color: optimisticLikedByMe ? Colors.pink : Colors.black },
		];

		return (
			<TouchableOpacity
				style={styles.container}
				disabled={!onPress || this.state.touchDisabled}
				onPress={this.buttonPressedHandler}
			>
				<AnimatedFaIcon
					ref={this.animatedIconRef}
					name={optimisticLikedByMe ? 'heart' : 'heart-o'}
					style={likeStyles}
				/>
				{label && <Text style={styles.label}>{label}</Text>}
			</TouchableOpacity>
		);
	}

	private buttonPressedHandler = async () => {
		const { onPress } = this.props;

		this.setState({
			touchDisabled: true,
			optimisticLikedByMe: !this.state.optimisticLikedByMe,
		});

		onPress();
		await this.animatedIconRef.current.animate(
			Animations.pulsate,
			PULSATE_PERIOD,
		);

		this.setState({
			touchDisabled: false,
		});
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
	likeButton: {
		fontSize: Sizes.smartHorizontalScale(24),
	},
});
