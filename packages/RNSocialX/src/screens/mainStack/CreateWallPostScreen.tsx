/**
 * old screen -> screens/NewWallPostScreen/index.tsx
 * TODO list:
 * 1. (Later) Consider using Formik and get rid of state in here
 */

import {ActionSheet} from 'native-base';
import * as React from 'react';
import {Alert} from 'react-native';

import {
	IWithCreateWallPostEnhancedActions,
	IWithCreateWallPostEnhancedData,
	WithCreateWallPost,
} from '../../enhancers/screens';
import {INavigationProps, WallPostPhotoOptimized} from '../../types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	PickerImageMultiple,
} from '../../utilities';
import {CreateWallPostScreenView} from './CreateWallPostScreen.view';

type ICreateWallPostScreenProps = INavigationProps &
	IWithCreateWallPostEnhancedData &
	IWithCreateWallPostEnhancedActions;

interface ICreateWallPostScreenState {
	mediaObjects: WallPostPhotoOptimized[];
	shareText: string;
}

class Screen extends React.Component<ICreateWallPostScreenProps, ICreateWallPostScreenState> {
	public state = {
		mediaObjects: [],
		shareText: '',
	};

	public render() {
		const {getText, marginBottom, currentUserAvatarURL} = this.props;
		const {shareText, mediaObjects} = this.state;
		return (
			<CreateWallPostScreenView
				avatarImage={currentUserAvatarURL}
				shareText={shareText}
				mediaObjects={mediaObjects.map((mediaObject: WallPostPhotoOptimized) => mediaObject.path)}
				onShareTextUpdate={this.onShareTextUpdateHandler}
				onAddMedia={this.onAddMediaHandler}
				onPostSend={this.onSendPostHandler}
				getText={getText}
				marginBottom={marginBottom}
				onClose={this.onCloseHandler}
			/>
		);
	}

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

	private onSendPostHandler = () => {
		const {mediaObjects, shareText} = this.state;
		const {createPost, getText} = this.props;

		if (mediaObjects.length < 1 && !shareText) {
			Alert.alert(
				getText('new.wall.post.screen.post.not.allowed.title'),
				getText('new.wall.post.screen.post.not.allowed.message'),
			);
		} else {
			createPost({
				mediaObjects,
				text: shareText,
			});
		}
	};

	private onCloseHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const CreateWallPostScreen = (navProps: INavigationProps) => (
	<WithCreateWallPost>{({data, actions}) => <Screen {...navProps} {...data} {...actions} />}</WithCreateWallPost>
);
