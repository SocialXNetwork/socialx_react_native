import { ActionSheet } from 'native-base';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors, Sizes } from '../../environment/theme';
import { getTextSignature, ITranslatedProps } from '../../types';
import { getCameraMediaObject, getGalleryMediaObject } from '../../utilities';
import { AvatarImage } from './AvatarImage';

const IMAGE_CROP_SIZE = 300;
const ICON_SIZE = Sizes.smartHorizontalScale(30);

const AVATAR_PICKER_OPTIONS = {
	width: IMAGE_CROP_SIZE,
	height: IMAGE_CROP_SIZE,
	cropping: true,
	mediaType: 'photo',
};

const AVATAR_CAMERA_OPTIONS = {
	width: IMAGE_CROP_SIZE,
	height: IMAGE_CROP_SIZE,
	cropping: true,
	mediaType: 'photo',
	useFrontCamera: true,
};

interface IAvatarPickerProps extends ITranslatedProps {
	avatarImage: { uri: string };
	afterImagePick: (image: string) => void;
	avatarSize?: number;
}

const showGalleryPhotoPicker = async (
	afterImagePick: (image: string) => void,
) => {
	const galleryMediaObject = await getGalleryMediaObject(AVATAR_PICKER_OPTIONS);
	if (galleryMediaObject) {
		afterImagePick(galleryMediaObject.path);
	}
};

const takeCameraPhoto = async (afterImagePick: (image: string) => void) => {
	const cameraMediaObject = await getCameraMediaObject(AVATAR_CAMERA_OPTIONS);
	if (cameraMediaObject) {
		afterImagePick(cameraMediaObject.path);
	}
};

const pickUserAvatar = (
	afterImagePick: (image: string) => void,
	getText: getTextSignature,
) => {
	ActionSheet.show(
		{
			options: [
				getText('avatar.picker.pick.from.gallery'),
				getText('avatar.picker.take.photo'),
				getText('button.cancel'),
			],
			cancelButtonIndex: 2,
		},
		(buttonIndex: number) => {
			if (buttonIndex === 0) {
				showGalleryPhotoPicker(afterImagePick);
			} else if (buttonIndex === 1) {
				takeCameraPhoto(afterImagePick);
			}
		},
	);
};

export const AvatarPicker: React.SFC<IAvatarPickerProps> = ({
	avatarImage,
	avatarSize = Sizes.smartHorizontalScale(80),
	afterImagePick,
	getText,
}) => {
	const avatarSizeStyle = {
		width: avatarSize,
		height: avatarSize,
		borderRadius: avatarSize / 2,
	};
	const iconSize = Math.min(30, Math.round(avatarSize / 6));

	return (
		<TouchableOpacity onPress={() => pickUserAvatar(afterImagePick, getText)}>
			<AvatarImage image={avatarImage} style={avatarSizeStyle} />
			<View style={style.editIcon}>
				<Icon name="camera" size={iconSize} color={Colors.postFullName} />
			</View>
		</TouchableOpacity>
	);
};

const style = StyleSheet.create({
	editIcon: {
		backgroundColor: Colors.white,
		justifyContent: 'center',
		alignItems: 'center',
		height: ICON_SIZE,
		width: ICON_SIZE,
		borderRadius: ICON_SIZE / 2,
		position: 'absolute',
		bottom: 0,
		right: 0,
	},
});
