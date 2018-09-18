import * as React from 'react';
import {Platform, Switch, Text, View} from 'react-native';

import style, {customStyleProps} from './SettingCheckbox.style';

interface ISettingCheckboxProps {
	title: string;
	value: boolean;
	description: string | false;
	onValueUpdated: () => void;
}

export const SettingCheckbox: React.SFC<ISettingCheckboxProps> = ({
	title,
	description = false,
	value,
	onValueUpdated,
}) => (
	<View style={style.container}>
		<View style={style.leftContainer}>
			<Text style={style.title}>{title}</Text>
			{description && <Text style={style.description}>{description}</Text>}
		</View>
		<Switch
			style={style.switch}
			value={value}
			onValueChange={onValueUpdated}
			onTintColor={customStyleProps.onTintColor}
			thumbTintColor={Platform.select({
				android: customStyleProps.thumbTintColor,
			})}
		/>
	</View>
);
