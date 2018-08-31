import {decode} from 'base-64';

export const decodeBase64Text = (text: string): string => {
	const regex = /^(data:\w+\/[a-zA-Z\+\-\.]+;base64,)?(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/gi;
	if (!text) {
		return text;
	}
	if (regex.test(text)) {
		try {
			console.log('decoding text:', text);
			return decode(text);
		} catch (ex) {
			console.log(ex);
			return text;
		}
	} else {
		return text;
	}
};
