import * as React from 'react';
import {Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet} from 'react-native';

import {Sizes} from '../../environment/theme';

interface IAvatarImageProps {
	image: ImageSourcePropType;
	style: StyleProp<ImageStyle>;
}

export const AvatarImage: React.SFC<IAvatarImageProps> = ({image, style = styles.avatarImage}) => {
	return <Image source={image} resizeMode={'cover'} style={style} />;
};

const AVATAR_SIZE = Sizes.smartHorizontalScale(90);

const styles = StyleSheet.create({
	avatarImage: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
});
