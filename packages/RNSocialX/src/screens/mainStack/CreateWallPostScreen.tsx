/**
 * old screen -> screens/NewWallPostScreen/index.tsx
 * TODO list:
 * 1. (Later) Consider using Formik and get rid of state in here
 */

import * as React from 'react';
import { Alert, Keyboard } from 'react-native';

import {
	IWithCreateWallPostEnhancedActions,
	IWithCreateWallPostEnhancedData,
	WithCreateWallPost,
} from '../../enhancers/screens';
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

class Screen extends React.Component<
	ICreateWallPostScreenProps,
	ICreateWallPostScreenState
> {
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
		const { getText, marginBottom, currentUserAvatarURL } = this.props;
		const { shareText, mediaObjects } = this.state;
		return (
			<CreateWallPostScreenView
				avatarImage={currentUserAvatarURL}
				shareText={shareText}
				mediaObjects={mediaObjects.map(
					(mediaObject: IWallPostPhotoOptimized) => mediaObject.path,
				)}
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
				label: getText('new.wall.post.screen.menu.pick.from.gallery'),
				icon: 'md-photos',
				actionHandler: () => this.addToScrollerSelectedMediaObject('gallery'),
			},
			{
				label: getText('new.wall.post.screen.menu.take.photo'),
				icon: 'md-camera',
				actionHandler: () => this.addToScrollerSelectedMediaObject('photo'),
			},
		];
		showDotsMenuModal(menuItems);
	};

	private addToScrollerSelectedMediaObject = async (
		source: 'gallery' | 'photo',
	) => {
		let selectedMediaObjects: IPickerImageMultiple = [];
		if (source === 'gallery') {
			selectedMediaObjects = await getGalleryMediaObjectMultiple();
		} else if (source === 'photo') {
			selectedMediaObjects = await getCameraMediaObjectMultiple();
		}
		if (selectedMediaObjects.length > 0) {
			const optimizedMediaObjects = await Promise.all(
				selectedMediaObjects.map(async (mObject) =>
					getOptimizedMediaObject(mObject),
				),
			);
			this.setState({
				mediaObjects: [...this.state.mediaObjects, ...optimizedMediaObjects],
			});
		}
	};

	private onCreatePostHandler = async () => {
		const { mediaObjects, shareText } = this.state;
		const { createPost, getText } = this.props;

		if (mediaObjects.length < 1 && !shareText) {
			Alert.alert(
				getText('new.wall.post.screen.post.not.allowed.title'),
				getText('new.wall.post.screen.post.not.allowed.message'),
			);
		} else {
			Keyboard.dismiss();
			await createPost({
				mediaObjects,
				text: shareText,
			});
			this.onCloseHandler();
		}
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
