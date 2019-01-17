import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors, Sizes } from '../../environment/theme';
import { IDictionary, IOptionsMenuProps } from '../../types';
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

interface IAvatarPickerProps extends IDictionary, IOptionsMenuProps {
	image: string;
	hash?: boolean;
	afterImagePick: (image: string) => void;
}

export class AvatarPicker extends React.Component<IAvatarPickerProps> {
	public render() {
		const { image, hash } = this.props;

		return (
			<TouchableOpacity onPress={() => this.onAvatarPick(image)}>
				{hash && <AvatarImage image={image} style={styles.avatar} />}
				{!hash && <AvatarImage local={image} style={styles.avatar} />}
				<View style={styles.editIcon}>
					<Icon name="camera" size={17.5} color={Colors.cloudBurst} />
				</View>
			</TouchableOpacity>
		);
	}

	public onShowGallery = async () => {
		const galleryMediaObject = await getGalleryMediaObject(AVATAR_PICKER_OPTIONS);
		if (galleryMediaObject) {
			this.props.afterImagePick(galleryMediaObject.path);
		}
	};

	public onShowCamera = async () => {
		const cameraMediaObject = await getCameraMediaObject(AVATAR_CAMERA_OPTIONS);
		if (cameraMediaObject) {
			this.props.afterImagePick(cameraMediaObject.path);
		}
	};

	public onAvatarPick = (uri: string) => {
		const { dictionary, afterImagePick, showOptionsMenu } = this.props;

		const defaultOptions = [
			{
				label: dictionary.components.modals.options.gallery,
				icon: 'md-photos',
				actionHandler: this.onShowGallery,
			},
			{
				label: dictionary.components.modals.options.camera,
				icon: 'md-camera',
				actionHandler: this.onShowCamera,
			},
		];

		const removeOption = {
			label: dictionary.components.modals.options.remove,
			icon: 'md-remove-circle',
			actionHandler: () => afterImagePick(''),
		};

		const items = uri.length > 0 ? [...defaultOptions, removeOption] : defaultOptions;
		showOptionsMenu(items);
	};
}

const styles: any = StyleSheet.create({
	avatar: {
		width: Sizes.smartHorizontalScale(100),
		height: Sizes.smartHorizontalScale(100),
		borderRadius: Sizes.smartHorizontalScale(100) / 2,
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
