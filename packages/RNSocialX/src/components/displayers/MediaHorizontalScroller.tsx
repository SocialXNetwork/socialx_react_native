import * as React from 'react';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';

import {MediaObjectViewer} from '../';
import {Sizes} from '../../environment/theme';
import {ITranslatedProps} from '../../types';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface IMediaHorizontalScrollerProps extends ITranslatedProps {
	mediaURIs: string[];
}

const scrollViewRef: React.RefObject<ScrollView> = React.createRef();

const onScrollContentSizeChange = () => {
	if (scrollViewRef.current) {
		scrollViewRef.current.scrollToEnd({animated: true});
	}
};

export const MediaHorizontalScroller: React.SFC<IMediaHorizontalScrollerProps> = ({mediaURIs, getText}) => {
	return (
		<ScrollView
			ref={scrollViewRef}
			contentContainerStyle={style.scrollContent}
			horizontal={true}
			alwaysBounceHorizontal={false}
			showsHorizontalScrollIndicator={false}
			onContentSizeChange={onScrollContentSizeChange}
		>
			{mediaURIs.map((mediaURI) => (
				// @ts-ignore
				<MediaObjectViewer
					key={mediaURI}
					uri={mediaURI}
					thumbOnly={true}
					style={[style.mediaObject, {width: mediaURIs.length > 1 ? SCREEN_WIDTH * 0.4 : SCREEN_WIDTH * 0.8}]}
					getText={getText}
				/>
			))}
		</ScrollView>
	);
};

const style: any = StyleSheet.create({
	scrollContent: {
		minWidth: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	mediaObject: {
		height: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(3),
	},
});
