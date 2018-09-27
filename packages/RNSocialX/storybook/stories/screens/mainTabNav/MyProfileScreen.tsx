import { action } from '@storybook/addon-actions';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { DataProvider } from 'recyclerlistview';

import { getTextMock } from '../../../../src/mocks';
import { MyProfileScreenView } from '../../../../src/screens/mainTabNav/MyProfileScreen.view';

class MyProfileScreenViewStory extends React.Component {
	public state = {
		gridMediaProvider: new DataProvider((row1: any, row2: any) => {
			return row1.index !== row2.index;
		}),
	};

	private lastLoadedPhotoIndex = 0;

	public render() {
		const userAvatar =
			'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350';

		const refreshing = boolean('refreshing', false);
		const isLoading = boolean('isLoading', false);
		const hasPhotos = boolean('hasPhotos', true);
		const fullName = text('fullName', 'Alex Sirbu');
		const userName = text('userName', 'alexsirbu');
		const numberOfPhotos = number('numberOfPhotos', 2);
		const numberOfLikes = number('numberOfLikes', 65);
		const numberOfFriends = number('numberOfFriends', 78);
		const numberOfViews = number('numberOfViews', 100);

		const aboutMeText = text('aboutMeText', 'This is me.');

		return (
			<MyProfileScreenView
				avatarURL={userAvatar}
				fullName={fullName}
				userName={userName}
				numberOfPhotos={numberOfPhotos}
				numberOfLikes={numberOfLikes}
				numberOfFriends={numberOfFriends}
				numberOfViews={numberOfViews}
				getText={getTextMock}
				onViewProfilePhoto={action('onViewProfilePhoto')}
				aboutMeText={aboutMeText}
				refreshing={refreshing}
				gridMediaProvider={this.state.gridMediaProvider}
				loadMorePhotosHandler={this.loadMorePhotosHandler}
				onRefresh={action('onRefresh')}
				onViewMediaFullScreen={action('onViewMediaFullScreen')}
				onEditProfile={action('onEditProfile')}
				onSharePress={action('onSharePress')}
				onShowDotsModal={action('onShowDotsModal')}
				hasPhotos={hasPhotos}
				isLoading={isLoading}
			/>
		);
	}

	private loadMorePhotosHandler = () => {
		const { gridMediaProvider } = this.state;
		const headerElement = [{ index: '1da431da-fad41dasg5125' }];

		const loadedSize = gridMediaProvider.getSize();
		const loadedMedia =
			loadedSize === 0 ? headerElement : gridMediaProvider.getAllData();

		const newMedia = new Array(20).fill(0).map((val, index) => ({
			url:
				'https://avatars2.githubusercontent.com/u/' +
				(this.lastLoadedPhotoIndex + index),
			index: this.lastLoadedPhotoIndex + index,
		}));
		const allMedia = [...loadedMedia, ...newMedia];

		this.setState({
			gridMediaProvider: gridMediaProvider.cloneWithRows(allMedia),
		});
		this.lastLoadedPhotoIndex = allMedia.length - 1;
	};
}

storiesOf('Screens/mainTabNav', module)
	.addDecorator(withKnobs)
	.add('MyProfileScreen', () => <MyProfileScreenViewStory />);
