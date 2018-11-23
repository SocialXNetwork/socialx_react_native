import * as React from 'react';
import { Keyboard } from 'react-native';
import uuid from 'uuid/v4';

import {
	IWithCreateWallPostEnhancedActions,
	IWithCreateWallPostEnhancedData,
	WithCreateWallPost,
} from '../../enhancers/screens';
import { IMAGE_PICKER_TYPES } from '../../environment/consts';
import { INavigationProps, IWallPostPhotoOptimized } from '../../types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	IPickerImageMultiple,
} from '../../utilities';
import { CreateWallPostScreenView } from './CreateWallPostScreen.view';

type ICreateWallPostScreenProps = INavigationProps &
	IWithCreateWallPostEnhancedData &
	IWithCreateWallPostEnhancedActions;

interface ICreateWallPostScreenState {
	media: IWallPostPhotoOptimized[];
	caption: string;
}

class Screen extends React.Component<ICreateWallPostScreenProps, ICreateWallPostScreenState> {
	public state = {
		media: [],
		caption: '',
	};

	public componentDidMount() {
		const { setGlobal, getText } = this.props;

		setGlobal({
			activity: {
				title: getText('new.wall.post.screen.progress.message'),
			},
		});
	}

	public render() {
		const { getText, marginBottom, currentUser } = this.props;
		const { caption, media } = this.state;

		return (
			<CreateWallPostScreenView
				avatar={currentUser.avatar}
				caption={caption}
				media={media.map((mediaObject: IWallPostPhotoOptimized) => mediaObject.path)}
				onChangeText={this.onChangeTextHandler}
				onAddMedia={this.onAddMediaHandler}
				onCreatePost={this.onCreatePostHandler}
				onClose={this.onCloseHandler}
				marginBottom={marginBottom}
				getText={getText}
			/>
		);
	}

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
		let selectedmedia: IPickerImageMultiple = [];
		if (source === IMAGE_PICKER_TYPES.Gallery) {
			selectedmedia = await getGalleryMediaObjectMultiple();
		} else if (source === IMAGE_PICKER_TYPES.Camera) {
			selectedmedia = await getCameraMediaObjectMultiple();
		}

		if (selectedmedia.length > 0) {
			const optimizedmedia = await Promise.all(
				selectedmedia.map(async (obj) => getOptimizedMediaObject(obj)),
			);

			this.setState({
				media: optimizedmedia,
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
		this.onCloseHandler();
	};

	private onCloseHandler = () => {
		Keyboard.dismiss();
		this.props.navigation.goBack(null);
	};
}

export const CreateWallPostScreen = (navProps: INavigationProps) => (
	<WithCreateWallPost>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithCreateWallPost>
);
