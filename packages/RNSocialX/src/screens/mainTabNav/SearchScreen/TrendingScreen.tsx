import * as React from 'react';

import {INavigationProps} from '../../../types';
import {TrendingScreenView} from './TrendingScreen.view';

type ITrendingScreenProps = INavigationProps;

interface ITrendingScreenState {
	contentRef: React.RefObject<any>;
}

export class TrendingScreen extends React.Component<ITrendingScreenProps, ITrendingScreenState> {
	public state = {
		contentRef: React.createRef(),
	};

	public render() {
		return (
			<TrendingScreenView
				navigation={this.props.navigation}
				contentRef={this.state.contentRef}
				passContentRef={(ref: React.RefObject<any>) => this.setState({contentRef: ref})}
			/>
		);
	}
}
