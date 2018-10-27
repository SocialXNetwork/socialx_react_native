import * as React from 'react';

import {
	IWithNewAdSetupPostEnhancedActions,
	IWithNewAdSetupPostEnhancedData,
	WithNewAdSetupPost,
} from '../../enhancers/screens';
import { INavigationProps, IWallPostPhotoOptimized } from '../../types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	IPickerImageMultiple,
} from '../../utilities';
import { NewAdSetupPostScreenView } from './NewAdSetupPostScreen.view';

type INewAdSetupPostScreenProps = IWithNewAdSetupPostEnhancedData &
	IWithNewAdSetupPostEnhancedActions &
	INavigationProps;

interface INewAdSetupPostScreenState {
	mediaObjects: IWallPostPhotoOptimized[];
}

export class Screen extends React.Component<
	INewAdSetupPostScreenProps,
	INewAdSetupPostScreenState
> {
	public state = {
		mediaObjects: [],
	};

	public render() {
		const { getText } = this.props;
		const { mediaObjects } = this.state;
		return (
			<NewAdSetupPostScreenView
				mediaObjects={mediaObjects.map((mediaObject: IWallPostPhotoOptimized) => mediaObject.path)}
				getText={getText}
				onGoBack={this.onGoBackHandler}
				onAddMedia={this.onAddMediaHandler}
				onNavigateToAudienceSection={this.onNavigateToAudienceSectionHandler}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
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

	private addToScrollerSelectedMediaObject = async (source: 'gallery' | 'photo') => {
		let selectedMediaObjects: IPickerImageMultiple = [];
		if (source === 'gallery') {
			selectedMediaObjects = await getGalleryMediaObjectMultiple();
		} else if (source === 'photo') {
			selectedMediaObjects = await getCameraMediaObjectMultiple();
		}
		if (selectedMediaObjects.length > 0) {
			const optimizedMediaObjects = await Promise.all(
				selectedMediaObjects.map(async (mObject) => getOptimizedMediaObject(mObject)),
			);
			this.setState({
				mediaObjects: [...this.state.mediaObjects, ...optimizedMediaObjects],
			});
		}
	};

	private onNavigateToAudienceSectionHandler = (headline: string, description: string) => {
		console.log('TODO: navigate to audience screen', headline, description);
		// this.props.navigation.navigate('');
	};
}

export const NewAdSetupPostScreen = (navProps: INavigationProps) => (
	<WithNewAdSetupPost>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithNewAdSetupPost>
);
