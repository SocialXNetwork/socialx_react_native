import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

export default class Init extends React.Component<{}, {}> {
	render() {
		return <Provider store={store}>{this.props.children}</Provider>;
	}
}
