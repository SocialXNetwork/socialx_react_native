import ImagePicker, { Image, Options } from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import { MediaTypeImage } from '../types';

const DEFAULT_CAMERA_OPTIONS: Partial<Options> = {
	cropping: false,
	mediaType: 'any',
	useFrontCamera: false,
};

const DEFAULT_PICKER_OPTIONS: Partial<Options> = {
	cropping: false,
	mediaType: 'any',
	compressImageQuality: 0.8,
};

export type IPickerImage = Image;
export type IPickerImageMultiple = Image[];
type IPickerImageOrMultiple = Image | Image[];

export const getCameraMediaObject = async (
	options: Partial<Options> = {},
): Promise<IPickerImage | undefined> => {
	try {
		const mediaObject:
			| IPickerImage
			| IPickerImage[] = await ImagePicker.openCamera({
			...DEFAULT_CAMERA_OPTIONS,
			...options,
		});
		return mediaObject as IPickerImage;
	} catch (ex) {
		console.log('getCameraMediaObject error', ex);
	}
};

export const getGalleryMediaObjectMultiple = async (
	options = {},
): Promise<IPickerImageMultiple> => {
	try {
		const mediaObject: IPickerImageOrMultiple = await ImagePicker.openPicker({
			...DEFAULT_PICKER_OPTIONS,
			multiple: true,
			...options,
		});
		if (!Array.isArray(mediaObject)) {
			return [mediaObject];
		}
		return mediaObject;
	} catch (ex) {
		console.log('getGalleryMediaObjectMultiple error', ex);
		return [];
	}
};

export const getGalleryMediaObject = async (
	options: Partial<Options> = {},
): Promise<IPickerImage | undefined> => {
	try {
		const mediaObject:
			| IPickerImage
			| IPickerImage[] = await ImagePicker.openPicker({
			...DEFAULT_PICKER_OPTIONS,
			...options,
		});
		return mediaObject as IPickerImage;
	} catch (ex) {
		console.log('getGalleryMediaObject error', ex);
	}
};

export const getCameraMediaObjectMultiple = async (
	options = {},
): Promise<IPickerImageMultiple> => {
	try {
		const mediaObject:
			| IPickerImage
			| IPickerImage[] = await ImagePicker.openCamera({
			...DEFAULT_CAMERA_OPTIONS,
			...options,
		});
		return [mediaObject as IPickerImage];
		// return mediaObject as IPickerImageMultiple;
	} catch (ex) {
		console.log('getCameraMediaObjectMultiple error', ex);
		return [];
	}
};

export const getOptimizedMediaObject = async (originalMedia: IPickerImage) => {
	let contentOptimizedPath;
	if (originalMedia.mime.startsWith(MediaTypeImage.key)) {
		const optimized = await ImageResizer.createResizedImage(
			originalMedia.path,
			originalMedia.width,
			originalMedia.height,
			'JPEG',
			50,
		);
		contentOptimizedPath = optimized.path;
	}
	return {
		...originalMedia,
		contentOptimizedPath,
		type: originalMedia.mime,
		pathx: originalMedia.path,
	};
};
