import * as React from 'react';
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

interface ITouchableWithDoublePressProps extends TouchableOpacityProps {
	onSinglePress: () => void;
	onDoublePress: () => void;
	disabled: boolean;
	style: StyleProp<ViewStyle>;
}

export class TouchableWithDoublePress extends React.Component<ITouchableWithDoublePressProps> {
	private tapCount: number = 0;

	public render() {
		const { children, ...props } = this.props;

		return (
			<TouchableOpacity {...props} activeOpacity={1} onPress={this.getTapCount}>
				{children}
			</TouchableOpacity>
		);
	}

	private getTapCount = () => {
		let taps = this.tapCount;
		let timeout: any;
		taps++;
		this.tapCount++;

		if (taps === 1) {
			timeout = setTimeout(() => {
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
			clearTimeout(timeout);

			taps = 0;
			this.tapCount = 0;

			// Double tap
			if (this.props.onDoublePress) {
				this.props.onDoublePress();
			}
		}
	};
}
