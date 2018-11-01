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
	superPeers: string[];
}

class Screen extends React.Component<INodesScreenProps, INodesScreenState> {
	public state = {
		nodeValue: '',
		superPeers: this.props.appConfig.gun.superPeers,
	};

	public render() {
		const { navigation, getText } = this.props;
		const { nodeValue, superPeers } = this.state;

		return (
			<NodesScreenView
				onGoBack={() => this.onGoBackHandler(navigation)}
				getText={getText}
				nodesList={superPeers}
				onSaveNewNode={this.onSaveNewNodeHandler}
				nodeValue={nodeValue}
				autoFocus={true}
				onNodeInputChange={this.onNodeInputChange}
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

	private onDeleteNode = async (value: string) => {
		const { superPeers } = this.state;

		const newNodesArray = superPeers.filter((e: string) => e !== value);

		await this.props.onSaveNodes(newNodesArray);
		this.setState({
			superPeers: newNodesArray,
		});
	};

	private onSaveNewNodeHandler = async () => {
		const { superPeers, nodeValue } = this.state;

		const newNodesArray = superPeers.slice();
		newNodesArray.unshift(nodeValue);

		await this.props.onSaveNodes(newNodesArray);
		this.setState({
			superPeers: newNodesArray,
		});
	};
}

export const NodesScreen = (navProps: INavigationProps) => (
	<WithNodes>{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}</WithNodes>
);
