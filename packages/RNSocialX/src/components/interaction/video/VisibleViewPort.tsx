import * as React from 'react';
import { Dimensions, View } from 'react-native';

interface IInViewPortProps {
	disabled: boolean;
	delay: number;
	onChange: (isVisible: boolean) => void;
}

interface IInViewPortState {
	rectTop: number;
	rectBottom: number;
	rectWidth: number;
}

export class VisibleViewPort extends React.Component<IInViewPortProps, IInViewPortState> {
	public static defaultProps = {
		disabled: false,
		delay: 0,
	};

	public state = {
		rectTop: 0,
		rectBottom: 0,
		rectWidth: 0,
	};

	private interval: any;
	private lastValue: any;
	private viewRef: any;

	// componentDidMount() {
	// 	if (!this.props.disabled) {
	// 		this.startWatching();
	// 	}
	// }

	// componentWillUnmount() {
	// 	this.stopWatching();
	// }

	// componentWillReceiveProps(nextProps: any) {
	// 	if (nextProps.disabled) {
	// 		this.stopWatching();
	// 	} else {
	// 		this.lastValue = null;
	// 		this.startWatching();
	// 	}
	// }

	// startWatching() {
	// 	if (this.interval) {
	// 		return;
	// 	}
	// 	this.interval = setInterval(() => {
	// 		if (!this.viewRef) {
	// 			return;
	// 		}
	// 		this.viewRef.measure(
	// 			(x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
	// 				this.setState({
	// 					rectTop: pageY,
	// 					rectBottom: pageY + height,
	// 					rectWidth: pageX + width,
	// 				});
	// 			},
	// 		);
	// 		this.isInViewPort();
	// 	}, this.props.delay || 100);
	// }

	// stopWatching() {
	// 	this.interval = clearInterval(this.interval);
	// }

	isInViewPort() {
		const { rectBottom, rectTop, rectWidth } = this.state;
		const window = Dimensions.get('window');
		const isVisible =
			rectBottom !== 0 &&
			rectTop >= 0 &&
			rectBottom <= window.height &&
			rectWidth > 0 &&
			rectWidth <= window.width;
		if (this.lastValue !== isVisible) {
			this.lastValue = isVisible;
			this.props.onChange(isVisible);
		}
	}

	render() {
		return (
			<View
				collapsable={false}
				ref={(component) => {
					this.viewRef = component;
				}}
				{...this.props}
			>
				{this.props.children}
			</View>
		);
	}
}
