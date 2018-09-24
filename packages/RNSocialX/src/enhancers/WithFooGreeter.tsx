import * as React from 'react';
import {View} from 'react-native';

interface IGreeterEnhancedProps {
	salute: string;
	from: string;
}

// =====================================================
// EXAMPLE ENHANCER AS A STATELESS FUNCTIONAL COMPONENT
// =====================================================

interface IWithFooGreeterProps {
	children(props: IGreeterEnhancedProps): JSX.Element;
}

// foo is imported here directly just as an example. Normally, there should
// be a WithFoo component for this purpose, too!
export const WithFooGreeter: React.SFC<IWithFooGreeterProps> = ({children}) => (
	<View>{children({salute: 'Hello ', from: 'foo'})}</View>
);

// =====================================================
// EXAMPLE ENHANCER AS A STATEFUL CLASS COMPONENT
// =====================================================

interface IWithFooGreeterAndCounterProps {
	children(props: IGreeterEnhancedProps): JSX.Element;
}

interface IWithFooGreeterAndCounterState {
	counter: number;
}

export class WithFooGreeterAndCounter extends React.Component<
	IWithFooGreeterAndCounterProps,
	IWithFooGreeterAndCounterState
> {
	state = {
		counter: 0,
	};

	intervalHandle?: NodeJS.Timer;

	componentDidMount() {
		this.intervalHandle = setInterval(this.increment, 1000);
	}

	componentWillUnmount() {
		if (this.intervalHandle) {
			clearInterval(this.intervalHandle);
		}
	}

	increment = () => {
		this.setState(({counter}) => ({counter: counter + 1}));
	};

	render() {
		const {counter} = this.state;
		const {children} = this.props;

		// foo is imported here directly just as an example. Normally, there should
		// be a WithFoo component for this purpose, too!
		return <View>{children({salute: `Hello ${counter} times `, from: 'foo'})}</View>;
	}
}
