import * as React from 'react';
import { Text, View } from 'react-native';

import { SafeAreaView } from 'react-navigation';
import { HeaderLogo } from '../';

import styles from './Header.style';

interface IHeaderProps {
	title?: string;
	center?: JSX.Element | undefined;
	left?: JSX.Element | undefined;
	right?: JSX.Element | undefined;
	logo?: boolean;
}

export const Header: React.SFC<IHeaderProps> = ({
	center,
	left,
	right,
	title = '',
	logo,
}) => {
	const displayCenter = center;
	const displayTitle = title.length > 0 && !center;
	const displayLogo = !center && title.length === 0 && logo;
	const displayNone = !center && title.length === 0 && !logo;

	return (
		<SafeAreaView
			style={styles.container}
			forceInset={{ top: 'always', bottom: 'never' }}
		>
			{left ? (
				<View style={styles.left}>{left}</View>
			) : (
				<View style={styles.placeholder} />
			)}
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
			{right ? (
				<View style={styles.right}>{right}</View>
			) : (
				<View style={styles.placeholder} />
			)}
		</SafeAreaView>
	);
};
