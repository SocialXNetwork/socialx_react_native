import * as React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { HeaderButton, HeaderLogo } from '../';

import { AvatarImage } from '../avatar/AvatarImage';
import styles from './Header.style';

interface IHeaderProps {
	title?: string;
	center?: JSX.Element | undefined;
	left?: JSX.Element | undefined;
	right?: JSX.Element | undefined;
	logo?: boolean;
	back?: boolean;
	avatar?: string;
	onPressBack?: () => void;
	onPressAvatar?: () => void;
}

export const Header: React.SFC<IHeaderProps> = ({
	center,
	left,
	right,
	title = '',
	avatar = '',
	logo,
	back,
	onPressBack,
	onPressAvatar,
}) => {
	const displayCenter = center;
	const displayTitle = title.length > 0 && !center && avatar.length === 0;
	const displayLogo = !center && title.length === 0 && logo;
	const displayNone = !center && title.length === 0 && !logo;
	const displayAvatar = !center && avatar.length !== 0;

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always', bottom: 'never' }}>
			{left ? (
				<View style={styles.left}>{left}</View>
			) : back && onPressBack ? (
				<View style={styles.left}>
					<HeaderButton
						iconName={Platform.select({
							android: 'md-arrow-back',
							ios: 'ios-arrow-back',
						})}
						onPress={onPressBack}
					/>
				</View>
			) : (
				<View style={styles.placeholder} />
			)}
			{displayCenter && <View style={styles.center}>{center}</View>}
			{displayAvatar && (
				<TouchableOpacity onPress={onPressAvatar} style={styles.avatarContainer}>
					<AvatarImage image={avatar} style={styles.avatar} />
					<Text style={styles.text}>{title.toUpperCase()}</Text>
				</TouchableOpacity>
			)}
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
		</SafeAreaView>
	);
};
