/**
 * TODO list:
 * 1. migrate and use DotsMenuButton + DotsMenuModal
 */

import * as React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {CommentsSortingOptions, ITranslatedProps} from '../../types';
import style, {customStyleProps} from './CommentsHeaderMenuButton.style';

const getSortingSectionHeaderItem = (title: string) => [
	{
		label: () => <Text style={style.headerLabel}>{title}</Text>,
		onPress: () => {
			/**/
		},
	},
];

const SortingItem: React.SFC<{optionValue: string; selectedValue: CommentsSortingOptions}> = ({
	optionValue,
	selectedValue,
}) => (
	<View style={style.lineContainer}>
		<View style={style.iconView}>
			{selectedValue === optionValue ? <Icon name={'md-checkmark'} style={style.selectedIcon} /> : null}
		</View>
		<Text style={style.label}>{optionValue}</Text>
	</View>
);

const getSortingItems = (selectedValue: CommentsSortingOptions, onValueChange: (value: string) => void) =>
	Object.keys(CommentsSortingOptions).map((option: any) => {
		const optionValue = CommentsSortingOptions[option];
		return {
			label: () => <SortingItem optionValue={optionValue} selectedValue={selectedValue} />,
			onPress: () => onValueChange(optionValue),
		};
	});

interface ICommentsHeaderMenuButtonProps extends ITranslatedProps {
	sortOption: CommentsSortingOptions;
	onValueChange: (value: string) => void;
}

export const CommentsHeaderMenuButton: React.SFC<ICommentsHeaderMenuButtonProps> = ({
	getText,
	sortOption,
	onValueChange,
}) => {
	const headerItem = getSortingSectionHeaderItem(getText('comments.order.title'));
	const menuItems = getSortingItems(sortOption, onValueChange);
	return (
		<View style={style.rightHeader}>
			{/*<DotsMenuButton*/}
			{/*getItems={() => headerItem.concat(menuItems)}*/}
			{/*iconName={'ios-more'}*/}
			{/*iconColor={customStyleProps.dotsColor}*/}
			{/*/>*/}
		</View>
	);
};
