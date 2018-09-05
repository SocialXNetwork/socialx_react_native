import ImagePicker, {Image, Options} from 'react-native-image-crop-picker';

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

type PickerImage = Image;

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
