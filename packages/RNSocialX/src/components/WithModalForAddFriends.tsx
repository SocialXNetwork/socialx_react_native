import * as React from 'react';
import {findNodeHandle, View} from 'react-native';

import {FriendsSearchResult, IResizeProps, ITranslatedProps} from '../types';
import {IManagedModal, ModalTagFriends} from './';

const SEARCH_RESULTS_TAG_FRIENDS = [
	{
		id: '0',
		fullName: 'Ionut Movila',
		location: 'Belgium',
		avatarURL: 'https://placeimg.com/100/100/people',
	},
	{
		id: '1',
		fullName: 'Teresa Lamb',
		location: 'Poland',
		avatarURL: 'https://placeimg.com/101/101/people',
	},
	{
		id: '2',
		fullName: 'Terosa McCarthy',
		location: 'Vietnam',
		avatarURL: 'https://placeimg.com/102/102/people',
	},
	{
		id: '3',
		fullName: 'Terosa McCarthy',
		location: 'Romania',
		avatarURL: 'https://placeimg.com/103/103/people',
	},
	{
		id: '4',
		fullName: 'Gregory Bates',
		location: 'Latvia',
		avatarURL: 'https://placeimg.com/104/104/people',
	},
	{
		id: '5',
		fullName: 'Patrick Mullins',
		location: 'Singapore',
		avatarURL: 'https://placeimg.com/105/105/people',
	},
];

interface IModalForAddFriendsProps {
	addedFriends: FriendsSearchResult[];
	showAddFriendsModal: () => void;
}

interface IWithModalForAddFriendsState {
	modalVisible: boolean;
	blurViewRef: any;
	friendsSearchResults: FriendsSearchResult[];
	taggedFriendsInModal: FriendsSearchResult[];
	taggedFriends: FriendsSearchResult[];
}

interface IWithModalForAddFriendsProps extends IResizeProps, ITranslatedProps, IManagedModal {
	children(props: IModalForAddFriendsProps): JSX.Element;
}

export class WithModalForAddFriends extends React.Component<
	IWithModalForAddFriendsProps,
	IWithModalForAddFriendsState
> {
	public state = {
		modalVisible: false,
		blurViewRef: null,
		friendsSearchResults: [],
		taggedFriendsInModal: [],
		taggedFriends: [],
	};

	private baseScreen: React.RefObject<any> = React.createRef();

	public componentDidMount() {
		const blurViewHandle = findNodeHandle(this.baseScreen.current);
		this.setState({blurViewRef: blurViewHandle});
	}

	public render() {
		const {children, marginBottom, getText, onDismiss, onModalHide} = this.props;
		const {modalVisible, blurViewRef, friendsSearchResults, taggedFriends, taggedFriendsInModal} = this.state;
		return (
			<View style={{flex: 1}}>
				<ModalTagFriends
					visible={modalVisible}
					doneHandler={this.handleTagFriendsEditFinished}
					cancelHandler={this.closeTagFriendsModal}
					blurViewRef={blurViewRef}
					searchResults={friendsSearchResults}
					selectedUsers={taggedFriendsInModal}
					onSearchUpdated={this.friendsSearchUpdatedHandler}
					selectTagUserInModal={this.tagFriendHandler}
					marginBottom={marginBottom}
					getText={getText}
					onModalHide={onModalHide}
					onDismiss={onDismiss}
				/>
				<View ref={this.baseScreen} style={{flex: 1}}>
					{children({
						addedFriends: taggedFriends,
						showAddFriendsModal: this.showTagFriendsModal,
					})}
				</View>
			</View>
		);
	}

	private handleTagFriendsEditFinished = () => {
		this.setState({
			taggedFriends: this.state.taggedFriendsInModal,
			modalVisible: false,
		});
	};

	private showTagFriendsModal = () => {
		this.setState({
			taggedFriendsInModal: this.state.taggedFriends,
			modalVisible: true,
		});
	};

	private closeTagFriendsModal = () => {
		this.setState({
			modalVisible: false,
		});
	};

	private tagFriendHandler = (friend: FriendsSearchResult) => {
		this.setState({taggedFriendsInModal: [...this.state.taggedFriendsInModal, friend]});
	};

	private friendsSearchUpdatedHandler = (term: string) => {
		// TODO: make real search here
		let friendsSearchResults: FriendsSearchResult[] = [];
		if (term.length > 3 && term.length < 8) {
			friendsSearchResults = SEARCH_RESULTS_TAG_FRIENDS;
		}
		this.setState({friendsSearchResults});
	};
}
