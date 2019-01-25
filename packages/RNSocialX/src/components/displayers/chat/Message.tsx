import moment from 'moment';
import * as React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors } from '../../../environment/theme';
import { IMessage } from '../../../store/data/messages';
import { leftStyles, rightStyles, styles } from './Message.style';

interface IMessageProps {
	message: IMessage;
}

export class Message extends React.Component<IMessageProps> {
	public render() {
		const { content, timestamp, self } = this.props.message;
		const wrapperStyles = this.getWrapperStyles();

		if (self) {
			return (
				<View style={[rightStyles.container]}>
					<View style={[styles.overflow, wrapperStyles]}>
						<LinearGradient
							start={{ x: 0, y: 0.5 }}
							end={{ x: 1, y: 0.5 }}
							colors={[Colors.fuchsiaBlue, Colors.pink]}
							style={styles.gradient}
						>
							<Text style={[styles.text, styles.self]}>{content}</Text>
						</LinearGradient>
					</View>
				</View>
			);
		}

		return (
			<View style={leftStyles.container}>
				<View style={[styles.background, wrapperStyles]}>
					<Text style={styles.text}>{content}</Text>
				</View>
			</View>
		);
	}

	private getWrapperStyles = () => {
		const { self, consecutive } = this.props.message;
		const wrapperStyles = [];
		const style = self ? rightStyles : leftStyles;

		if (consecutive) {
			const { first, middle, last } = consecutive;

			if (first) {
				wrapperStyles.push(style.first);
			} else if (middle) {
				wrapperStyles.push(style.middle);
			} else if (last) {
				wrapperStyles.push(style.last);
			}
		}

		return wrapperStyles;
	};
}
