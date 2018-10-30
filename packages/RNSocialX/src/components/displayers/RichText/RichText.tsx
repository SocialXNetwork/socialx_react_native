import * as React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import { TextParser } from './TextParser';

const PATTERNS = {
	url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
	phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}/,
	email: /\S+@\S+\.\S+/,
	hashtag: /#(\w+)/,
	tags: /@(\w+)/,
};

interface IParseProps {
	type: 'url' | 'phone' | 'email' | 'hashtag' | 'tags';
	style: StyleProp<TextStyle>;
	onPress: (tag: string) => void;
}

interface ITextParserProps extends TextProps {
	parse: IParseProps[];
	childrenProps: TextProps;
}

const getParsePatterns = (parse: IParseProps[]): any => {
	return parse.map((option: IParseProps) => {
		const { type, ...patternOption } = option;
		if (type) {
			if (!PATTERNS[type]) {
				throw new Error(`${option.type} is not a supported type`);
			}
			return {
				...patternOption,
				pattern: PATTERNS[type],
			};
		}

		return patternOption;
	});
};

export class RichText extends React.Component<ITextParserProps> {
	private root: React.RefObject<Text> = React.createRef();

	render() {
		const { children, parse, childrenProps } = this.props;
		const canParse = typeof children === 'string';
		const textExtraction = canParse
			? new TextParser(children as string, getParsePatterns(parse))
			: null;

		return (
			<Text {...this.props} ref={this.root}>
				{!canParse && children}
				{textExtraction &&
					textExtraction.parse().map((props: any, index) => {
						if (!!props.onPress) {
							// just need to make sure onPress handler will receive the relevant text(hashtag, tag, url, etc)
							return (
								<Text
									key={`pText-${index}`}
									{...childrenProps}
									{...props}
									onPress={() => props.onPress(props.children)}
								/>
							);
						}
						return <Text key={`pText-${index}`} {...childrenProps} {...props} />;
					})}
			</Text>
		);
	}
}

/**
 * TODO list:
 * 1. @Serkan & @Jake -> setNativeProps is this needed here? If not remove ref root and make SFC
 * 2. @Ionut -> find better key value for key={`pText-${index}`}
 */
