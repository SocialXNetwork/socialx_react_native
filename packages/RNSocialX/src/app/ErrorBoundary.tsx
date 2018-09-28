import * as React from 'react';
import { Text, View } from 'react-native';

export default class ErrorBoundary extends React.Component<
	{},
	{
		hasError: boolean;
	}
> {
	state = { hasError: false };

	componentDidCatch(error: any, info: any) {
		this.setState({ hasError: true });
	}
	render() {
		if (this.state.hasError) {
			return (
				<View>
					<Text>Oops! Error occured...</Text>
				</View>
			);
		}
		return this.props.children;
	}
}
