import * as React from 'react';
import uuid from 'uuid/v4';

import {
	IWithNavigationHandlersEnhancedActions,
	WithNavigationHandlers,
} from '../../enhancers/logic/WithNavigationHandlers';
import {
	IWithPhotoEnhancedActions,
	IWithPhotoEnhancedData,
	WithPhoto,
} from '../../enhancers/screens';

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

type IPhotoScreenProps = INavigationProps &
	IWithPhotoEnhancedActions &
	IWithPhotoEnhancedData &
	IWithNavigationHandlersEnhancedActions;

interface IPhotoScreenState {
	locationEnabled: boolean;
	tagFriends: boolean;
	location: string;
	caption: string;
	media: IWallPostPhotoOptimized[];
}

class Screen extends React.Component<IPhotoScreenProps, IPhotoScreenState> {
	public state = {
		locationEnabled: false,
		tagFriends: false,
		location: '',
		caption: '',
		media: [...this.props.media],
	};

	public render() {
		const { currentUser, onGoBack, getText } = this.props;
		const { locationEnabled, location, tagFriends, caption, media } = this.state;

		return (
			<WithModalForAddFriends getText={getText}>
				{({ showAddFriendsModal, addedFriends }) => (
					<PhotoScreenView
						avatar={currentUser.avatar}
						media={media.map((m) => m.path)}
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
						onClose={onGoBack}
						getText={getText}
					/>
				)}
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
		const items = [
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

		showOptionsMenu(items);
	};

	private onSelectOption = async (source: IMAGE_PICKER_TYPES) => {
		let selectedmedia: IPickerImageMultiple = [];
		if (source === IMAGE_PICKER_TYPES.Gallery) {
			selectedmedia = await getGalleryMediaObjectMultiple();
		} else if (source === IMAGE_PICKER_TYPES.Camera) {
			selectedmedia = await getCameraMediaObjectMultiple();
		}
		if (selectedmedia.length > 0) {
			const optimizedmedia = await Promise.all(
				selectedmedia.map(async (mObject) => getOptimizedMediaObject(mObject)),
			);

			this.setState({
				media: [...this.state.media, ...optimizedmedia],
			});
		}
	};

	private onCreatePostHandler = async () => {
		const { media, caption } = this.state;
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
				media,
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
			media,
		});
		this.props.onGoBack();
	};
}

export const PhotoScreen = (props: INavigationProps) => (
	<WithNavigationHandlers navigation={props.navigation}>
		{(nav) => (
			<WithPhoto>
				{(photo) => <Screen {...props} {...photo.data} {...photo.actions} {...nav.actions} />}
			</WithPhoto>
		)}
	</WithNavigationHandlers>
);
