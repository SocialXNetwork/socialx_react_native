import React from 'react';
import { FlatList, Keyboard, Platform, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { IBounty } from '../../../store/data/bounties';
import { IApplicationState, selectMessages } from '../../../store/selectors';

import styles from './BountiesList.style';
import { Bounty } from './Bounty';

import { bounties } from '../../../mocks';

interface IBountiesListProps {
	onClaimReward: () => void;
}

interface IProps extends IBountiesListProps {
	// bounties: IBounty[];
}

interface IState {
	// bountyIndex: number;
	// selected: boolean;
}

export class BountiesList extends React.Component<IProps, IState> {
	public state = {
		// bountyIndex: this.props.bounties.length,
		// selected: false,
	};

	private scrollRef: React.RefObject<FlatList<IBounty>> = React.createRef();

	public render() {
		// const { bounties, onClaimReward } = this.props;
		// const { bountyIndex, selected } = this.state;

		return (
			<FlatList
				ref={this.scrollRef}
				data={bounties}
				renderItem={({ item, index }) => (
					<Bounty
						bounty={item}
						// previousMessage={bounties[index - 1] || null}
						// nextMessage={bounties[index + 1] || null}
						// selected={messageIndex === index && selected}
						onClaimReward={() => this.onClaimRewardHandler(index)}
					/>
				)}
				keyboardShouldPersistTaps="handled"
				keyExtractor={(item) => item.id}
				onLayout={() =>
					this.scrollRef.current &&
					this.scrollRef.current.scrollToOffset({ offset: 0, animated: true })
				}
				contentContainerStyle={styles.container}
			/>
		);
	}

	private onClaimRewardHandler = (index: number) => {
		// const { selected, messageIndex } = this.state;

		// if (index !== messageIndex && !selected) {
		// 	this.setState({
		// 		messageIndex: index,
		// 		selected: true,
		// 	});
		// } else if (index !== messageIndex && selected) {
		// 	this.setState({
		// 		messageIndex: index,
		// 	});
		// } else if (index === messageIndex && !selected) {
		// 	this.setState({ selected: true });
		// } else {
		// 	this.setState({ selected: false });
		// }

		return true;
	};
}

// const mapStateToProps = (state: IApplicationState, props: IBountiesListProps) => ({
// 	messages: selectBounties(state.data.bounties),
// });

// export const BountiesList = connect(mapStateToProps)(Component as any);
