import ImagePicker, {Image, Options} from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import {MediaTypeImage} from '../types';

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

export type PickerImage = Image;
export type PickerImageMultiple = Image[];
type PickerImageOrMultiple = Image | Image[];

export const getCameraMediaObject = async (options: Partial<Options> = {}): Promise<PickerImage | undefined> => {
	try {
		const mediaObject: PickerImage | PickerImage[] = await ImagePicker.openCamera({
			...DEFAULT_CAMERA_OPTIONS,
			...options,
		});
		return mediaObject as PickerImage;
	} catch (ex) {
		console.log('getCameraMediaObject error', ex);
	}
};

export const getGalleryMediaObjectMultiple = async (options = {}): Promise<PickerImageMultiple> => {
	try {
		const mediaObject: PickerImageOrMultiple = await ImagePicker.openPicker({
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

export const getGalleryMediaObject = async (options: Partial<Options> = {}): Promise<PickerImage | undefined> => {
	try {
		const mediaObject: PickerImage | PickerImage[] = await ImagePicker.openPicker({
			...DEFAULT_PICKER_OPTIONS,
			...options,
		});
		return mediaObject as PickerImage;
	} catch (ex) {
		console.log('getGalleryMediaObject error', ex);
	}
};

export const getCameraMediaObjectMultiple = async (options = {}): Promise<PickerImageMultiple> => {
	try {
		const mediaObject: PickerImage | PickerImage[] = await ImagePicker.openCamera({
			...DEFAULT_CAMERA_OPTIONS,
			...options,
		});
		return [mediaObject as PickerImage];
		// return mediaObject as PickerImageMultiple;
	} catch (ex) {
		console.log('getCameraMediaObjectMultiple error', ex);
		return [];
	}
};

export const getOptimizedMediaObject = async (originalMedia: PickerImage) => {
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
