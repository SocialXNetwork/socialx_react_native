import * as React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import {HeaderLogo} from '../';
import styles from './Header.style';

interface IHeaderProps {
	title: string;
	center: JSX.Element | false;
	left: JSX.Element | false;
	right: JSX.Element | false;
	logo: boolean | null;
}

export const Header: React.SFC<IHeaderProps> = ({
	center = false,
	left = false,
	right = false,
	title = '',
	logo = null,
}) => {
	const displayCenter = center;
	const displayTitle = title.length > 0 && !center;
	const displayLogo = !center && title.length === 0 && logo;
	const displayNone = !center && title.length === 0 && !logo;

	return (
		<View style={styles.container}>
			{left ? <View style={styles.left}>{left}</View> : <View style={styles.placeholder} />}
			{displayCenter && <View style={styles.center}>{center}</View>}
			{displayTitle && (
				<View style={styles.center}>
					<Text style={styles.text}>{title.toUpperCase()}</Text>
				</View>
			)}
			{displayLogo && (
				<View style={styles.center}>
					<HeaderLogo />
				</View>
			)}
			{displayNone && <View style={styles.placeholder} />}
			{right ? <View style={styles.right}>{right}</View> : <View style={styles.placeholder} />}
		</View>
	);
};
