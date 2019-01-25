import { CheckBox } from 'native-base';
import * as React from 'react';
import { Keyboard, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import {
	ButtonSizes,
	Header,
	InputSizes,
	PrimaryButton,
	PrimaryTextInput,
	TRKeyboardKeys,
} from '../../components';
import { ITranslatedProps } from '../../types';

import styles, { buttonWidth, defaultStyles } from './NodesScreen.style';

interface INodesScreenViewProps extends ITranslatedProps {
	onGoBack: () => void;
	nodesList: string[];
	nodeValue: string;
	onSaveNewNode: () => void;
	autoFocus: boolean;
	onNodeInputChange: (value: string) => void;
	onDeleteNodes: () => void;
	onCheckedNode: (value: string) => void;
	selectedCheckList: string[];
}

export const NodesScreenView: React.SFC<INodesScreenViewProps> = ({
	onGoBack,
	getText,
	nodesList,
	autoFocus,
	nodeValue,
	onSaveNewNode,
	onNodeInputChange,
	onDeleteNodes,
	onCheckedNode,
	selectedCheckList,
}) => (
	<View style={{ flex: 1 }}>
		<Header title={getText('nodes.screen.title')} back={true} onPressBack={onGoBack} />
		<View style={styles.container}>
			<Text style={styles.description}>{getText('nodes.screen.description').toUpperCase()}</Text>
			<View style={styles.separator} />
			<ScrollView>
				<View style={styles.inputContainer}>
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
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.currentNodesText}>
						{getText('nodes.screen.current.text').toUpperCase()}
					</Text>
					{selectedCheckList.length > 0 && (
						<PrimaryButton
							width={buttonWidth}
							label={getText('nodes.screen.button.text')}
							size={ButtonSizes.Small}
							borderColor={defaultStyles.buttonBorderColor}
							textColor={defaultStyles.buttonBorderColor}
							containerStyle={styles.button}
							onPress={onDeleteNodes}
						/>
					)}
				</View>
				<View style={styles.listContainer}>
					{nodesList.map((e) => (
						<TouchableOpacity
							key={e}
							style={styles.listItem}
							onPress={() => {
								onCheckedNode(e);
							}}
						>
							<Text style={styles.node}>{e}</Text>
							<CheckBox
								checked={selectedCheckList.includes(e) ? true : false}
								color={defaultStyles.checkboxColor}
								style={styles.checkbox}
								onPress={() => {
									onCheckedNode(e);
								}}
							/>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</View>
	</View>
);
