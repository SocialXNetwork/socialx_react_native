import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { View } from 'react-native';
import { DataProvider } from 'recyclerlistview';

import { ProfilePhotoGrid } from '../../../../src/components';
import { getTextMock } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

class GithubUsersPhotoGrid extends React.Component<
	any,
	{ gridMediaProvider: DataProvider }
> {
	public state = {
		gridMediaProvider: new DataProvider((row1: any, row2: any) => {
			return row1.index !== row2.index;
		}),
	};

	private lastLoadedPhotoIndex = 0;

	public render() {
		return (
			<View style={{ flex: 1, width: '100%' }}>
				<ProfilePhotoGrid
					loadMorePhotosHandler={this.loadMorePhotosHandler}
					gridMediaProvider={this.state.gridMediaProvider}
					onViewMediaFullScreen={action('onViewMediaFullScreen')}
					header={{
						element: <View style={{ width: 1, height: 1 }} />,
						height: 1,
					}}
					disabled={false}
					getText={getTextMock}
				/>
			</View>
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

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('ProfilePhotoGrid', () => <GithubUsersPhotoGrid />);
