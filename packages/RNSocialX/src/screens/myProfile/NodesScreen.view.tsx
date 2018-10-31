import * as React from 'react';
import { Keyboard, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/Ionicons';

import {
	Header,
	HeaderButton,
	InputSizes,
	PrimaryTextInput,
	TRKeyboardKeys,
} from '../../components';
import { ITranslatedProps } from '../../types';

import styles, { defaultStyles } from './NodesScreen.style';

interface INodesScreenViewProps extends ITranslatedProps {
	onGoBack: () => void;
	nodesList: string[];
	nodeValue: string;
	onSaveNewNode: () => void;
	autoFocus: boolean;
	isSwiping: boolean;
	onNodeInputChange: (value: string) => void;
	onSwipeStart: () => void;
	onSwipeRelease: () => void;
	onDeleteNode: (value: string) => void;
}

const rightButtons = [];

export const NodesScreenView: React.SFC<INodesScreenViewProps> = ({
	onGoBack,
	getText,
	nodesList,
	isSwiping,
	autoFocus,
	nodeValue,
	onSaveNewNode,
	onNodeInputChange,
	onSwipeStart,
	onSwipeRelease,
	onDeleteNode,
}) => {
	const swiperDeleteButton = (node: string, index: number) => {
		return [
			<TouchableHighlight
				style={styles.swiperDeleteButton}
				key={index}
				onPress={() => {
					onDeleteNode(node);
				}}
			>
				<Icon style={styles.swiperDeleteIcon} name="ios-trash" />
			</TouchableHighlight>,
		];
	};

	return (
		<View style={{ flex: 1 }}>
			{
				<Header
					title={getText('nodes.screen.title')}
					left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
				/>
			}
			<ScrollView scrollEnabled={!isSwiping}>
				<View style={styles.container}>
					<Text style={styles.description}>{getText('nodes.screen.description')}</Text>
					<View style={styles.inputContainer}>
						<PrimaryTextInput
							borderWidth={0}
							size={InputSizes.Small}
							placeholder={getText('nodes.screen.input.placeholder')}
							value={nodeValue}
							autoFocus={autoFocus}
							onChangeText={onNodeInputChange}
							returnKeyType={TRKeyboardKeys.send}
							onSubmitPressed={nodeValue.length > 0 ? onSaveNewNode : Keyboard.dismiss}
							blurOnSubmit={true}
						/>
					</View>
					<View style={styles.listContainer}>
						{nodesList.map((node, index) => (
							<View style={styles.listItem}>
								<Swipeable
									rightButtons={swiperDeleteButton(node, index)}
									key={index}
									onSwipeStart={onSwipeStart}
									onSwipeRelease={onSwipeRelease}
								>
									<Text style={styles.description}>{node}</Text>
								</Swipeable>
								<View style={styles.separator} />
							</View>
						))}
					</View>
				</View>
			</ScrollView>
		</View>
	);
};
