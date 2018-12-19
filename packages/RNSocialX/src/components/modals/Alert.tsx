import * as React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import { IError, ITranslatedProps } from '../../types';
import { WithManagedTransitions } from '../managedTransitions';

import styles from './Alert.style';

interface IProps extends ITranslatedProps {
	errors: IError[];
}

interface IState {
	visible: boolean;
	error: string;
}

export class Alert extends React.Component<IProps, IState> {
	public state = {
		error: '',
		visible: false,
	};

	private timeout: NodeJS.Timer = setTimeout(() => undefined, 0);

	public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
		return this.props.errors.length !== nextProps.errors.length || this.state !== nextState;
	}

	public componentDidUpdate(prevProps: IProps) {
		const { errors, getText } = this.props;

		if (prevProps.errors !== errors && errors.length > 0 && this.state.error.length === 0) {
			const error = getText(`error.${errors[0].type}`);

			if (error) {
				this.setState({ error, visible: true });
				this.clearItself();
			}
		}
	}

	public render() {
		if (this.state.error.length > 0) {
			return (
				<WithManagedTransitions modalVisible={true}>
					{({ onDismiss, onModalHide }) => (
						<Modal
							onDismiss={onDismiss}
							onModalHide={onModalHide}
							onBackdropPress={this.onClear}
							isVisible={true}
							backdropOpacity={0}
							animationIn="slideInUp"
							animationOut="slideOutDown"
							style={styles.outer}
						>
							<View style={styles.container}>
								<Icon name="exclamation-circle" style={styles.icon} />
								<View style={styles.textContainer}>
									<Text style={styles.text}>{this.state.error}</Text>
								</View>
							</View>
						</Modal>
					)}
				</WithManagedTransitions>
			);
		}

		return null;
	}

	private clearItself = () => {
		this.timeout = setTimeout(() => {
			this.setState({
				error: '',
				visible: false,
			});
			clearTimeout(this.timeout);
		}, 5000);
	};

	private onClear = () => {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}

		this.setState({
			error: '',
			visible: false,
		});
	};
}
