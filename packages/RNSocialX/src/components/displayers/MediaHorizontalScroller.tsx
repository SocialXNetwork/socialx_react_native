import * as React from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';

import { MediaObjectViewer } from '../';
import { Sizes } from '../../environment/theme';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface IMediaHorizontalScrollerProps {
	hashes?: string[];
	paths?: string[];
}

const scrollViewRef: React.RefObject<ScrollView> = React.createRef();

const onScrollContentSizeChange = () => {
	if (scrollViewRef.current) {
		scrollViewRef.current.scrollToEnd({ animated: true });
	}
};

export const MediaHorizontalScroller: React.SFC<IMediaHorizontalScrollerProps> = ({
	hashes,
	paths,
}) => (
	<ScrollView
		ref={scrollViewRef}
		contentContainerStyle={style.container}
		horizontal={true}
		alwaysBounceHorizontal={false}
		showsHorizontalScrollIndicator={false}
		onContentSizeChange={onScrollContentSizeChange}
	>
		{hashes &&
			hashes.map((hash) => (
				<MediaObjectViewer
					key={hash}
					hash={hash}
					style={[
						style.media,
						{ width: hashes.length > 1 ? SCREEN_WIDTH * 0.4 : SCREEN_WIDTH * 0.8 },
					]}
				/>
			))}
		{paths &&
			paths.map((path) => (
				<MediaObjectViewer
					key={path}
					path={path}
					style={[
						style.media,
						{ width: paths.length > 1 ? SCREEN_WIDTH * 0.4 : SCREEN_WIDTH * 0.8 },
					]}
				/>
			))}
	</ScrollView>
);

const style = StyleSheet.create({
	container: {
		minWidth: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	media: {
		height: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(3),
	},
});
