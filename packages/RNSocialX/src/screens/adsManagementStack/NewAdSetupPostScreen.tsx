import * as React from 'react';

import {
	IAdSetupPostData,
	IOptionsMenuProps,
	ITranslatedProps,
	IWallPostPhotoOptimized,
} from '../../types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	IPickerImageMultiple,
} from '../../utilities';
import { NewAdSetupPostScreenView } from './NewAdSetupPostScreen.view';

interface INewAdSetupPostScreenProps extends ITranslatedProps, IOptionsMenuProps {
	updateAdSetPost: (data: IAdSetupPostData) => void;
	adSetupPostFormik: React.RefObject<any>;
}

interface INewAdSetupPostScreenState {
	media: IWallPostPhotoOptimized[];
}

export class NewAdSetupPostScreen extends React.Component<
	INewAdSetupPostScreenProps,
	INewAdSetupPostScreenState
> {
	public state = {
		media: [],
	};

	public render() {
		const { getText, adSetupPostFormik } = this.props;
		const { media } = this.state;
		return (
			<NewAdSetupPostScreenView
				adSetupPostFormik={adSetupPostFormik}
				media={media.map((mediaObject: IWallPostPhotoOptimized) => mediaObject.path)}
				getText={getText}
				onAddMedia={this.onAddMediaHandler}
				updateAdSetPost={this.updateAdSetPostHandler}
			/>
		);
	}

	private updateAdSetPostHandler = (headline: string, description: string) => {
		const { updateAdSetPost } = this.props;
		const { media } = this.state;
		updateAdSetPost({ headline, description, media });
	};

	private onAddMediaHandler = () => {
		const { showOptionsMenu, getText } = this.props;
		const menuItems = [
			{
				label: getText('new.wall.post.screen.menu.gallery'),
				icon: 'md-photos',
				actionHandler: () => this.addToScrollerSelectedMediaObject('gallery'),
			},
			{
				label: getText('new.wall.post.screen.menu.photo'),
				icon: 'md-camera',
				actionHandler: () => this.addToScrollerSelectedMediaObject('photo'),
			},
		];
		showOptionsMenu(menuItems);
	};

	private addToScrollerSelectedMediaObject = async (source: 'gallery' | 'photo') => {
		let selectedmedia: IPickerImageMultiple = [];
		if (source === 'gallery') {
			selectedmedia = await getGalleryMediaObjectMultiple();
		} else if (source === 'photo') {
			selectedmedia = await getCameraMediaObjectMultiple();
		}
		if (selectedmedia.length > 0) {
			const optimizedmedia = await Promise.all(
				selectedmedia.map(async (mObject) => getOptimizedMediaObject(mObject)),
			);
			this.setState({
				media: [...this.state.media, ...optimizedmedia],
			});
		}
	};
}
