import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors, Sizes } from '../../environment/theme';
import {
	getTextSignature,
	IOptionsMenuItem,
	IOptionsMenuProps,
	ITranslatedProps,
} from '../../types';
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

interface IAvatarPickerProps extends ITranslatedProps, IOptionsMenuProps {
	local: string;
	hash?: boolean;
	afterImagePick: (image: string) => void;
}

export class AvatarPicker extends React.Component<IAvatarPickerProps> {
	public render() {
		const { local, hash, afterImagePick, showOptionsMenu, getText } = this.props;

		return (
			<TouchableOpacity
				onPress={() => this.onAvatarPick(local, afterImagePick, showOptionsMenu, getText)}
			>
				{hash && <AvatarImage image={local} style={styles.avatar} />}
				{!hash && <AvatarImage local={local} style={styles.avatar} />}
				<View style={styles.editIcon}>
					<Icon name="camera" size={17.5} color={Colors.cloudBurst} />
				</View>
			</TouchableOpacity>
		);
	}

	public onShowGallery = async (afterImagePick: (image: string) => void) => {
		const galleryMediaObject = await getGalleryMediaObject(AVATAR_PICKER_OPTIONS);
		if (galleryMediaObject) {
			afterImagePick(galleryMediaObject.path);
		}
	};

	public onShowCamera = async (afterImagePick: (image: string) => void) => {
		const cameraMediaObject = await getCameraMediaObject(AVATAR_CAMERA_OPTIONS);
		if (cameraMediaObject) {
			afterImagePick(cameraMediaObject.path);
		}
	};

	public onAvatarPick = (
		uri: string,
		afterImagePick: (image: string) => void,
		showOptionsMenu: (items: IOptionsMenuItem[]) => void,
		getText: getTextSignature,
	) => {
		const defaultOptions = [
			{
				label: getText('avatar.picker.gallery'),
				icon: 'md-photos',
				actionHandler: () => this.onShowGallery(afterImagePick),
			},
			{
				label: getText('avatar.picker.camera'),
				icon: 'md-camera',
				actionHandler: () => this.onShowCamera(afterImagePick),
			},
		];

		const removeOption = {
			label: getText('avatar.picker.remove'),
			icon: 'md-remove-circle',
			actionHandler: () => afterImagePick(''),
		};

		const items = uri.length > 0 ? [...defaultOptions, removeOption] : defaultOptions;

		showOptionsMenu(items);
	};
}

const styles: any = StyleSheet.create({
	avatar: {
		width: Sizes.smartHorizontalScale(80),
		height: Sizes.smartHorizontalScale(80),
		borderRadius: Sizes.smartHorizontalScale(80) / 2,
	},
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
