import * as React from 'react';
import { Alert, Keyboard } from 'react-native';
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
	mediaObjects: IWallPostPhotoOptimized[];
	shareText: string;
}

class Screen extends React.Component<ICreateWallPostScreenProps, ICreateWallPostScreenState> {
	public state = {
		mediaObjects: [],
		shareText: '',
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
		const { shareText, mediaObjects } = this.state;

		return (
			<CreateWallPostScreenView
				avatarImage={currentUser.avatarURL}
				shareText={shareText}
				mediaObjects={mediaObjects.map((mediaObject: IWallPostPhotoOptimized) => mediaObject.path)}
				onShareTextUpdate={this.onShareTextUpdateHandler}
				onAddMedia={this.onAddMediaHandler}
				onCreatePost={this.onCreatePostHandler}
				onClose={this.onCloseHandler}
				marginBottom={marginBottom}
				getText={getText}
			/>
		);
	}

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
				selectedMediaObjects.map(async (obj) => getOptimizedMediaObject(obj)),
			);

			this.setState({
				mediaObjects: optimizedMediaObjects,
			});
		}
	};

	private onCreatePostHandler = async () => {
		const { mediaObjects, shareText } = this.state;
		const { currentUser, createPost, setGlobal } = this.props;

		await setGlobal({
			skeletonPost: {
				postId: uuid(),
				postText: shareText,
				location: '',
				taggedFriends: undefined,
				timestamp: new Date(Date.now()),
				owner: {
					userId: currentUser.userId,
					fullName: currentUser.userName,
					avatarURL: currentUser.avatarURL,
				},
				currentUser,
				governanceVersion: false,
				numberOfSuperLikes: 0,
				numberOfComments: 0,
				numberOfWalletCoins: 0,
				likedByMe: false,
				canDelete: false,
				media: mediaObjects,
				likes: [],
				bestComments: [],
				listLoading: false,
				suggested: undefined,
				noInput: false,
				contentOffensive: false,
				likeError: false,
				displayDots: true,
				skeleton: true,
			},
		});

		Keyboard.dismiss();
		createPost({
			text: shareText,
			media: mediaObjects,
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
