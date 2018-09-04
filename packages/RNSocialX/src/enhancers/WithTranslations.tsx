import get from 'lodash/get';
import * as React from 'react';
import {compose, withProps} from 'recompose';

// @ts-ignore
import en_dictionary from '../environment/languages/en_dictionary.json';

const getText = (key: string, ...args: any[]) => {
	let ret = get(en_dictionary, key, key);
	if (args.length > 0) {
		for (let i = 0; i < args.length; i++) {
			// tslint:disable-next-line:no-invalid-template-strings
			ret = ret.replace('${args[' + i + ']}', args[i]);
		}
	}
	return ret;
};

interface ITranslatedProps {
	getText: (value: string, ...args: any[]) => string;
}

export const withTranslations = compose(
	withProps(() => ({
		getText: (value: string, ...args: any[]) => getText(value, ...args),
	})),
);

export const WithTranslations: React.SFC<{children(props: ITranslatedProps): JSX.Element}> = ({children}) =>
	children({
		getText: (value: string, ...args: any[]) => getText(value, ...args),
	});

/**
 * TODO list: revisit translations implementation: init language, hoc+enhancer, load from dict. file, change language
 */
