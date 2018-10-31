import * as React from 'react';

import { INavigationProps } from '../../types';
import { NodesScreenView } from './NodesScreen.view';

import {
	IWithNodesEnhancedActions,
	IWithNodesEnhancedData,
	WithNodes,
} from '../../enhancers/screens';

type INodesScreenProps = INavigationProps & IWithNodesEnhancedActions & IWithNodesEnhancedData;

interface INodesScreenState {
	nodeValue: string;
	isSwiping: boolean;
}

const mockPeers = [
	'http://139.59.130.248:8765/gun',
	'http://128.199.162.85:8765/gun',
	'http://139.59.130.248:8765/gun',
	'http://128.199.162.85:8765/gun',
	'http://139.59.130.248:8765/gun',
	'http://128.199.162.85:8765/gun',
	'http://139.59.130.248:8765/gun',
	'http://128.199.162.85:8765/gun',
	'http://139.59.130.248:8765/gun',
	'http://128.199.162.85:8765/gun',
	'http://139.59.130.248:8765/gun',
	'http://128.199.162.85:8765/gun',
];

class Screen extends React.Component<INodesScreenProps, INodesScreenState> {
	public state = {
		nodeValue: '',
		isSwiping: false,
	};

	public render() {
		const { navigation, getText, appConfig } = this.props;
		const { nodeValue, isSwiping } = this.state;

		return (
			<NodesScreenView
				onGoBack={() => this.onGoBackHandler(navigation)}
				getText={getText}
				// nodesList={appConfig.gun.superPeers}
				nodesList={mockPeers}
				onSaveNewNode={this.onSaveNewNodeHandler}
				nodeValue={nodeValue}
				autoFocus={true}
				onNodeInputChange={this.onNodeInputChange}
				onSwipeStart={this.onSwipeStartHandler}
				onSwipeRelease={this.onSwipeReleaseHandler}
				isSwiping={isSwiping}
				onDeleteNode={this.onDeleteNode}
			/>
		);
	}

	private onGoBackHandler = (navigation: any) => {
		navigation.goBack(null);
	};

	private onNodeInputChange = (value: string) => {
		this.setState({
			nodeValue: value,
		});
	};

	private onDeleteNode = (value: string) => {
		mockPeers.splice(mockPeers.findIndex((e) => e === value), 1);
	};

	private onSwipeStartHandler = () => {
		this.setState({ isSwiping: true });
	};

	private onSwipeReleaseHandler = () => {
		this.setState({ isSwiping: false });
	};

	private onSaveNewNodeHandler = () => {
		this.switchActivityIndicator(true);
		mockPeers.unshift(this.state.nodeValue);
		// await this.props.onSaveNodes(nodes);
		this.switchActivityIndicator(false);
	};

	private switchActivityIndicator = (state: boolean) => {
		this.props.setGlobal({
			activity: {
				visible: state,
				title: this.props.getText('nodes.progress.message'),
			},
		});
	};
}

export const NodesScreen = (navProps: INavigationProps) => (
	<WithNodes>{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}</WithNodes>
);
