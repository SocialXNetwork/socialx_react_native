import * as React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ButtonSizes, Header, HeaderButton, PrimaryButton } from '../../components';
import { ITranslatedProps } from '../../types';

import styles, { defaultStyles } from './NodesScreen.style';

interface INodesScreenViewProps extends ITranslatedProps {
	onGoBack: () => void;
	onDisplayNodesList: () => void;
	onSaveNewNode: () => void;
	selectedNodeValue: string;
	hasChanged: boolean;
}

export const NodesScreenView: React.SFC<INodesScreenViewProps> = ({
	onGoBack,
	getText,
	onDisplayNodesList,
	selectedNodeValue,
	hasChanged,
	onSaveNewNode,
}) => (
	<View style={{ flex: 1 }}>
		{
			<Header
				title={getText('nodes.screen.title')}
				left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
			/>
		}

		<View style={styles.container}>
			<Text style={styles.description}>{getText('nodes.screen.description')}</Text>
			<TouchableHighlight underlayColor={defaultStyles.highlightColor} onPress={onDisplayNodesList}>
				<View style={styles.nodeContainer}>
					<Text style={styles.text}>{getText('nodes.screen.node.text')}</Text>
					<View style={styles.nodeButton}>
						<Text style={styles.text}>{selectedNodeValue}</Text>
						<Icon size={20} name="md-arrow-dropdown" style={styles.caretDownIcon} />
					</View>
				</View>
			</TouchableHighlight>
			{hasChanged && (
				<View style={styles.saveChangesButton}>
					<PrimaryButton
						label={getText('button.save.changes')}
						size={ButtonSizes.Small}
						onPress={onSaveNewNode}
					/>
				</View>
			)}
		</View>
	</View>
);
