import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on iPhone 4.7" screen sizes
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

// Here the threshold is based on iPhone 5.5" screen size
const thresholdWidth = 414;
const thresholdHeight = 736;

// @Discussion:
// Using smart scale all sizes below threshold levels are scaled proportional, same as "non-smart" scale.
// For larger devices (above threshold levels) scale will account for a ratio.
// For now a good ratio value I have found is 0.2 but we can adjust later.
// For smart scale if we set ratio to 1 it will be the same as "non-smart" scale.
// Inspired by https://blog.solutotlv.com/size-matters/

const SizesInt = {
	horizontalScale: (size: number) => (width / guidelineBaseWidth) * size,
	verticalScale: (size: number) => (height / guidelineBaseHeight) * size,
	smartHorizontalScale: (size: number, ratio: number = 0.2) => {
		if (width <= thresholdWidth) {
			return SizesInt.horizontalScale(size);
		}
		return size * (1 + (width / guidelineBaseWidth - 1) * ratio);
	},
	smartVerticalScale: (size: number, ratio: number = 0.2) => {
		if (height <= thresholdHeight) {
			return SizesInt.verticalScale(size);
		}
		return size * (1 + (height / guidelineBaseHeight - 1) * ratio);
	},
	getThumbSize: (minThumbsInARow = 3) => {
		// 3 thumbs in a row for iPhone 4.7"
		const baseThumbSize = guidelineBaseWidth / minThumbsInARow;
		let ret;
		if (width > thresholdWidth) {
			const scaledThumbSize = SizesInt.smartHorizontalScale(baseThumbSize);
			const numberOfThumbsPerRow = Math.round(width / scaledThumbSize);
			ret = width / numberOfThumbsPerRow;
		} else {
			ret = width / minThumbsInARow;
		}
		return Math.floor(ret);
	},
	getMediaLicenceThumbSize: (minThumbsInARow = 2) => {
		const adjustedBaseWidth = guidelineBaseWidth - 2 * SIMILAR_MEDIA_CONTAINER_PADDING;
		const adjustedScreenWidth = width - 2 * SIMILAR_MEDIA_CONTAINER_PADDING;
		const baseThumbSize = adjustedBaseWidth / minThumbsInARow;
		let thumbsInARow = minThumbsInARow;
		let ret;
		if (adjustedScreenWidth > thresholdWidth) {
			const scaledThumbSize = SizesInt.smartHorizontalScale(baseThumbSize);
			thumbsInARow = Math.round(adjustedScreenWidth / scaledThumbSize);
			ret = adjustedScreenWidth / thumbsInARow;
		} else {
			ret = adjustedScreenWidth / minThumbsInARow;
		}
		return {
			size: Math.floor(ret),
			thumbsInARow,
		};
	},
};

export const SIMILAR_MEDIA_CONTAINER_PADDING = SizesInt.smartHorizontalScale(12);

export const Sizes = SizesInt;
