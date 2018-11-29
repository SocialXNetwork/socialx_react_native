import * as React from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';

import { MediaObjectViewer } from '../';
import { Sizes } from '../../environment/theme';
import { ITranslatedProps } from '../../types';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface IMediaHorizontalScrollerProps extends ITranslatedProps {
	hashes: string[];
}

const scrollViewRef: React.RefObject<ScrollView> = React.createRef();

const onScrollContentSizeChange = () => {
	if (scrollViewRef.current) {
		scrollViewRef.current.scrollToEnd({ animated: true });
	}
};

export const MediaHorizontalScroller: React.SFC<IMediaHorizontalScrollerProps> = ({
	hashes,
	getText,
}) => {
	return (
		<ScrollView
			ref={scrollViewRef}
			contentContainerStyle={style.container}
			horizontal={true}
			alwaysBounceHorizontal={false}
			showsHorizontalScrollIndicator={false}
			onContentSizeChange={onScrollContentSizeChange}
		>
			{hashes.map((hash) => (
				<MediaObjectViewer
					key={hash}
					hash={hash}
					thumbOnly={true}
					style={[
						style.media,
						{
							width: hashes.length > 1 ? SCREEN_WIDTH * 0.4 : SCREEN_WIDTH * 0.8,
						},
					]}
					getText={getText}
				/>
			))}
		</ScrollView>
	);
};

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
