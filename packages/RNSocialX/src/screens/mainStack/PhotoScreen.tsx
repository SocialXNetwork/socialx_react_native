/**
 * TODO list:
 * 1. Props data: currentUser, loading
 * 2. Props actions: createPost
 * 3. Refactor props.navigation.state.params.mediaObjects, that is sent from NavigationTabBar component with navigate action
 * 4. @Serkan: check pattern for this.addedFriends
 * 5. (Later) Get rid of navigation workaround for passing onSendPress
 * 6. (Later) Consider using Formik to manage all user input data.
 */

import {ActionSheet} from 'native-base';
import * as React from 'react';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';

import {CloseButton, ScreenHeaderButton, WithModalForAddFriends} from '../../components';
import {FriendsSearchResult, IResizeProps, ITranslatedProps, WallPostPhotoOptimized} from '../../types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	PickerImageMultiple,
} from '../../utilities';
import {PhotoScreenView} from './PhotoScreen.view';

interface WallPostPhotoData {
	mediaObjects: WallPostPhotoOptimized[];
	title?: string;
	location?: string;
	taggedFriends?: FriendsSearchResult[];
}

interface IPhotoScreenNavParams {
	params: {
		mediaObjects: WallPostPhotoOptimized[];
		onSendPress: () => void;
	};
}

interface IPhotoScreenProps extends ITranslatedProps, IResizeProps {
	navigation: NavigationScreenProp<IPhotoScreenNavParams>;
	navigationOptions: NavigationScreenConfig<any>;
	currentUser: any;
	loading: boolean;
	createPost: (wallPostData: WallPostPhotoData) => void;
}

interface IPhotoScreenState {
	locationEnabled: boolean;
	tagFriends: boolean;
	location: string;
	shareText: string;
	mediaObjects: WallPostPhotoOptimized[];
}

export class PhotoScreen extends React.Component<IPhotoScreenProps, IPhotoScreenState> {
	private static navigationOptions = ({navigationOptions, navigation}: IPhotoScreenProps) => ({
		title: navigationOptions.getText('photo.screen.title'),
		headerLeft: <CloseButton onClose={() => navigation.goBack(null)} />,
		// @ts-ignore
		headerRight: <ScreenHeaderButton iconName={'md-checkmark'} onPress={navigation.state.params.onSendPress} />,
	});

	private addedFriends: FriendsSearchResult[] = [];

	public componentDidMount() {
		this.props.navigation.setParams({onSendPress: this.sendPostHandler});
	}

	public render() {
		const {currentUser, loading, marginBottom, getText} = this.props;
		const {locationEnabled, location, tagFriends, shareText, mediaObjects} = this.state;

		return (
			<WithModalForAddFriends getText={getText} marginBottom={marginBottom}>
				{({showAddFriendsModal, addedFriends}) => {
					this.addedFriends = addedFriends;
					return (
						<PhotoScreenView
							isLoading={loading}
							showTagFriendsModal={showAddFriendsModal}
							avatarURL={currentUser.avatarURL}
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

		const wallPostData: WallPostPhotoData = {
			mediaObjects,
			location: locationEnabled && location !== '' ? location : undefined,
			taggedFriends: tagFriends && this.addedFriends.length > 0 ? this.addedFriends : undefined,
			title: shareText ? shareText : undefined,
		};

		createPost(wallPostData);
	};
}
