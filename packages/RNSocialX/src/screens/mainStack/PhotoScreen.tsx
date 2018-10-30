import * as React from 'react';

import { WithModalForAddFriends } from '../../components';
import {
	IWithPhotoEnhancedActions,
	IWithPhotoEnhancedData,
	WithPhoto,
} from '../../enhancers/screens';
import { IMAGE_PICKER_TYPES } from '../../environment/consts';
import { IFriendsSearchResult, INavigationProps, IWallPostPhotoOptimized } from '../../types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	IPickerImageMultiple,
} from '../../utilities';
import { PhotoScreenView } from './PhotoScreen.view';

type IPhotoScreenProps = INavigationProps & IWithPhotoEnhancedActions & IWithPhotoEnhancedData;

interface IPhotoScreenState {
	locationEnabled: boolean;
	tagFriends: boolean;
	location: string;
	shareText: string;
	mediaObjects: IWallPostPhotoOptimized[];
}

class Screen extends React.Component<IPhotoScreenProps, IPhotoScreenState> {
	public state = {
		locationEnabled: false,
		tagFriends: false,
		location: '',
		shareText: '',
		mediaObjects: [...this.props.mediaObjects],
	};

	private addedFriends: IFriendsSearchResult[] = [];

	public render() {
		const { currentUserAvatarURL, marginBottom, getText } = this.props;
		const { locationEnabled, location, tagFriends, shareText, mediaObjects } = this.state;

		return (
			<WithModalForAddFriends getText={getText} marginBottom={marginBottom}>
				{({ showAddFriendsModal, addedFriends }) => {
					this.addedFriends = addedFriends;
					return (
						<PhotoScreenView
							showTagFriendsModal={showAddFriendsModal}
							avatarURL={currentUserAvatarURL}
							mediaObjects={mediaObjects.map((mediaObject) => mediaObject.path)}
							taggedFriends={addedFriends}
							locationEnabled={locationEnabled}
							location={location}
							tagFriends={tagFriends}
							onTagFriendsToggle={this.onTagFriendsToggleHandler}
							onLocationTextUpdate={this.onLocationTextUpdate}
							onLocationToggle={this.onLocationToggle}
							onShareTextUpdate={this.onShareTextUpdateHandler}
							shareText={shareText}
							onAddMedia={this.onAddMediaHandler}
							sendPost={this.sendPostHandler}
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

	private onShareTextUpdateHandler = (value: string) => {
		this.setState({
			shareText: value,
		});
	};

	private onAddMediaHandler = () => {
		const { showDotsMenuModal, getText } = this.props;
		const menuItems = [
			{
				label: getText('new.wall.post.screen.menu.gallery'),
				icon: 'md-photos',
				actionHandler: () => this.addToScrollerSelectedMediaObject(IMAGE_PICKER_TYPES.Gallery),
			},
			{
				label: getText('new.wall.post.screen.menu.photo'),
				icon: 'md-camera',
				actionHandler: () => this.addToScrollerSelectedMediaObject(IMAGE_PICKER_TYPES.Camera),
			},
		];
		showDotsMenuModal(menuItems);
	};

	private addToScrollerSelectedMediaObject = async (source: IMAGE_PICKER_TYPES) => {
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

	private sendPostHandler = () => {
		const { mediaObjects, tagFriends, shareText, locationEnabled, location } = this.state;
		const { createPost } = this.props;

		createPost({
			mediaObjects,
			location: locationEnabled && location !== '' ? location : undefined,
			taggedFriends: tagFriends && this.addedFriends.length > 0 ? this.addedFriends : undefined,
			title: shareText ? shareText : undefined,
		});
	};

	private onCloseHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const PhotoScreen = (navProps: INavigationProps) => (
	<WithPhoto>{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}</WithPhoto>
);
