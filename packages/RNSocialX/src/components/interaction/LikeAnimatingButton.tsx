import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {AnimatedFaIcon, Colors, Fonts, Sizes} from '../../environment/theme';
import {ITranslatedProps} from '../../types';
import {showToastMessage} from '../../utilities';

const PULSATE_PERIOD = 700;

interface ILikeAnimatingButtonProps extends ITranslatedProps {
	likedByMe: boolean;
	label: false | string;
	onPress: () => Promise<any>;
}

interface ILikeAnimatingButtonState {
	touchDisabled: boolean;
	likedByMe: boolean;
}

export class LikeAnimatingButton extends React.Component<ILikeAnimatingButtonProps, ILikeAnimatingButtonState> {
	public static defaultProps = {
		label: false,
	};

	public state = {
		likedByMe: this.props.likedByMe,
		touchDisabled: false,
	};

	private animatedIconRef: any = React.createRef();
	private nextLikeValue: boolean = this.props.likedByMe;
	private animating: boolean = false;

	public shouldComponentUpdate(nextProps: ILikeAnimatingButtonProps, nextState: ILikeAnimatingButtonState) {
		return (
			nextState.likedByMe !== this.state.likedByMe ||
			nextState.touchDisabled !== this.state.touchDisabled ||
			nextProps.label !== this.props.label
		);
	}

	public render() {
		const {label, onPress} = this.props;
		const iconSource = this.state.likedByMe ? 'heart' : 'heart-o';
		const likeColor = this.state.likedByMe ? Colors.pink : Colors.black;
		const likeStyles = [styles.likeButton, {color: likeColor}];

		return (
			<TouchableOpacity
				style={styles.container}
				disabled={!onPress || this.state.touchDisabled}
				onPress={this.buttonPressedHandler}
			>
				<AnimatedFaIcon ref={this.animatedIconRef} name={iconSource} style={likeStyles} />
				{label && <Text style={styles.label}>{label}</Text>}
			</TouchableOpacity>
		);
	}

	private buttonPressedHandler = async () => {
		const {onPress, getText} = this.props;

		this.animatedIconRef.current.animate('pulsate', PULSATE_PERIOD).then(this.onAnimationEndHandler);
		this.toggleAnimationFlags(true);

		if (onPress) {
			try {
				this.nextLikeValue = await onPress();
				this.toggleAnimationFlags(false);
			} catch (ex) {
				showToastMessage(`${getText('toast.message.on.like.failed')}: ${ex}`);
				this.toggleAnimationFlags(false);
			}
		}
	};

	private onAnimationEndHandler = () => {
		if (this.animating) {
			this.animatedIconRef.current.animate('pulsate', PULSATE_PERIOD).then(this.onAnimationEndHandler);
		} else {
			this.setState({
				likedByMe: this.nextLikeValue,
				touchDisabled: false,
			});
		}
	};

	private toggleAnimationFlags = (active: boolean) => {
		this.setState({
			touchDisabled: active,
		});
		this.animating = active;
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
