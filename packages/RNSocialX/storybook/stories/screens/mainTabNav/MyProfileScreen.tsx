import { action } from '@storybook/addon-actions';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { Animated } from 'react-native';
import { DataProvider } from 'recyclerlistview';

import { PROFILE_TAB_ICON_TYPES } from '../../../../src/environment/consts';
import { currentUser, getTextMock } from '../../../../src/mocks';
import { MyProfileScreenView } from '../../../../src/screens/mainTabNav/MyProfileScreen.view';

class MyProfileScreenViewStory extends React.Component {
	public state = {
		dataProvider: new DataProvider((row1: any, row2: any) => {
			return row1.index !== row2.index;
		}),
	};

	private lastLoadedPhotoIndex = 0;

	public render() {
		const refreshing = boolean('refreshing', true);
		const loadingPosts = boolean('loadingPosts', true);
		const containerHeight = number('containerHeight', 0);

		return (
			<MyProfileScreenView
				currentUser={currentUser}
				refreshing={refreshing}
				loadingPosts={loadingPosts}
				listTranslate={new Animated.Value(0)}
				gridTranslate={new Animated.Value(0)}
				activeTab={PROFILE_TAB_ICON_TYPES.LIST}
				containerHeight={containerHeight}
				errors={[]}
				dataProvider={this.state.dataProvider}
				onLoadMorePhotos={this.onLoadMorePhotosHandler}
				onRefresh={action('onRefresh')}
				onLayoutChange={action('onLayoutChange')}
				onProfilePhotoPress={action('onProfilePhotoPress')}
				onViewMediaFullScreen={action('onViewMediaFullScreen')}
				onIconPress={action('onIconPress')}
				onEditProfile={action('onEditProfile')}
				onSharePress={action('onSharePress')}
				onShowOptionsMenu={action('onShowOptionsMenu')}
				// @ts-ignore
				navigation={null}
				getText={getTextMock}
			/>
		);
	}

	private onLoadMorePhotosHandler = () => {
		const { dataProvider } = this.state;
		const headerElement = [{ index: '1da431da-fad41dasg5125' }];

		const loadedSize = dataProvider.getSize();
		const loadedMedia = loadedSize === 0 ? headerElement : dataProvider.getAllData();

		const newMedia = new Array(20).fill(0).map((val, index) => ({
			url: 'https://avatars2.githubusercontent.com/u/' + (this.lastLoadedPhotoIndex + index),
			index: this.lastLoadedPhotoIndex + index,
		}));
		const allMedia = [...loadedMedia, ...newMedia];

		this.setState({
			dataProvider: dataProvider.cloneWithRows(allMedia),
		});
		this.lastLoadedPhotoIndex = allMedia.length - 1;
	};
}

storiesOf('Screens/mainTabNav', module)
	.addDecorator(withKnobs)
	.add('MyProfileScreen', () => <MyProfileScreenViewStory />);
