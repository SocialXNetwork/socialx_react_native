import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {AnimatedFaIcon, Colors, Fonts, Sizes} from '../../environment/theme';
import {showToastMessage} from '../../utilities';

const PULSATE_PERIOD = 700;

interface ILikeAnimatingButtonProps {
	likedByMe: boolean;
	label: string;
	onPress: () => Promise<any>;
}

interface ILikeAnimatingButtonState {
	touchDisabled: boolean;
	likedByMe: boolean;
}

export class LikeAnimatingButton extends React.Component<ILikeAnimatingButtonProps, ILikeAnimatingButtonState> {
	public static defaultProps = {
		likedByMe: false,
		label: undefined,
		onPress: async () => {
			/**/
		},
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
		const iconSource = this.state.likedByMe ? 'heart' : 'heart-o';
		const likeColor = this.state.likedByMe ? Colors.pink : Colors.black;
		const likeStyles = [styles.likeButton, {color: likeColor}];
		return (
			<TouchableOpacity
				style={styles.container}
				disabled={!this.props.onPress || this.state.touchDisabled}
				onPress={this.buttonPressedHandler}
			>
				<AnimatedFaIcon ref={this.animatedIconRef} name={iconSource} style={likeStyles} />
				{this.props.label && <Text style={styles.label}>{this.props.label}</Text>}
			</TouchableOpacity>
		);
	}

	private buttonPressedHandler = async () => {
		this.animatedIconRef.animate('pulsate', PULSATE_PERIOD).then(this.onAnimationEndHandler);
		this.toggleAnimationFlags(true);

		if (this.props.onPress) {
			try {
				this.nextLikeValue = await this.props.onPress();
				this.toggleAnimationFlags(false);
			} catch (ex) {
				showToastMessage('Like failed with exception:' + ex);
				this.toggleAnimationFlags(false);
			}
		}
	};

	private onAnimationEndHandler = () => {
		if (this.animating) {
			this.animatedIconRef.animate('pulsate', PULSATE_PERIOD).then(this.onAnimationEndHandler);
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

const styles = StyleSheet.create({
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
