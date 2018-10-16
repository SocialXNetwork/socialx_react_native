/**
 * old screen -> screens/NewWallPostScreen/index.tsx
 * TODO list:
 * 1. (Later) Consider using Formik and get rid of state in here
 */

import { ActionSheet } from 'native-base';
import * as React from 'react';
import { Alert } from 'react-native';

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
	creatingPost: boolean | null;
}

class Screen extends React.Component<
	ICreateWallPostScreenProps,
	ICreateWallPostScreenState
> {
	public static getDerivedStateFromProps(
		nextProps: ICreateWallPostScreenProps,
		currentState: ICreateWallPostScreenState,
	) {
		if (currentState.creatingPost === null && nextProps.creatingPost) {
			return {
				creatingPost: true,
			};
		}

		if (currentState.creatingPost && !nextProps.creatingPost) {
			nextProps.navigation.goBack();
			return {
				creatingPost: false,
			};
		}

		return null;
	}

	public state = {
		mediaObjects: [],
		shareText: '',
		creatingPost: null,
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
		const { getText } = this.props;
		ActionSheet.show(
			{
				options: [
					getText('new.wall.post.screen.menu.pick.from.gallery'),
					getText('new.wall.post.screen.menu.take.photo'),
					getText('button.cancel'),
				],
				cancelButtonIndex: 2,
				title: getText('new.wall.post.screen.menu.title'),
			},
			async (buttonIndex: number) => {
				let selectedMediaObjects: IPickerImageMultiple = [];
				if (buttonIndex === 0) {
					selectedMediaObjects = await getGalleryMediaObjectMultiple();
				} else if (buttonIndex === 1) {
					selectedMediaObjects = await getCameraMediaObjectMultiple();
				}
				if (selectedMediaObjects.length > 0) {
					const optimizedMediaObjects = await Promise.all(
						selectedMediaObjects.map(async (mObject) =>
							getOptimizedMediaObject(mObject),
						),
					);
					this.setState({
						mediaObjects: [
							...this.state.mediaObjects,
							...optimizedMediaObjects,
						],
					});
				}
			},
		);
	};

	private onCreatePostHandler = () => {
		const { mediaObjects, shareText, creatingPost } = this.state;
		const { createPost, getText } = this.props;

		if (mediaObjects.length < 1 && !shareText) {
			Alert.alert(
				getText('new.wall.post.screen.post.not.allowed.title'),
				getText('new.wall.post.screen.post.not.allowed.message'),
			);
		} else {
			if (creatingPost === null) {
				createPost({
					mediaObjects,
					text: shareText,
				});
			}
		}
	};

	private onCloseHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const CreateWallPostScreen = (navProps: INavigationProps) => (
	<WithCreateWallPost>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithCreateWallPost>
);
