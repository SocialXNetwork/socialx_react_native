/**
 * old screen -> screens/NewWallPostScreen/index.tsx
 * TODO list:
 * 1. Props data: currentUser
 * 2. Props actions: createPost
 * 3. (Later) Consider using Formik and get rid of state in here
 */

import {ActionSheet} from 'native-base';
import * as React from 'react';
import {Alert, View} from 'react-native';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';

import {CloseButton} from '../../components';
import {IResizeProps, ITranslatedProps, WallPostPhotoOptimized} from '../../types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	PickerImageMultiple,
} from '../../utilities';
import {CreateWallPostScreenView} from './CreateWallPostScreen.view';

interface WallPostData {
	mediaObjects: WallPostPhotoOptimized[];
	text: string;
}

interface ICreateWallPostScreenProps extends ITranslatedProps, IResizeProps {
	navigation: NavigationScreenProp<any>;
	navigationOptions: NavigationScreenConfig<any>;
	currentUser: any;
	createPost: (wallPostData: WallPostData) => void;
}

interface ICreateWallPostScreenState {
	mediaObjects: WallPostPhotoOptimized[];
	shareText: string;
}

export class CreateWallPostScreen extends React.Component<ICreateWallPostScreenProps, ICreateWallPostScreenState> {
	private static navigationOptions = ({navigation, navigationOptions}: ICreateWallPostScreenProps) => ({
		title: navigationOptions.getText('new.wall.post.screen.title'),
		headerRight: <CloseButton onClose={() => navigation.goBack(null)} />,
		headerLeft: <View />,
	});

	public state = {
		mediaObjects: [],
		shareText: '',
	};

	public render() {
		const {getText, marginBottom, currentUser} = this.props;
		const {shareText, mediaObjects} = this.state;
		return (
			<CreateWallPostScreenView
				avatarImage={currentUser.avatarURL}
				shareText={shareText}
				mediaObjects={mediaObjects.map((mediaObject: WallPostPhotoOptimized) => mediaObject.path)}
				onShareTextUpdate={this.onShareTextUpdateHandler}
				onAddMedia={this.onAddMediaHandler}
				onPostSend={this.onSendPostHandler}
				getText={getText}
				marginBottom={marginBottom}
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
}
