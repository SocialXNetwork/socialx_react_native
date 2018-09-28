import * as React from 'react';

export default class Init extends React.Component<{}> {
	componentDidMount() {
		console.log('APPLICATION INIT');
	}
	render() {
		return this.props.children;
	}
}
