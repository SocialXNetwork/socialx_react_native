import { action } from '@storybook/addon-actions';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { DataProvider } from 'recyclerlistview';

import { getTextMock } from '../../../../src/mocks';
import { MyProfileScreenView } from '../../../../src/screens/mainTabNav/MyProfileScreen.view';

class MyProfileScreenViewStory extends React.Component {
	public state = {
		dataProvider: new DataProvider((row1: any, row2: any) => {
			return row1.index !== row2.index;
		}),
	};

	private lastLoadedPhotoIndex = 0;

	public render() {
		const userAvatar =
			'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350';

		const hasPhotos = boolean('hasPhotos', true);
		const fullName = text('fullName', 'Alex Sirbu');
		const userName = text('userName', 'alexsirbu');
		const numberOfPhotos = number('numberOfPhotos', 7850);
		const numberOfLikes = number('numberOfLikes', 500000);
		const numberOfFriends = number('numberOfFriends', 25990);
		const numberOfComments = number('numberOfComments', 152087);

		const description = text(
			'description',
			'This is me fjkasfbasdifbasbdiasbdkabdksabdkabdfkl abflidblifbjlEbdabjILDBNAEDNASDALSNDLANLSDLADNKASDKBAKSDBAKBFK`FLSABdbla.bsdasbj.',
		);

		return (
			<MyProfileScreenView
				avatar={userAvatar}
				fullName={fullName}
				userName={userName}
				numberOfPhotos={numberOfPhotos}
				numberOfLikes={numberOfLikes}
				numberOfFriends={numberOfFriends}
				numberOfComments={numberOfComments}
				getText={getTextMock}
				description={description}
				dataProvider={this.state.dataProvider}
				hasPhotos={hasPhotos}
				onLoadMorePhotos={this.onLoadMorePhotosHandler}
				onProfilePhotoPress={action('onProfilePhotoPress')}
				onViewMediaFullScreen={action('onViewMediaFullScreen')}
				onEditProfile={action('onEditProfile')}
				onSharePress={action('onSharePress')}
				onShowDotsModal={action('onShowDotsModal')}
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
