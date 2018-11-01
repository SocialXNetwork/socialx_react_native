import * as React from 'react';
import { FlatList, Keyboard, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
	Header,
	HeaderButton,
	InputSizes,
	PrimaryTextInput,
	TRKeyboardKeys,
} from '../../components';
import { ITranslatedProps } from '../../types';

import styles from './NodesScreen.style';

interface INodesScreenViewProps extends ITranslatedProps {
	onGoBack: () => void;
	nodesList: string[];
	nodeValue: string;
	onSaveNewNode: () => void;
	autoFocus: boolean;
	onNodeInputChange: (value: string) => void;
	onDeleteNode: (value: string) => void;
}

export const NodesScreenView: React.SFC<INodesScreenViewProps> = ({
	onGoBack,
	getText,
	nodesList,
	autoFocus,
	nodeValue,
	onSaveNewNode,
	onNodeInputChange,
	onDeleteNode,
}) => (
	<View style={{ flex: 1 }}>
		{
			<Header
				title={getText('nodes.screen.title')}
				left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
			/>
		}
		<View style={styles.container}>
			<Text style={styles.description}>{getText('nodes.screen.description').toUpperCase()}</Text>
			<View style={styles.separator} />
			<View style={styles.marginBetweenTitleAndInput} />
			<ScrollView>
				<PrimaryTextInput
					borderWidth={0}
					size={InputSizes.Normal}
					placeholder={getText('nodes.screen.input.placeholder')}
					value={nodeValue}
					autoFocus={autoFocus}
					onChangeText={onNodeInputChange}
					returnKeyType={TRKeyboardKeys.send}
					onSubmitPressed={nodeValue.length > 0 ? onSaveNewNode : Keyboard.dismiss}
					blurOnSubmit={true}
				/>
				<Text style={styles.currentNodesText}>
					{getText('nodes.screen.current.text').toUpperCase()}
				</Text>
				<FlatList
					data={nodesList}
					keyExtractor={(item) => item.toString()}
					style={styles.listContainer}
					renderItem={({ item }) => (
						<View style={styles.listItem}>
							<Text style={styles.node}>{item}</Text>
							<TouchableOpacity style={styles.iconContainer} onPress={() => onDeleteNode(item)}>
								<Icon style={styles.deleteIcon} name="ios-trash" />
							</TouchableOpacity>
						</View>
					)}
				/>
			</ScrollView>
		</View>
	</View>
);
