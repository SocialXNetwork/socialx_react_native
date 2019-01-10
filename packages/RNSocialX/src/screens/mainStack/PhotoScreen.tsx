import * as React from 'react';
import { Keyboard } from 'react-native';
import uuid from 'uuid/v4';

import { WithModalForAddFriends } from '../../components';
import { IMAGE_PICKER_TYPES } from '../../environment/consts';
import { INavigationProps, IOptimizedMedia } from '../../types';
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
	media: IOptimizedMedia[];
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
		const { currentUser, getText } = this.props;
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
						onClose={this.onCloseHandler}
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
		let selectedMedia: IPickerImageMultiple = [];
		if (source === IMAGE_PICKER_TYPES.Gallery) {
			selectedMedia = await getGalleryMediaObjectMultiple();
		} else if (source === IMAGE_PICKER_TYPES.Camera) {
			selectedMedia = await getCameraMediaObjectMultiple();
		}

		if (selectedMedia.length > 0) {
			const media = await Promise.all(
				selectedMedia.map(async (obj) => getOptimizedMediaObject(obj)),
			);

			this.setState({
				media,
			});

			console.log(this.state.media);
		}
	};

	private onCreatePostHandler = () => {
		const { media, caption } = this.state;
		const { currentUser, createPost } = this.props;

		createPost({
			postId: uuid(),
			postText: caption,
			owner: {
				alias: currentUser.alias,
				pub: '',
			},
			timestamp: Number(new Date(Date.now())),
			likes: {
				ids: [],
				byId: {},
			},
			comments: [],
			media,
			privatePost: false,
			creating: true,
		});
		this.onCloseHandler();
	};

	private onCloseHandler = () => {
		Keyboard.dismiss();
		this.props.navigation.goBack(null);
	};
}

export const PhotoScreen = (props: INavigationProps) => (
	<WithPhoto>{({ data, actions }) => <Screen {...props} {...data} {...actions} />}</WithPhoto>
);
