import * as React from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet} from 'react-native';

import {Sizes} from '../../environment/theme';

interface IAvatarImageProps {
	image: number;
	style?: StyleProp<ImageStyle>;
}

export const AvatarImage: React.SFC<IAvatarImageProps> = ({image, style: customStyle}) => {
	return <Image source={image} resizeMode={'cover'} style={customStyle} />;
};

const AVATAR_SIZE = Sizes.smartHorizontalScale(90);

const styles = StyleSheet.create({
	avatarImage: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
});

AvatarImage.defaultProps = {
	style: styles.avatarImage,
};
