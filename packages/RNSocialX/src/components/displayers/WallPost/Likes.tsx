import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { IProfile } from '../../../store/data/profiles';
import { IApplicationState, selectProfile } from '../../../store/selectors';

import { IDictionary } from '../../../types';
import styles from './Likes.style';

interface ILikesProps extends IDictionary {
	alias: string;
	total: number;
	onUserPress: (alias: string) => void;
	onViewLikes: () => void;
}

interface IProps extends ILikesProps {
	profile: IProfile;
}

export const Component: React.SFC<IProps> = ({
	profile,
	alias,
	total,
	onUserPress,
	onViewLikes,
	dictionary,
}) => {
	const others =
		total - 1 === 1
			? dictionary.components.displayers.wallPost.other
			: dictionary.components.displayers.wallPost.others;

	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.normal}>{dictionary.components.displayers.wallPost.liked + ' '}</Text>
				<Text style={styles.bold} onPress={() => onUserPress(alias)}>
					{profile.fullName}
				</Text>
			</View>
			{total > 1 && (
				<View style={styles.wrapper}>
					<Text style={styles.normal}>
						{' ' + dictionary.components.displayers.wallPost.and + ' '}
					</Text>
					<TouchableOpacity activeOpacity={1} onPress={onViewLikes}>
						<Text style={styles.bold}>{total - 1 + ' ' + others}</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

const mapStateToProps = (state: IApplicationState, props: ILikesProps) => ({
	profile: selectProfile(state.data.profiles, props.alias),
});

export const Likes = connect(mapStateToProps)(Component as any);
