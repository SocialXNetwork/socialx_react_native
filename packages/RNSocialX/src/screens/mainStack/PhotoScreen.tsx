/**
 * old screen -> screens/PhotoScreen/index.tsx
 * TODO list:
 * 1. Refactor props.navigation.state.params.mediaObjects, that is sent from NavigationTabBar component with navigate action
 * 2. @Serkan: check pattern for this.addedFriends
 * 3. (Later) Get rid of navigation workaround for passing onSendPress
 * 4. (Later) Consider using Formik to manage all user input data.
 */

import {ActionSheet} from 'native-base';
import * as React from 'react';

import {WithModalForAddFriends} from '../../components';
import {IWithPhotoEnhancedActions, IWithPhotoEnhancedData, WithPhoto} from '../../enhancers/screens';
import {FriendsSearchResult, INavigationProps, WallPostPhotoOptimized} from '../../types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	PickerImageMultiple,
} from '../../utilities';
import {PhotoScreenView} from './PhotoScreen.view';

interface IPhotoScreenNavParams {
	params: {
		mediaObjects: WallPostPhotoOptimized[];
	};
}

type IPhotoScreenProps = INavigationProps<IPhotoScreenNavParams> & IWithPhotoEnhancedActions & IWithPhotoEnhancedData;

interface IPhotoScreenState {
	locationEnabled: boolean;
	tagFriends: boolean;
	location: string;
	shareText: string;
	mediaObjects: WallPostPhotoOptimized[];
}

class Screen extends React.Component<IPhotoScreenProps, IPhotoScreenState> {
	private addedFriends: FriendsSearchResult[] = [];

	public render() {
		const {currentUserAvatarURL, loading, marginBottom, navigation, getText} = this.props;
		const {locationEnabled, location, tagFriends, shareText, mediaObjects} = this.state;

		return (
			<WithModalForAddFriends getText={getText} marginBottom={marginBottom}>
				{({showAddFriendsModal, addedFriends}) => {
					this.addedFriends = addedFriends;
					return (
						<PhotoScreenView
							isLoading={loading}
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
		const {getText} = this.props;
		ActionSheet.show(
			{
				options: [
					getText('new.wall.post.screen.menu.pick.from.gallery'),
					getText('new.wall.post.screen.menu.take.photo'),
					getText('button.CANCEL'),
				],
				cancelButtonIndex: 2,
				title: getText('new.wall.post.screen.menu.title'),
			},
			async (buttonIndex: number) => {
				let selectedMediaObjects: PickerImageMultiple = [];
				if (buttonIndex === 0) {
					selectedMediaObjects = await getGalleryMediaObjectMultiple();
				} else if (buttonIndex === 1) {
					selectedMediaObjects = await getCameraMediaObjectMultiple();
				}
				if (selectedMediaObjects.length > 0) {
					const optimizedMediaObjects = await Promise.all(
						selectedMediaObjects.map(async (mObject) => getOptimizedMediaObject(mObject)),
					);
					this.setState({mediaObjects: [...this.state.mediaObjects, ...optimizedMediaObjects]});
				}
			},
		);
	};

	private sendPostHandler = () => {
		const {mediaObjects, tagFriends, shareText, locationEnabled, location} = this.state;
		const {createPost} = this.props;

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

export const PhotoScreen = (navProps: INavigationProps<IPhotoScreenNavParams>) => (
	<WithPhoto>{({data, actions}) => <Screen {...navProps} {...data} {...actions} />}</WithPhoto>
);
