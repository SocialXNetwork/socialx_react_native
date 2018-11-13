import * as React from 'react';
import { Keyboard } from 'react-native';
import uuid from 'uuid/v4';

import { WithModalForAddFriends } from '../../components';
import { IMAGE_PICKER_TYPES } from '../../environment/consts';
import { INavigationProps, IWallPostPhotoOptimized } from '../../types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	IPickerImageMultiple,
} from '../../utilities';
import { PhotoScreenView } from './PhotoScreen.view';

import {
	IWithPhotoEnhancedActions,
	IWithPhotoEnhancedData,
	WithPhoto,
} from '../../enhancers/screens';

type IPhotoScreenProps = INavigationProps & IWithPhotoEnhancedActions & IWithPhotoEnhancedData;

interface IPhotoScreenState {
	locationEnabled: boolean;
	tagFriends: boolean;
	location: string;
	caption: string;
	mediaObjects: IWallPostPhotoOptimized[];
}

class Screen extends React.Component<IPhotoScreenProps, IPhotoScreenState> {
	public state = {
		locationEnabled: false,
		tagFriends: false,
		location: '',
		caption: '',
		mediaObjects: [...this.props.mediaObjects],
	};

	public render() {
		const { currentUser, marginBottom, getText } = this.props;
		const { locationEnabled, location, tagFriends, caption, mediaObjects } = this.state;

		return (
			<WithModalForAddFriends getText={getText} marginBottom={marginBottom}>
				{({ showAddFriendsModal, addedFriends }) => {
					return (
						<PhotoScreenView
							avatar={currentUser.avatar}
							mediaObjects={mediaObjects.map((mediaObject) => mediaObject.path)}
							taggedFriends={addedFriends}
							locationEnabled={locationEnabled}
							location={location}
							tagFriends={tagFriends}
							caption={caption}
							onShowTagFriends={showAddFriendsModal}
							onTagFriendsToggle={this.onTagFriendsToggleHandler}
							onLocationTextUpdate={this.onLocationTextUpdate}
							onLocationToggle={this.onLocationToggle}
							onChangeText={this.onChangeTextHandler}
							onAddMedia={this.onAddMediaHandler}
							onCreatePost={this.onCreatePostHandler}
							onClose={this.onCloseHandler}
							getText={getText}
						/>
					);
				}}
			</WithModalForAddFriends>
		);
	}

	private onTagFriendsToggleHandler = () => {
		this.setState({
			tagFriends: !this.state.tagFriends,
		});
	};

	private onLocationTextUpdate = (value: string) => {
		this.setState({
			location: value,
		});
	};

	private onLocationToggle = () => {
		this.setState({
			locationEnabled: !this.state.locationEnabled,
		});
	};

	private onChangeTextHandler = (value: string) => {
		this.setState({
			caption: value,
		});
	};

	private onAddMediaHandler = () => {
		const { showOptionsMenu, getText } = this.props;
		const menuItems = [
			{
				label: getText('new.wall.post.screen.menu.gallery'),
				icon: 'md-photos',
				actionHandler: () => this.onSelectOption(IMAGE_PICKER_TYPES.Gallery),
			},
			{
				label: getText('new.wall.post.screen.menu.photo'),
				icon: 'md-camera',
				actionHandler: () => this.onSelectOption(IMAGE_PICKER_TYPES.Camera),
			},
		];
		showOptionsMenu(menuItems);
	};

	private onSelectOption = async (source: IMAGE_PICKER_TYPES) => {
		let selectedMediaObjects: IPickerImageMultiple = [];
		if (source === IMAGE_PICKER_TYPES.Gallery) {
			selectedMediaObjects = await getGalleryMediaObjectMultiple();
		} else if (source === IMAGE_PICKER_TYPES.Camera) {
			selectedMediaObjects = await getCameraMediaObjectMultiple();
		}
		if (selectedMediaObjects.length > 0) {
			const optimizedMediaObjects = await Promise.all(
				selectedMediaObjects.map(async (mObject) => getOptimizedMediaObject(mObject)),
			);

			this.setState({
				mediaObjects: [...this.state.mediaObjects, ...optimizedMediaObjects],
			});
		}
	};

	private onCreatePostHandler = async () => {
		const { mediaObjects, caption } = this.state;
		const { currentUser, createPost, setGlobal } = this.props;

		await setGlobal({
			skeletonPost: {
				postId: uuid(),
				postText: caption,
				location: '',
				taggedFriends: undefined,
				timestamp: new Date(Date.now()),
				owner: {
					userId: currentUser.userId,
					fullName: currentUser.fullName,
					avatar: currentUser.avatar,
				},
				numberOfSuperLikes: 0,
				numberOfComments: 0,
				numberOfWalletCoins: 0,
				likedByCurrentUser: false,
				removable: false,
				media: mediaObjects,
				likes: [],
				topComments: [],
				loading: false,
				currentUserAvatar: currentUser.avatar,
				suggested: undefined,
				likeFailed: false,
				skeleton: true,
			},
		});

		createPost({
			text: caption,
			media: mediaObjects,
		});
		this.onCloseHandler();
	};

	private onCloseHandler = () => {
		Keyboard.dismiss();
		this.props.navigation.goBack(null);
	};
}

export const PhotoScreen = (navProps: INavigationProps) => (
	<WithPhoto>{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}</WithPhoto>
);
