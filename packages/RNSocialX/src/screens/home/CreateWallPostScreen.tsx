import * as React from 'react';
import { Keyboard } from 'react-native';
import uuid from 'uuid/v4';

import {
	IWithCreateWallPostEnhancedActions,
	IWithCreateWallPostEnhancedData,
	WithCreateWallPost,
} from '../../enhancers/screens';
import { IMAGE_PICKER_TYPES } from '../../environment/consts';
import { INavigationProps, IOptimizedMedia } from '../../types';
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
	media: IOptimizedMedia[];
	caption: string;
}

class Screen extends React.Component<ICreateWallPostScreenProps, ICreateWallPostScreenState> {
	public state = {
		media: [],
		caption: '',
	};

	public render() {
		const { getText, currentUser } = this.props;
		const { caption, media } = this.state;

		return (
			<CreateWallPostScreenView
				avatar={currentUser.avatar}
				caption={caption}
				media={media.map((obj: IOptimizedMedia) => obj.path)}
				onChangeText={this.onChangeTextHandler}
				onAddMedia={this.onAddMediaHandler}
				onCreatePost={this.onCreatePostHandler}
				onClose={this.onCloseHandler}
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

export const CreateWallPostScreen = (props: INavigationProps) => (
	<WithCreateWallPost>
		{({ data, actions }) => <Screen {...props} {...data} {...actions} />}
	</WithCreateWallPost>
);
