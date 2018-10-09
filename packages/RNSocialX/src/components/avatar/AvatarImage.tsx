/**
 * TODO list:
 * 1. @Ionut: refactor all usages to send image of correct updated type
 * 2. @Serkan: is this the correct place to decide about using placeholder for an image
 * or should we do this at the top most level in components and screens!
 * with DRY principle in mind it should go here IMO.
 * 3. @Serkan: discuss nullable types in general!
 */

import * as React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';

import { Images, Sizes } from '../../environment/theme';

interface IAvatarImageProps {
	image: { uri: string };
	style: StyleProp<ImageStyle>;
}

export const AvatarImage: React.SFC<IAvatarImageProps> = ({
	image,
	style = styles.avatarImage,
}) => (
	<Image
		source={image.uri.length > 0 ? image : Images.user_avatar_placeholder}
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
