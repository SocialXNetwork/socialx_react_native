import * as React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Images, Sizes } from '../../environment/theme';

interface IAvatarImageProps {
	image: string;
	style: StyleProp<ImageStyle>;
}

export const AvatarImage: React.SFC<IAvatarImageProps> = ({
	image,
	style = styles.avatarImage,
}) => (
	<Image
		source={image.length > 0 ? { uri: image } : Images.user_avatar_placeholder}
		resizeMode="cover"
		style={style}
	/>
);

const AVATAR_SIZE = Sizes.smartHorizontalScale(90);

const styles = StyleSheet.create({
	avatarImage: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
});
