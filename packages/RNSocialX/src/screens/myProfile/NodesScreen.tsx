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
	selectedCheckList: string[];
}

class Screen extends React.Component<INodesScreenProps, INodesScreenState> {
	public state = {
		nodeValue: '',
		superPeers: this.props.appConfig.gun.superPeers,
		selectedCheckList: [] as string[],
	};

	public render() {
		const { nodeValue, superPeers, selectedCheckList } = this.state;

		return (
			<NodesScreenView
				nodesList={superPeers}
				nodeValue={nodeValue}
				selectedCheckList={selectedCheckList}
				autoFocus={true}
				onSaveNewNode={this.onSaveNewNodeHandler}
				onNodeInputChange={this.onNodeInputChange}
				onDeleteNodes={this.onDeleteNodes}
				onCheckedNode={this.onCheckedNode}
				onGoBack={this.onGoBackHandler}
				getText={this.props.getText}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};

	private onNodeInputChange = (value: string) => {
		this.setState({
			nodeValue: value,
		});
	};

	private onCheckedNode = (value: string) => {
		const { selectedCheckList } = this.state;

		const newList = selectedCheckList;

		if (newList.includes(value)) {
			newList.splice(newList.indexOf(value), 1);
		} else {
			newList.push(value);
		}

		this.setState({ selectedCheckList: newList });
	};

	private onDeleteNodes = () => {
		const { selectedCheckList, superPeers } = this.state;

		const newNodesArray = superPeers.filter((e: string) => !selectedCheckList.includes(e));
		this.props.onSaveNodes(newNodesArray);
		this.setState({
			superPeers: newNodesArray,
			selectedCheckList: [],
		});
	};

	private onSaveNewNodeHandler = () => {
		const { superPeers, nodeValue } = this.state;

		const newNodesArray = superPeers.slice();
		newNodesArray.unshift(nodeValue);

		this.props.onSaveNodes(newNodesArray);
		this.setState({
			superPeers: newNodesArray,
		});
	};
}

export const NodesScreen = (props: INavigationProps) => (
	<WithNodes>{({ data, actions }) => <Screen {...props} {...data} {...actions} />}</WithNodes>
);
