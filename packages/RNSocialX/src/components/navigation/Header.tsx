import * as React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { AvatarImage, HeaderButton, HeaderLogo } from '../';
import styles from './Header.style';

interface IHeaderProps {
	title?: string;
	left?: JSX.Element;
	right?: JSX.Element;
	logo?: boolean;
	back?: boolean;
	avatar?: string;
	name?: string;
	onPressBack?: () => void;
	onPressAvatar?: () => void;
}

export const Header: React.SFC<IHeaderProps> = ({
	left,
	right,
	title = '',
	logo,
	back,
	avatar = '',
	name = '',
	onPressBack = () => undefined,
	onPressAvatar = () => undefined,
}) => {
	const displayTitle = title.length > 0 && !logo;
	const displayLogo = title.length === 0 && logo;
	const displayAvatar = avatar && avatar.length > 0 && name && name.length > 0;

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always', bottom: 'never' }}>
			{displayAvatar && (
				<React.Fragment>
					{back && (
						<View style={styles.backArrow}>
							<HeaderButton
								iconName={Platform.select({
									android: 'md-arrow-back',
									ios: 'ios-arrow-back',
								})}
								onPress={onPressBack}
							/>
						</View>
					)}
					<TouchableOpacity onPress={onPressAvatar} style={styles.avatar}>
						<AvatarImage image={avatar} style={styles.image} />
						<Text style={styles.text}>{name.toUpperCase()}</Text>
					</TouchableOpacity>
				</React.Fragment>
			)}
			{!displayAvatar && (
				<React.Fragment>
					{left ? (
						<View style={styles.left}>{left}</View>
					) : back ? (
						<View style={styles.left}>
							<HeaderButton
								iconName={Platform.select({
									android: 'md-arrow-back',
									ios: 'ios-arrow-back',
								})}
								onPress={onPressBack}
							/>
						</View>
					) : right ? (
						<View style={styles.placeholder} />
					) : null}
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
					{right ? (
						<View style={styles.right}>{right}</View>
					) : left || back ? (
						<View style={styles.placeholder} />
					) : null}
				</React.Fragment>
			)}
		</SafeAreaView>
	);
};
