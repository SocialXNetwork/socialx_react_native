import * as React from 'react';
import {StyleProp, TouchableOpacity, TouchableOpacityProps, View, ViewStyle} from 'react-native';

export interface ITouchableWithDoublePressProps extends TouchableOpacityProps {
	onSinglePress: () => void;
	onDoublePress: () => void;
	children: JSX.Element;
	disabled: boolean;
	style: StyleProp<ViewStyle>;
}

export class TouchableWithDoublePress extends React.PureComponent<ITouchableWithDoublePressProps> {
	public defaultProps = {
		onSinglePress: () => {
			/**/
		},
		onDoublePress: () => {
			/**/
		},
		children: <View />,
		disabled: false,
		style: {},
	};

	private tapCount: number = 0;

	public render() {
		const {children} = this.props;

		return (
			<TouchableOpacity {...this.props} activeOpacity={1} onPress={this.getTapCount}>
				{children}
			</TouchableOpacity>
		);
	}

	private getTapCount = () => {
		let taps = this.tapCount;
		let singleTapTimer = 0;
		taps++;
		this.tapCount++;

		if (taps === 1) {
			singleTapTimer = setTimeout(() => {
				if (this.tapCount === 1) {
					taps = 0;
					this.tapCount = 0;

					// Single tap
					if (this.props.onSinglePress) {
						this.props.onSinglePress();
					}
				}
			}, 300);
		} else if (taps === 2) {
			clearTimeout(singleTapTimer);
			taps = 0;
			this.tapCount = 0;

			// Double tap
			if (this.props.onDoublePress) {
				this.props.onDoublePress();
			}
		}
	};
}
