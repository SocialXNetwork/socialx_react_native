import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import { IBounty } from '../../../store/data/bounties';
import { IApplicationState, selectMessages } from '../../../store/selectors';

import { ILocaleDictionary } from '../../../store/app/i18n/Types';
import styles from './BountiesList.style';
import { Bounty } from './Bounty';

interface IBountiesListProps {
	dictionary: ILocaleDictionary;
	onClaimBounty: (index: string) => void;
}

interface IProps extends IBountiesListProps {
	bounties: IBounty[];
}

interface IState {}

export class BountiesList extends React.Component<IProps, IState> {
	public state = {};

	private scrollRef: React.RefObject<FlatList<IBounty>> = React.createRef();

	public render() {
		const { bounties, dictionary } = this.props;
		// const { bountyIndex, selected } = this.state;

		return (
			<FlatList
				ref={this.scrollRef}
				data={bounties}
				renderItem={({ item }) => (
					<Bounty bounty={item} dictionary={dictionary} onClaimBounty={this.onClaimBountyHandler} />
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

	private onClaimBountyHandler = (index: string) => {
		console.log(index);

		this.props.onClaimBounty(index);
	};
}

// const mapStateToProps = (state: IApplicationState, props: IBountiesListProps) => ({
// 	messages: selectBounties(state.data.bounties),
// });

// export const BountiesList = connect(mapStateToProps)(Component as any);
