import { ILocaleDictionary } from '../Types';

export const interpolateVariables = (template: string, args: Array<string | number>): string =>
	args.reduce(
		(stringBuilder: string, arg: string | number, index: number) =>
			stringBuilder.replace(`\$\{args[${index}]\}`, arg.toString()),
		template,
	);

export const getText = (
	currentDictionary: ILocaleDictionary,
	key: string,
	...args: Array<string | number>
): string => interpolateVariables(currentDictionary[key], args);
